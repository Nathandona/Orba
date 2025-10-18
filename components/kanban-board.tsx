'use client';

import { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ArrowLeft,
  Plus,
  User,
  Settings,
  LogOut,
  Users,
  Filter,
} from 'lucide-react';
import { signOut } from 'next-auth/react';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { KanbanColumn } from './kanban-column';
import { KanbanCard } from '@/components/kanban-card';

interface KanbanBoardProps {
  project: {
    id: string;
    name: string;
    description: string;
    color: string;
  };
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee?: {
    name: string;
    avatar?: string;
  };
  dueDate?: string;
  labels?: string[];
}

export function KanbanBoard({ project, user }: KanbanBoardProps) {
  const router = useRouter();
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  // Mock tasks data - replace with real data from your database
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Design landing page',
      description: 'Create mockups for the new landing page',
      status: 'todo',
      priority: 'high',
      assignee: { name: 'John Doe' },
      dueDate: '2025-10-25',
      labels: ['design', 'ui/ux'],
    },
    {
      id: '2',
      title: 'Implement authentication',
      description: 'Add NextAuth.js integration',
      status: 'todo',
      priority: 'high',
      assignee: { name: 'Jane Smith' },
      dueDate: '2025-10-22',
      labels: ['backend', 'security'],
    },
    {
      id: '3',
      title: 'Create dashboard layout',
      description: 'Build responsive dashboard with shadcn/ui',
      status: 'in-progress',
      priority: 'medium',
      assignee: { name: 'Mike Johnson' },
      dueDate: '2025-10-24',
      labels: ['frontend', 'ui'],
    },
    {
      id: '4',
      title: 'API endpoint for tasks',
      description: 'Create CRUD operations for tasks',
      status: 'in-progress',
      priority: 'high',
      assignee: { name: 'Sarah Wilson' },
      dueDate: '2025-10-23',
      labels: ['backend', 'api'],
    },
    {
      id: '5',
      title: 'User profile page',
      description: 'Design and implement user profile',
      status: 'review',
      priority: 'medium',
      assignee: { name: 'John Doe' },
      dueDate: '2025-10-21',
      labels: ['frontend'],
    },
    {
      id: '6',
      title: 'Database schema',
      description: 'Define Prisma schema for all models',
      status: 'done',
      priority: 'high',
      assignee: { name: 'Jane Smith' },
      dueDate: '2025-10-18',
      labels: ['backend', 'database'],
    },
    {
      id: '7',
      title: 'Setup CI/CD pipeline',
      description: 'Configure GitHub Actions for deployment',
      status: 'done',
      priority: 'medium',
      assignee: { name: 'Mike Johnson' },
      dueDate: '2025-10-17',
      labels: ['devops'],
    },
  ]);

  const columns = [
    { id: 'todo', title: 'To Do', color: 'border-blue-500' },
    { id: 'in-progress', title: 'In Progress', color: 'border-yellow-500' },
    { id: 'review', title: 'Review', color: 'border-purple-500' },
    { id: 'done', title: 'Done', color: 'border-green-500' },
  ];

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks.find((t) => t.id === active.id);
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task['status'];

    // Update task status
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );

    // Here you would typically make an API call to update the task in your database
  };

  const getTasksByStatus = (status: Task['status']) => {
    return tasks.filter((task) => task.status === status);
  };

  const getUserInitials = (name?: string | null) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/dashboard')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${project.color}`} />
              <h1 className="text-xl font-bold">{project.name}</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Users className="w-4 h-4 mr-2" />
              Team
            </Button>
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarImage src={user.image || undefined} alt={user.name || 'User'} />
                    <AvatarFallback>{getUserInitials(user.name)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name || 'User'}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Kanban Board */}
      <main className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-[1800px] mx-auto">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {columns.map((column, index) => (
                <motion.div
                  key={column.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <KanbanColumn
                    id={column.id}
                    title={column.title}
                    color={column.color}
                    tasks={getTasksByStatus(column.id as Task['status'])}
                  />
                </motion.div>
              ))}
            </div>

            <DragOverlay>
              {activeTask ? <KanbanCard task={activeTask} isDragging /> : null}
            </DragOverlay>
          </DndContext>
        </div>
      </main>
    </div>
  );
}
