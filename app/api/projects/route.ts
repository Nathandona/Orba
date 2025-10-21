import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';

// GET all projects for the current user
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const projects = await prisma.project.findMany({
      where: { userId: user.id },
      include: {
        tasks: {
          include: {
            column: {
              select: {
                title: true,
              },
            },
          },
        },
        _count: {
          select: {
            tasks: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Transform data to include task counts
    const projectsWithStats = projects.map((project) => ({
      ...project,
      totalTasks: project._count.tasks,
      tasksCompleted: project.tasks.filter((task) =>
        task.column && task.column.title.toLowerCase() === 'done'
      ).length,
      team: 1, // For now, single user per project
    }));

    return NextResponse.json(projectsWithStats);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST create a new project
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const body = await req.json();
    const { name, description, color, dueDate } = body;

    if (!name) {
      return NextResponse.json({ error: 'Project name is required' }, { status: 400 });
    }

    const project = await prisma.project.create({
      data: {
        name,
        description: description || null,
        color: color || 'bg-blue-500',
        dueDate: dueDate ? new Date(dueDate) : null,
        userId: user.id,
      },
      include: {
        _count: {
          select: {
            tasks: true,
          },
        },
      },
    });

    // Create default columns for the new project
    const defaultColumns = [
      { title: 'To Do', color: 'border-blue-500', position: 0 },
      { title: 'In Progress', color: 'border-yellow-500', position: 1 },
      { title: 'Done', color: 'border-green-500', position: 2 },
    ];

    for (const columnData of defaultColumns) {
      await prisma.column.create({
        data: {
          ...columnData,
          projectId: project.id,
        },
      });
    }

    return NextResponse.json({
      ...project,
      totalTasks: 0,
      tasksCompleted: 0,
      team: 1,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}

