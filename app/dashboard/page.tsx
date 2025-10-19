import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { DashboardContent } from '@/components/dashboard-content';
import { prisma } from '@/lib/prisma';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  // Fetch user's projects and tasks
  const user = await prisma.user.findUnique({
    where: { email: session.user?.email! },
    include: {
      projects: {
        include: {
          tasks: {
            select: {
              id: true,
              status: true,
              priority: true,
              dueDate: true,
            },
          },
          _count: {
            select: {
              tasks: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!user) {
    redirect('/login');
  }

  // Transform projects data
  const projects = user.projects.map((project) => ({
    ...project,
    totalTasks: project._count.tasks,
    tasksCompleted: project.tasks.filter((task) => task.status === 'done').length,
    team: 1,
  }));

  // Get recent tasks across all projects
  const recentTasks = await prisma.task.findMany({
    where: { userId: user.id },
    include: {
      project: {
        select: {
          name: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
    take: 10,
  });

  return <DashboardContent user={session.user} projects={projects} recentTasks={recentTasks} />;
}
