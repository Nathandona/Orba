'use client';

import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Calendar,
  MessageSquare,
  Paperclip,
  MoreVertical,
  Edit,
  Trash2,
} from 'lucide-react';
import { Task } from '@/components/kanban-board';
import { EditTaskDialog } from '@/components/edit-task-dialog';

interface KanbanCardProps {
  task: Task;
  isDragging?: boolean;
  teamMembers?: Array<{ id: string; name: string; email: string }>;
  onUpdate?: (updatedTask: Task) => void;
}

export function KanbanCard({ task, isDragging = false, teamMembers, onUpdate }: KanbanCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [localTask, setLocalTask] = useState(task);

  // Update local task when prop changes
  React.useEffect(() => {
    setLocalTask(task);
  }, [task]);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: `sortable-${task.id}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isSortableDragging ? 0.5 : 1,
  };

  const handleSave = (updatedTask: any) => {
    // Update local state immediately for UI responsiveness
    setLocalTask(updatedTask);
    if (onUpdate) {
      onUpdate(updatedTask);
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <Card
          className={`cursor-grab active:cursor-grabbing hover:shadow-lg transition-shadow ${isDragging ? 'shadow-2xl rotate-3' : ''
            }`}
        >
          <CardContent className="p-4 space-y-3">
            {/* Menu in top right */}
            <div className="flex justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 hover:bg-muted"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsEditOpen(true);
                    }}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Task
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      // TODO: Add delete functionality
                    }}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Task
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Task Title */}
            <h4 className="font-semibold text-sm leading-tight">{task.title}</h4>

            {/* Task Description */}
            {task.description && (
              <p className="text-xs text-muted-foreground line-clamp-2">
                {task.description}
              </p>
            )}

            {/* Labels */}
            {task.labels && task.labels.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {task.labels.map((label) => (
                  <Badge
                    key={label}
                    variant="secondary"
                    className="text-xs px-2 py-0"
                  >
                    {label}
                  </Badge>
                ))}
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between pt-2 border-t">
              {/* Left group: due date, comments, files, assignee */}
              <div className="flex items-center gap-3 text-muted-foreground">
                {task.dueDate && (
                  <div className="flex items-center gap-1 text-xs">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-xs">
                    <MessageSquare className="w-3 h-3" />
                    <span>{localTask._count?.comments || 0}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <Paperclip className="w-3 h-3" />
                    <span>{localTask._count?.attachments || 0}</span>
                  </div>
                </div>
                {/* Assignee */}
                {task.assignee && (
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs">
                      {getInitials(task.assignee.name)}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>

              {/* Right group: priority badge */}
              <Badge
                variant="outline"
                className={`${getPriorityColor(task.priority)} text-xs`}
              >
                {task.priority}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <EditTaskDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        task={localTask}
        teamMembers={teamMembers}
        onSave={handleSave}
      />
    </>
  );
}
