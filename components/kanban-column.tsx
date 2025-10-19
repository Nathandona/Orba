'use client';

import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { KanbanCard } from '@/components/kanban-card';
import { Task } from '@/components/kanban-board';
import { NewTaskDialog } from '@/components/new-task-dialog';

interface KanbanColumnProps {
  id: string;
  title: string;
  color: string;
  tasks: Task[];
  projectId: string;
  onTaskCreated?: (task: any) => void;
}

export function KanbanColumn({ id, title, color, tasks, projectId, onTaskCreated }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`h-full transition-colors ${
        isOver ? 'bg-muted/50 rounded-lg' : ''
      }`}
    >
      <Card className={`h-full border-t-4 ${color}`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              {title}
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                {tasks.length}
              </span>
            </CardTitle>
            <NewTaskDialog
              projectId={projectId}
              status={id as 'todo' | 'in-progress' | 'review' | 'done'}
              onTaskCreated={onTaskCreated}
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-3 pb-3">
          <SortableContext
            items={tasks.map((task) => task.id)}
            strategy={verticalListSortingStrategy}
          >
            {tasks.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">
                No tasks yet
              </div>
            ) : (
              tasks.map((task) => <KanbanCard key={task.id} task={task} />)
            )}
          </SortableContext>
        </CardContent>
      </Card>
    </div>
  );
}
