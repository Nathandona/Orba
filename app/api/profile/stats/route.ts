import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Fetch statistics
    const [projectCount, taskCount, completedTaskCount] = await Promise.all([
      prisma.project.count({
        where: { userId: user.id },
      }),
      prisma.task.count({
        where: { userId: user.id },
      }),
      prisma.task.count({
        where: {
          userId: user.id,
          status: 'done',
        },
      }),
    ]);

    // Calculate hours logged (estimated based on completed tasks)
    // Assuming each completed task takes an average of 2 hours
    const hoursLogged = completedTaskCount * 2;

    // For team members, we'll count unique assignees in tasks
    const tasksWithAssignees = await prisma.task.findMany({
      where: { userId: user.id },
      select: { assignee: true },
      distinct: ['assignee'],
    });

    const teamMembers = tasksWithAssignees.filter((t) => t.assignee).length;

    return NextResponse.json({
      stats: {
        projects: projectCount,
        tasksCompleted: completedTaskCount,
        teamMembers: teamMembers,
        hoursLogged: hoursLogged,
      },
    });
  } catch (error) {
    console.error('Error fetching profile stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile stats' },
      { status: 500 }
    );
  }
}

