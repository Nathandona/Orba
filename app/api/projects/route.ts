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
      include: {
        subscription: true,
        _count: {
          select: {
            projects: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check tier limits for free users
    const isFreeTier = !user.subscription || user.subscription.plan === 'free';
    if (isFreeTier && user._count.projects >= 3) {
      return NextResponse.json({
        error: 'You have reached your limit of 3 projects on the free plan. Upgrade to create more projects.',
        code: 'PROJECT_LIMIT_EXCEEDED',
        limit: 3,
        current: user._count.projects
      }, { status: 403 });
    }

    const body = await req.json();
    const { name, description, color, dueDate, templateId } = body;

    if (!name) {
      return NextResponse.json({ error: 'Project name is required' }, { status: 400 });
    }

    // Check template access if provided
    let template = null;
    if (templateId) {
      template = await prisma.projectTemplate.findUnique({
        where: { id: templateId },
      });

      if (!template || !template.isActive) {
        return NextResponse.json({ error: 'Invalid template' }, { status: 400 });
      }

      if (template.plan === 'premium' && (!user.subscription || user.subscription.plan === 'free')) {
        return NextResponse.json({
          error: 'This template requires a premium subscription. Upgrade to access premium templates.',
          code: 'PREMIUM_TEMPLATE_REQUIRED'
        }, { status: 403 });
      }
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

    // Create columns based on template or default
    let columns;
    if (template && template.columns && Array.isArray(template.columns)) {
      columns = template.columns;
    } else {
      columns = [
        { title: 'To Do', color: 'border-blue-500', position: 0 },
        { title: 'In Progress', color: 'border-yellow-500', position: 1 },
        { title: 'Done', color: 'border-green-500', position: 2 },
      ];
    }

    for (const columnData of columns) {
      if (columnData && typeof columnData === 'object' && 'title' in columnData && 'color' in columnData && 'position' in columnData) {
        await prisma.column.create({
          data: {
            title: columnData.title as string,
            color: columnData.color as string,
            position: columnData.position as number,
            projectId: project.id,
          },
        });
      }
    }

    // Create sample tasks if template has them
    if (template && template.sampleTasks && Array.isArray(template.sampleTasks)) {
      const createdColumns = await prisma.column.findMany({
        where: { projectId: project.id },
        orderBy: { position: 'asc' },
      });

      for (const taskData of template.sampleTasks) {
        if (taskData && typeof taskData === 'object' && 'title' in taskData && 'column' in taskData) {
          const columnId = taskData.column as number;
          const targetColumn = createdColumns[columnId];
          if (targetColumn) {
            await prisma.task.create({
              data: {
                title: taskData.title as string,
                description: (taskData.description as string) || '',
                priority: (taskData.priority as string) || 'medium',
                projectId: project.id,
                userId: user.id,
              columnId: targetColumn.id,
              position: 0,
            },
          });
          }
        }
      }
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

