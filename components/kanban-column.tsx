'use client';

import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { KanbanCard } from '@/components/kanban-card';
import { Task } from '@/components/kanban-board';

interface KanbanColumnProps {
  id: string;
  title: string;
  color: string;
  tasks: Task[];
}

export function KanbanColumn({ id, title, color, tasks }: KanbanColumnProps) {
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
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Plus className="h-4 w-4" />
            </Button>
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
