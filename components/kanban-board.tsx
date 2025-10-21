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
  closestCenter,
  rectIntersection,
  CollisionDetection,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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

  // Custom collision detection that prioritizes columns over tasks
  const customCollisionDetection: CollisionDetection = (args) => {
    // Get all droppable containers that are columns
    const columnContainers = args.droppableContainers.filter(container =>
      columns.some(col => col.id === container.id)
    );

    // Check if we're intersecting with any columns
    const columnIntersections = rectIntersection({
      ...args,
      droppableContainers: columnContainers,
    });

    // If we have column intersections, return those
    if (columnIntersections.length > 0) {
      return columnIntersections;
    }

    // Otherwise, fall back to default closest center behavior
    return closestCenter(args);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const taskId = typeof active.id === 'string' ? active.id.replace('sortable-', '') : active.id;
    let newColumnId = typeof over.id === 'string' ? over.id : over.id.toString();

    // If the over element is a task (sortable-), find its column
    if (newColumnId.startsWith('sortable-')) {
      const droppedOnTask = tasks.find(t => `sortable-${t.id}` === newColumnId);
      if (droppedOnTask && droppedOnTask.columnId) {
        newColumnId = droppedOnTask.columnId;
      }
    }

    // Find the original task to preserve its data for potential revert
    const originalTask = tasks.find((t) => t.id === taskId);
    if (!originalTask) {
      console.error('Task not found:', taskId);
      return;
    }

    // Verify the target column exists
    const targetColumn = columns.find((col) => col.id === newColumnId);
    if (!targetColumn) {
      console.error('Target column not found:', newColumnId);
      return;
    }

    // If the task is already in the target column, no need to update
    if (originalTask.columnId === newColumnId) {
      console.log('Task already in target column, skipping update');
      return;
    }

    console.log('Moving task from', originalTask.columnId, 'to', newColumnId);

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
        const errorText = await response.text();
        // Revert on error - use the original task's columnId
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId ? { ...task, columnId: originalTask.columnId } : task
          )
        );
        console.error('Failed to update task:', errorText);
        console.error('Task ID:', taskId, 'Target Column ID:', newColumnId);
      }
    } catch (error) {
      // Revert on network error - use the original task's columnId
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, columnId: originalTask.columnId } : task
        )
      );
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
            <div className="flex gap-6 overflow-x-auto pb-4 min-h-[200px] items-start scrollbar-thin scrollbar-thumb-slate-300 hover:scrollbar-thumb-slate-400 scrollbar-track-transparent">
              {columns.map((column, index) => (
                <motion.div
                  key={column.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex-shrink-0 w-80"
                >
                  <div className="w-full">
                    <div className={`min-h-[200px] border-t-4 ${column.color} rounded-lg bg-card p-4 flex flex-col h-fit`}>
                      <h3 className="font-semibold mb-4 flex-shrink-0">{column.title}</h3>
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
              {/* Add Column Button - Static version */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: columns.length * 0.1 }}
                className="flex-shrink-0 w-80"
              >
                <div className="w-full">
                  <div className="min-h-[200px] border-2 border-dashed border-muted-foreground/30 rounded-lg bg-card flex flex-col items-center justify-center hover:border-primary/50 hover:bg-muted/20 transition-all duration-200 cursor-pointer group p-4"
                       onClick={() => setIsAddColumnOpen(true)}>
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-muted group-hover:bg-primary/10 flex items-center justify-center transition-colors duration-200">
                        <svg className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      <h3 className="font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                        Add Column
                      </h3>
                      <p className="text-xs text-muted-foreground/70 mt-1">
                        Create new column
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={customCollisionDetection}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <div className="flex gap-6 overflow-x-auto pb-4 min-h-[200px] items-start scrollbar-thin scrollbar-thumb-slate-300 hover:scrollbar-thumb-slate-400 scrollbar-track-transparent">
              {columns.map((column, index) => (
                <motion.div
                  key={column.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex-shrink-0 w-80"
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
              {/* Add Column Button - Fixed position at the end */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: columns.length * 0.1 }}
                className="flex-shrink-0 w-80"
              >
                <Card className="min-h-[200px] border-2 border-dashed border-muted-foreground/30 flex flex-col items-center justify-center hover:border-primary/50 hover:bg-muted/20 transition-all duration-200 cursor-pointer group"
                      onClick={() => setIsAddColumnOpen(true)}>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-muted group-hover:bg-primary/10 flex items-center justify-center transition-colors duration-200">
                      <svg className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                      Add Column
                    </h3>
                    <p className="text-xs text-muted-foreground/70 mt-1">
                      Create new column
                    </p>
                  </div>
                </Card>
              </motion.div>
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
