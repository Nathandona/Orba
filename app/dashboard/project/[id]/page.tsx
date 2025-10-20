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

  return <KanbanBoard project={project} user={session.user} initialTasks={project.tasks} />;
}
