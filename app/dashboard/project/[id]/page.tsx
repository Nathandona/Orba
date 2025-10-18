import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { KanbanBoard } from '@/components/kanban-board';

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const session = await getServerSession(authOptions);
  const { id } = await params;

  if (!session) {
    redirect('/login');
  }

  // Mock project data - replace with real data from your database
  const project = {
    id,
    name: getProjectName(id),
    description: 'Project description here',
    color: getProjectColor(id),
  };

  return <KanbanBoard project={project} user={session.user} />;
}

function getProjectName(id: string): string {
  const names: Record<string, string> = {
    '1': 'Website Redesign',
    '2': 'Mobile App Launch',
    '3': 'Marketing Campaign',
    '4': 'Product Launch',
  };
  return names[id] || 'Project';
}

function getProjectColor(id: string): string {
  const colors: Record<string, string> = {
    '1': 'bg-blue-500',
    '2': 'bg-purple-500',
    '3': 'bg-green-500',
    '4': 'bg-orange-500',
  };
  return colors[id] || 'bg-gray-500';
}
