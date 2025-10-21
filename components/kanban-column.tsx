'use client';

import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { KanbanCard } from '@/components/kanban-card';
import { Task } from '@/components/kanban-board';
import { NewTaskDialog } from '@/components/new-task-dialog';
import { ColumnMenu } from '@/components/column-menu';

interface TeamMember {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface KanbanColumnProps {
  id: string;
  title: string;
  color: string;
  tasks: Task[];
  projectId: string;
  teamMembers?: TeamMember[];
  onTaskCreated?: (task: any) => void;
  onTaskUpdated?: (task: any) => void;
  onTaskDeleted?: (taskId: string) => void;
  onColumnDeleted?: (columnId: string) => void;
}

export function KanbanColumn({ id, title, color, tasks, projectId, teamMembers, onTaskCreated, onTaskUpdated, onTaskDeleted, onColumnDeleted }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`transition-all duration-200 ${
        isOver ? 'bg-muted/50 rounded-lg scale-[1.02]' : ''
      }`}
    >
      <Card className={`min-h-[200px] border-t-4 ${color} flex flex-col h-fit`}>
        <CardHeader className="pb-2 sm:pb-3 flex-shrink-0 px-3 sm:px-6">
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-base sm:text-lg font-semibold truncate">
              {title}
              <span className="ml-1 sm:ml-2 text-xs sm:text-sm font-normal text-muted-foreground">
                {tasks.length}
              </span>
            </CardTitle>
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <NewTaskDialog
                projectId={projectId}
                columnId={id}
                columnTitle={title}
                teamMembers={teamMembers}
                onTaskCreated={onTaskCreated}
              />
              {onColumnDeleted && (
                <ColumnMenu
                  columnId={id}
                  columnTitle={title}
                  projectId={projectId}
                  onColumnDeleted={onColumnDeleted}
                />
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 sm:space-y-3 pb-2 sm:pb-3 overflow-visible px-3 sm:px-6">
          <SortableContext
            items={tasks.map((task) => `sortable-${task.id}`)}
            strategy={verticalListSortingStrategy}
          >
            {tasks.length === 0 ? (
              <div className={`text-center py-6 sm:py-8 text-muted-foreground text-xs sm:text-sm border-2 border-dashed rounded-lg transition-colors ${
                isOver ? 'border-primary bg-primary/5' : 'border-gray-300'
              }`}>
                <div className="pointer-events-none">
                  <div>Drop tasks here</div>
                  <div className="text-xs mt-1">or create a new task</div>
                </div>
              </div>
            ) : (
              <div className="space-y-2 sm:space-y-3">
                {tasks.map((task) => (
                  <KanbanCard
                    key={`dynamic-${task.id}`}
                    task={task}
                    teamMembers={teamMembers}
                    onUpdate={onTaskUpdated}
                    onDelete={onTaskDeleted}
                  />
                ))}
                {/* Add a drop indicator at the bottom */}
                {isOver && tasks.length > 0 && (
                  <div className="h-2 bg-primary/20 rounded-full animate-pulse" />
                )}
              </div>
            )}
          </SortableContext>
        </CardContent>
      </Card>
    </div>
  );
}
