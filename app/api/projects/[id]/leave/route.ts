import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';

// POST - Leave a project (remove yourself as a member)
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

    // Get user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if project exists
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Check if user is the owner
    if (project.userId === user.id) {
      return NextResponse.json(
        { error: 'You cannot leave a project you own. Delete it instead.' },
        { status: 400 }
      );
    }

    // Find and delete the membership
    const membership = await prisma.projectMember.findUnique({
      where: {
        projectId_email: {
          projectId,
          email: user.email,
        },
      },
    });

    if (!membership) {
      return NextResponse.json(
        { error: 'You are not a member of this project' },
        { status: 404 }
      );
    }

    await prisma.projectMember.delete({
      where: { id: membership.id },
    });

    return NextResponse.json({ success: true, message: 'Left project successfully' });
  } catch (error) {
    console.error('Leave project error:', error);
    return NextResponse.json(
      { error: 'Failed to leave project' },
      { status: 500 }
    );
  }
}

