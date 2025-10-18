'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Calendar,
  GripVertical,
  MessageSquare,
  Paperclip,
} from 'lucide-react';
import { Task } from '@/components/kanban-board';

interface KanbanCardProps {
  task: Task;
  isDragging?: boolean;
}

export function KanbanCard({ task, isDragging = false }: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isSortableDragging ? 0.5 : 1,
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
    <div ref={setNodeRef} style={style} {...attributes}>
      <Card
        className={`cursor-grab active:cursor-grabbing hover:shadow-lg transition-shadow ${
          isDragging ? 'shadow-2xl rotate-3' : ''
        }`}
      >
        <CardContent className="p-4 space-y-3">
          {/* Drag Handle and Priority */}
          <div className="flex items-start justify-between gap-2">
            <div {...listeners} className="cursor-grab active:cursor-grabbing">
              <GripVertical className="w-4 h-4 text-muted-foreground" />
            </div>
            <Badge
              variant="outline"
              className={`${getPriorityColor(task.priority)} text-xs`}
            >
              {task.priority}
            </Badge>
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
            <div className="flex items-center gap-3 text-muted-foreground">
              {task.dueDate && (
                <div className="flex items-center gap-1 text-xs">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>
              )}
              <div className="flex items-center gap-1 text-xs">
                <MessageSquare className="w-3 h-3" />
                <span>0</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <Paperclip className="w-3 h-3" />
                <span>0</span>
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
        </CardContent>
      </Card>
    </div>
  );
}
