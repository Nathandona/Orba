import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/zeptomail';
import { z } from 'zod';

const addMemberSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(1, 'Name is required'),
  role: z.enum(['member', 'admin']).default('member'),
});

// GET - Get all members for a project
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id: projectId } = await params;

    // Verify user has access to this project
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        userId: user.id,
      },
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Get all members
    const members = await prisma.projectMember.findMany({
      where: { projectId },
      orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json({ members });
  } catch (error) {
    console.error('Error fetching project members:', error);
    return NextResponse.json(
      { error: 'Failed to fetch members' },
      { status: 500 }
    );
  }
}

// POST - Add a member to a project
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id: projectId } = await params;
    const body = await req.json();

    // Validate input
    const validatedData = addMemberSchema.parse(body);

    // Verify user owns this project
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        userId: user.id,
      },
    });

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found or you do not have permission' },
        { status: 404 }
      );
    }

    // Check if member already exists
    const existingMember = await prisma.projectMember.findUnique({
      where: {
        projectId_email: {
          projectId,
          email: validatedData.email.toLowerCase(),
        },
      },
    });

    if (existingMember) {
      return NextResponse.json(
        { error: 'This person is already a member of the project' },
        { status: 400 }
      );
    }

    // Check if user is registered in the system
    const registeredUser = await prisma.user.findUnique({
      where: { email: validatedData.email.toLowerCase() },
    });

    const isRegistered = !!registeredUser;
    const memberStatus = isRegistered ? 'active' : 'pending';

    // Add member
    const member = await prisma.projectMember.create({
      data: {
        projectId,
        email: validatedData.email.toLowerCase(),
        name: validatedData.name,
        role: validatedData.role,
        status: memberStatus,
        invitedBy: user.email || undefined,
      },
    });

    // If user is not registered, send invitation email
    if (!isRegistered) {
      try {
        const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
        const registerUrl = `${baseUrl}/register?email=${encodeURIComponent(validatedData.email.toLowerCase())}&ref=invite`;

        await sendEmail({
          from: process.env.ZEPTOMAIL_FROM_EMAIL || 'noreply@orba.work',
          to: validatedData.email.toLowerCase(),
          subject: `${user.name || 'Someone'} invited you to collaborate on Orba`,
          html: `
            <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta name="color-scheme" content="light">
                <meta name="supported-color-schemes" content="light">
              </head>
              <body style="margin: 0; padding: 0; background-color: #fafafa; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #fafafa; padding: 48px 16px;">
                  <tr>
                    <td align="center">
                      <!-- Main Container -->
                      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; border: 1px solid #e5e7eb; overflow: hidden;">
                        
                        <!-- Header -->
                        <tr>
                          <td style="padding: 48px 48px 32px 48px;">
                            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                              <tr>
                                <td align="center" style="padding-bottom: 24px;">
                                  <img src="${baseUrl}/logo-dark.svg" alt="Orba" style="height: 32px; display: block;">
                                </td>
                              </tr>
                              <tr>
                                <td style="border-bottom: 1px solid #e5e7eb; padding-bottom: 24px;">
                                  <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #0a0a0a; letter-spacing: -0.025em;">You're Invited to Collaborate!</h1>
                                  <p style="margin: 8px 0 0 0; font-size: 14px; color: #737373; line-height: 1.5;">${user.name || 'A team member'} wants to work with you on Orba</p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        
                        <!-- Content -->
                        <tr>
                          <td style="padding: 0 48px 48px 48px;">
                            <p style="margin: 0 0 20px 0; font-size: 14px; color: #0a0a0a; line-height: 1.6;">
                              Hi <strong>${validatedData.name}</strong>,
                            </p>
                            
                            <p style="margin: 0 0 24px 0; font-size: 14px; color: #525252; line-height: 1.6;">
                              <strong>${user.name || user.email}</strong> has invited you to join <strong>${project.name}</strong> on Orba - a modern project management platform.
                            </p>
                            
                            <!-- Project Info Card -->
                            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #fafafa; border: 1px solid #e5e7eb; border-radius: 6px; margin-bottom: 24px;">
                              <tr>
                                <td style="padding: 20px;">
                                  <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 500; color: #737373; letter-spacing: 0.025em;">PROJECT</p>
                                  <p style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600; color: #0a0a0a;">${project.name}</p>
                                  ${project.description ? `
                                  <p style="margin: 0; font-size: 14px; color: #525252; line-height: 1.6;">${project.description}</p>
                                  ` : ''}
                                </td>
                              </tr>
                            </table>
                            
                            <p style="margin: 0 0 24px 0; font-size: 14px; color: #525252; line-height: 1.6;">
                              To get started, create your free Orba account:
                            </p>
                            
                            <!-- CTA Button -->
                            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin: 32px 0;">
                              <tr>
                                <td align="center">
                                  <a href="${registerUrl}" style="display: inline-block; background-color: #0a0a0a; color: #ffffff; text-decoration: none; padding: 12px 32px; border-radius: 6px; font-weight: 500; font-size: 14px;">
                                    Create Account & Join Project →
                                  </a>
                                </td>
                              </tr>
                            </table>
                            
                            <!-- Benefits -->
                            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom: 24px;">
                              <tr>
                                <td style="padding-bottom: 12px;">
                                  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                    <tr>
                                      <td style="vertical-align: top; padding-right: 12px; width: 20px;">
                                        <div style="width: 6px; height: 6px; background-color: #0a0a0a; border-radius: 50%; margin-top: 6px;"></div>
                                      </td>
                                      <td style="vertical-align: top;">
                                        <p style="margin: 0; font-size: 13px; color: #525252; line-height: 1.5;">Collaborate with your team in real-time</p>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding-bottom: 12px;">
                                  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                    <tr>
                                      <td style="vertical-align: top; padding-right: 12px; width: 20px;">
                                        <div style="width: 6px; height: 6px; background-color: #0a0a0a; border-radius: 50%; margin-top: 6px;"></div>
                                      </td>
                                      <td style="vertical-align: top;">
                                        <p style="margin: 0; font-size: 13px; color: #525252; line-height: 1.5;">Manage tasks with our intuitive Kanban board</p>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                    <tr>
                                      <td style="vertical-align: top; padding-right: 12px; width: 20px;">
                                        <div style="width: 6px; height: 6px; background-color: #0a0a0a; border-radius: 50%; margin-top: 6px;"></div>
                                      </td>
                                      <td style="vertical-align: top;">
                                        <p style="margin: 0; font-size: 13px; color: #525252; line-height: 1.5;">Stay organized with priorities and labels</p>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                            
                            <!-- Alternative Link -->
                            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #fafafa; border: 1px solid #e5e7eb; border-radius: 6px; margin: 24px 0;">
                              <tr>
                                <td style="padding: 16px;">
                                  <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 500; color: #737373; letter-spacing: 0.025em;">OR COPY THIS LINK</p>
                                  <p style="margin: 0; font-size: 12px; color: #0a0a0a; line-height: 1.5; word-break: break-all;">
                                    <a href="${registerUrl}" style="color: #0a0a0a; text-decoration: underline; text-decoration-color: #e5e7eb;">${registerUrl}</a>
                                  </p>
                                </td>
                              </tr>
                            </table>
                            
                            <p style="margin: 24px 0 0 0; font-size: 13px; color: #737373; line-height: 1.6; text-align: center;">
                              Questions? Visit <a href="${baseUrl}" style="color: #0a0a0a; text-decoration: underline; text-decoration-color: #e5e7eb;">orba.work</a>
                            </p>
                          </td>
                        </tr>
                        
                        <!-- Footer -->
                        <tr>
                          <td style="background-color: #fafafa; padding: 32px 48px; border-top: 1px solid #e5e7eb;">
                            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                              <tr>
                                <td>
                                  <p style="margin: 0 0 16px 0; font-size: 13px; color: #0a0a0a; line-height: 1.5;">
                                    Best regards,<br>
                                    <strong>The Orba Team</strong>
                                  </p>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding-top: 16px; border-top: 1px solid #e5e7eb;">
                                  <p style="margin: 0 0 8px 0; font-size: 11px; color: #a3a3a3; line-height: 1.5;">
                                    This is an automated invitation email. If you didn't expect this, you can safely ignore it.
                                  </p>
                                  <p style="margin: 0; font-size: 11px; color: #a3a3a3;">
                                    © ${new Date().getFullYear()} Orba. All rights reserved.
                                  </p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </body>
            </html>
          `,
        });
        
        console.log('Invitation email sent to:', validatedData.email);
      } catch (emailError) {
        console.error('Failed to send invitation email:', emailError);
        // Don't fail the request if email fails - member is already added
      }
    }

    return NextResponse.json({ 
      member,
      invited: !isRegistered 
    }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Error adding project member:', error);
    return NextResponse.json(
      { error: 'Failed to add member' },
      { status: 500 }
    );
  }
}

// DELETE - Remove a member from a project
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const memberId = searchParams.get('memberId');

    if (!memberId) {
      return NextResponse.json(
        { error: 'Member ID is required' },
        { status: 400 }
      );
    }

    // Verify user owns the project
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const member = await prisma.projectMember.findUnique({
      where: { id: memberId },
      include: { project: true },
    });

    if (!member) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    }

    if (member.project.userId !== user.id) {
      return NextResponse.json(
        { error: 'You do not have permission to remove this member' },
        { status: 403 }
      );
    }

    await prisma.projectMember.delete({
      where: { id: memberId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error removing project member:', error);
    return NextResponse.json(
      { error: 'Failed to remove member' },
      { status: 500 }
    );
  }
}

