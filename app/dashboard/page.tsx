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

  // Fetch user
  const user = await prisma.user.findUnique({
    where: { email: session.user?.email! },
  });

  if (!user) {
    redirect('/login');
  }

  // Fetch projects owned by the user
  const ownedProjects = await prisma.project.findMany({
    where: { userId: user.id },
    include: {
      tasks: {
        select: {
          id: true,
          status: true,
          priority: true,
          dueDate: true,
        },
      },
      members: {
        select: {
          id: true,
          status: true,
        },
      },
      _count: {
        select: {
          tasks: true,
          members: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  // Fetch projects where user is a member
  const memberProjects = await prisma.projectMember.findMany({
    where: { 
      email: user.email,
      status: 'active',
    },
    include: {
      project: {
        include: {
          tasks: {
            select: {
              id: true,
              status: true,
              priority: true,
              dueDate: true,
            },
          },
          members: {
            select: {
              id: true,
              status: true,
            },
          },
          _count: {
            select: {
              tasks: true,
              members: true,
            },
          },
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });

  // Combine and transform projects data
  const allOwnedProjects = ownedProjects.map((project) => ({
    ...project,
    totalTasks: project._count.tasks,
    tasksCompleted: project.tasks.filter((task) => task.status === 'done').length,
    team: project._count.members + 1, // members + owner
    isOwner: true,
  }));

  const allMemberProjects = memberProjects.map((membership) => ({
    ...membership.project,
    totalTasks: membership.project._count.tasks,
    tasksCompleted: membership.project.tasks.filter((task) => task.status === 'done').length,
    team: membership.project._count.members + 1, // members + owner
    isOwner: false,
    owner: membership.project.user,
  }));

  // Combine both lists
  const projects = [...allOwnedProjects, ...allMemberProjects].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );

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
