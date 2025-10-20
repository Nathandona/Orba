import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/zeptomail';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    // Always return success to prevent email enumeration
    // But only send email if user exists
    if (user) {
      // Generate reset token
      const resetToken = crypto.randomBytes(32).toString('hex');
      const hashedToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

      // Store token in database (expires in 1 hour)
      const expires = new Date(Date.now() + 3600000); // 1 hour from now

      await prisma.verificationToken.create({
        data: {
          identifier: email.toLowerCase(),
          token: hashedToken,
          expires,
        },
      });

      // Create reset URL
      const resetUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;

      // Send email
      const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
      try {
        await sendEmail({
          from: process.env.ZEPTOMAIL_FROM_EMAIL || 'noreply@orba.work',
          to: email,
          subject: 'Reset Your Orba Password',
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
                                  <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #0a0a0a; letter-spacing: -0.025em;">Reset Your Password</h1>
                                  <p style="margin: 8px 0 0 0; font-size: 14px; color: #737373; line-height: 1.5;">We received a request to reset your password</p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        
                        <!-- Content -->
                        <tr>
                          <td style="padding: 0 48px 48px 48px;">
                            <p style="margin: 0 0 20px 0; font-size: 14px; color: #0a0a0a; line-height: 1.6;">
                              Hi <strong>${user.name || 'there'}</strong>,
                            </p>
                            
                            <p style="margin: 0 0 24px 0; font-size: 14px; color: #525252; line-height: 1.6;">
                              We received a request to reset your password for your Orba account. Click the button below to create a new password:
                            </p>
                            
                            <!-- CTA Button -->
                            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin: 32px 0;">
                              <tr>
                                <td align="center">
                                  <a href="${resetUrl}" style="display: inline-block; background-color: #0a0a0a; color: #ffffff; text-decoration: none; padding: 12px 32px; border-radius: 6px; font-weight: 500; font-size: 14px;">
                                    Reset Password →
                                  </a>
                                </td>
                              </tr>
                            </table>
                            
                            <!-- Alternative Link -->
                            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #fafafa; border: 1px solid #e5e7eb; border-radius: 6px; margin: 24px 0;">
                              <tr>
                                <td style="padding: 16px;">
                                  <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 500; color: #737373; letter-spacing: 0.025em;">OR COPY THIS LINK</p>
                                  <p style="margin: 0; font-size: 12px; color: #0a0a0a; line-height: 1.5; word-break: break-all;">
                                    <a href="${resetUrl}" style="color: #0a0a0a; text-decoration: underline; text-decoration-color: #e5e7eb;">${resetUrl}</a>
                                  </p>
                                </td>
                              </tr>
                            </table>
                            
                            <!-- Security Warning -->
                            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #fef9c3; border: 1px solid #fde047; border-radius: 6px; margin: 24px 0;">
                              <tr>
                                <td style="padding: 16px;">
                                  <p style="margin: 0; font-size: 13px; color: #854d0e; line-height: 1.5;">
                                    <strong style="font-weight: 600;">⏰ Security Notice:</strong> This link will expire in <strong>1 hour</strong> for your protection.
                                  </p>
                                </td>
                              </tr>
                            </table>
                            
                            <!-- Security Tips -->
                            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom: 24px;">
                              <tr>
                                <td style="padding-bottom: 12px;">
                                  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                    <tr>
                                      <td style="vertical-align: top; padding-right: 12px; width: 20px;">
                                        <div style="width: 6px; height: 6px; background-color: #0a0a0a; border-radius: 50%; margin-top: 6px;"></div>
                                      </td>
                                      <td style="vertical-align: top;">
                                        <p style="margin: 0; font-size: 13px; color: #525252; line-height: 1.5;">If you didn't request this reset, you can safely ignore this email</p>
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
                                        <p style="margin: 0; font-size: 13px; color: #525252; line-height: 1.5;">Your password will remain unchanged until you create a new one</p>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                            
                            <p style="margin: 24px 0 0 0; font-size: 13px; color: #737373; line-height: 1.6; text-align: center;">
                              Need help? Visit <a href="${baseUrl}" style="color: #0a0a0a; text-decoration: underline; text-decoration-color: #e5e7eb;">orba.work</a>
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
                                    This is an automated email, please do not reply. For support, please contact us through our website.
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
      } catch (emailError) {
        console.error('Failed to send password reset email:', emailError);
        return NextResponse.json(
          { error: 'Failed to send email. Please try again later.' },
          { status: 500 }
        );
      }
    }

    // Always return success to prevent email enumeration
    return NextResponse.json({
      message: 'If an account exists with that email, a password reset link has been sent.',
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'An error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}

