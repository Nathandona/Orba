import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { KanbanBoard } from '@/components/kanban-board';
import { prisma } from '@/lib/prisma';

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const session = await getServerSession(authOptions);
  const { id } = await params;

  if (!session) {
    redirect('/login');
  }

  // Fetch user
  const user = await prisma.user.findUnique({
    where: { email: session.user?.email! },
  });

  if (!user) {
    redirect('/login');
  }

  // Fetch project with tasks - check if user is owner OR member
  const project = await prisma.project.findFirst({
    where: {
      OR: [
        { id, userId: user.id }, // User is owner
        { 
          id, 
          members: {
            some: {
              email: user.email,
              status: 'active'
            }
          }
        }, // User is member
      ],
    },
    include: {
      tasks: {
        include: {
          column: {
            select: {
              id: true,
              title: true,
              color: true,
              position: true,
            },
          },
          _count: {
            select: {
              comments: true,
              attachments: true,
            },
          },
        },
        orderBy: [
          { column: { position: 'asc' } },
          { position: 'asc' },
          { createdAt: 'asc' },
        ],
      },
      members: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  if (!project) {
    redirect('/dashboard');
  }

  // Transform tasks to match the expected interface (convert column to status)
  const transformedTasks = project.tasks.map(task => ({
    id: task.id,
    title: task.title,
    description: task.description,
    status: (task.column?.title?.toLowerCase() === 'done' ? 'done' :
            task.column?.title?.toLowerCase().includes('progress') ? 'in-progress' :
            task.column?.title?.toLowerCase().includes('review') ? 'review' :
            task.column?.title?.toLowerCase().includes('to do') || task.column?.title?.toLowerCase().includes('todo') ? 'todo' :
            'todo') as 'todo' | 'in-progress' | 'review' | 'done',
    priority: task.priority,
    assignee: task.assignee,
    dueDate: task.dueDate,
    labels: task.labels,
    columnId: task.columnId,
    _count: task._count,
  }));

  return <KanbanBoard project={project} user={session.user} initialTasks={transformedTasks} />;
}
