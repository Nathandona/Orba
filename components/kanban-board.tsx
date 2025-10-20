'use client';

import { useState, useEffect } from 'react';
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
import { Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { KanbanColumn } from './kanban-column';
import { KanbanCard } from '@/components/kanban-card';
import { DashboardNavbar } from '@/components/dashboard-navbar';
import { TeamDialog } from '@/components/team-dialog';
import { AddColumnDialog } from '@/components/add-column-dialog';

interface KanbanBoardProps {
  project: {
    id: string;
    name: string;
    description: string | null;
    color: string;
  };
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  initialTasks: Array<{
    id: string;
    title: string;
    description: string | null;
    status: string;
    priority: string;
    assignee: string | null;
    dueDate: Date | null;
    labels: string[];
    columnId: string | null;
    _count?: {
      comments: number;
      attachments: number;
    };
  }>;
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
  columnId: string | null;
  _count?: {
    comments: number;
    attachments: number;
  };
}

export interface TeamMember {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface Column {
  id: string;
  title: string;
  color: string;
  position: number;
  _count?: {
    tasks: number;
  };
}

export function KanbanBoard({ project, user, initialTasks }: KanbanBoardProps) {
  const router = useRouter();
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [isAddColumnOpen, setIsAddColumnOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration errors with dnd-kit by only rendering after mount
  useEffect(() => {
    setIsMounted(true);
    // Fetch columns on mount
    fetchColumns();
  }, []);

  const fetchColumns = async () => {
    try {
      const response = await fetch(`/api/projects/${project.id}/columns`);
      if (response.ok) {
        const data = await response.json();
        setColumns(data);
      }
    } catch (error) {
      console.error('Error fetching columns:', error);
    }
  };

  const handleColumnCreated = (newColumn: Column) => {
    setColumns((prevColumns) => [...prevColumns, newColumn]);
  };

  const handleColumnDeleted = (columnId: string) => {
    setColumns((prevColumns) => prevColumns.filter((col) => col.id !== columnId));
    // Remove tasks that were in the deleted column
    setTasks((prevTasks) => prevTasks.filter((task) => task.columnId !== columnId));
  };

  // Transform initial tasks to match component interface, removing duplicates
  const [tasks, setTasks] = useState<Task[]>(() => {
    const seen = new Set();
    return initialTasks
      .map(task => ({
        id: task.id,
        title: task.title,
        description: task.description || '',
        status: task.status as 'todo' | 'in-progress' | 'review' | 'done',
        priority: task.priority as 'low' | 'medium' | 'high',
        assignee: task.assignee ? { name: task.assignee } : undefined,
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : undefined,
        labels: task.labels || [],
        columnId: task.columnId,
        _count: task._count,
      }))
      .filter(task => {
        if (seen.has(task.id)) {
          console.warn(`Duplicate task ID found: ${task.id}`);
          return false;
        }
        seen.add(task.id);
        return true;
      });
  });

  const handleTaskCreated = (newTask: any) => {
    // Add new task to the state
    const task: Task = {
      id: newTask.id,
      title: newTask.title,
      description: newTask.description || '',
      status: 'todo', // Default status for compatibility
      priority: newTask.priority as 'low' | 'medium' | 'high',
      assignee: newTask.assignee ? { name: newTask.assignee } : undefined,
      dueDate: newTask.dueDate ? new Date(newTask.dueDate).toISOString().split('T')[0] : undefined,
      labels: newTask.labels || [],
      columnId: newTask.columnId,
      _count: newTask._count || { comments: 0, attachments: 0 },
    };
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const handleTaskUpdated = (updatedTask: any) => {
    // Update existing task in the state
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id
          ? {
              ...task,
              title: updatedTask.title,
              description: updatedTask.description || '',
              status: task.status, // Keep existing status for compatibility
              priority: updatedTask.priority as 'low' | 'medium' | 'high',
              assignee: updatedTask.assignee ? { name: updatedTask.assignee } : undefined,
              dueDate: updatedTask.dueDate ? new Date(updatedTask.dueDate).toISOString().split('T')[0] : undefined,
              labels: updatedTask.labels || [],
              columnId: updatedTask.columnId || task.columnId,
              _count: updatedTask._count || task._count,
            }
          : task
      )
    );
  };

  const handleTaskDeleted = (taskId: string) => {
    // Remove task from the state
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const getTasksByColumn = (columnId: string) => {
    return tasks.filter((task) => task.columnId === columnId);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const taskId = typeof active.id === 'string' ? active.id.replace('sortable-', '') : active.id;
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const taskId = typeof active.id === 'string' ? active.id.replace('sortable-', '') : active.id;
    const newColumnId = typeof over.id === 'string' ? over.id : over.id.toString();

    // Optimistically update UI
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, columnId: newColumnId } : task
      )
    );

    // Update task in database
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ columnId: newColumnId }),
      });

      if (!response.ok) {
        // Revert on error
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId ? { ...task, columnId: task.columnId } : task
          )
        );
        console.error('Failed to update task');
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Header */}
      <DashboardNavbar
        user={user}
        showBackButton
        backButtonPath="/dashboard"
        leftContent={
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${project.color}`} />
            <h1 className="text-xl font-bold">{project.name}</h1>
          </div>
        }
        rightContent={
          <>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAddColumnOpen(true)}
            >
              Add Column
            </Button>
            <TeamDialog
              projectId={project.id}
              projectOwner={user}
              onMembersChange={(members) => setTeamMembers(members)}
            />
          </>
        }
      />

      {/* Kanban Board */}
      <main className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-[1800px] mx-auto">
          {!isMounted ? (
            // Static render during hydration to prevent mismatch
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {columns.map((column, index) => (
                <motion.div
                  key={column.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="h-full">
                    <div className={`h-full border-t-4 ${column.color} rounded-lg bg-card p-4`}>
                      <h3 className="font-semibold mb-4">{column.title}</h3>
                      <div className="space-y-3">
                        {tasks.filter((t) => t.columnId === column.id).map((task) => (
                          <div key={`static-${task.id}`} className="bg-background rounded-lg p-3 shadow-sm border">
                            <p className="text-sm font-medium">{task.title}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
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
                    tasks={getTasksByColumn(column.id)}
                    projectId={project.id}
                    teamMembers={teamMembers}
                    onTaskCreated={handleTaskCreated}
                    onTaskUpdated={handleTaskUpdated}
                    onTaskDeleted={handleTaskDeleted}
                    onColumnDeleted={handleColumnDeleted}
                  />
                </motion.div>
              ))}
            </div>

              <DragOverlay>
                {activeTask ? (
                  <KanbanCard 
                    task={activeTask} 
                    isDragging 
                    teamMembers={teamMembers}
                  />
                ) : null}
              </DragOverlay>
            </DndContext>
          )}
        </div>
      </main>

      {/* Add Column Dialog */}
      <AddColumnDialog
        open={isAddColumnOpen}
        onOpenChange={setIsAddColumnOpen}
        projectId={project.id}
        onColumnCreated={handleColumnCreated}
      />
    </div>
  );
}
