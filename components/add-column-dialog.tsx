'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Loader2 } from 'lucide-react';

interface AddColumnDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
  onColumnCreated: (column: any) => void;
}

const columnColors = [
  { name: 'Gray', value: 'border-gray-500' },
  { name: 'Blue', value: 'border-blue-500' },
  { name: 'Green', value: 'border-green-500' },
  { name: 'Yellow', value: 'border-yellow-500' },
  { name: 'Red', value: 'border-red-500' },
  { name: 'Purple', value: 'border-purple-500' },
  { name: 'Pink', value: 'border-pink-500' },
  { name: 'Indigo', value: 'border-indigo-500' },
];

export function AddColumnDialog({ open, onOpenChange, projectId, onColumnCreated }: AddColumnDialogProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    color: 'border-gray-500',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setLoading(true);

    try {
      const response = await fetch(`/api/projects/${projectId}/columns`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title.trim(),
          color: formData.color,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create column');
      }

      const newColumn = await response.json();
      onColumnCreated(newColumn);
      onOpenChange(false);
      setFormData({ title: '', color: 'border-gray-500' });
    } catch (error) {
      console.error('Error creating column:', error);
      alert(error.message || 'Failed to create column. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Column</DialogTitle>
          <DialogDescription>
            Create a new column for organizing your tasks.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="column-title">Column Title *</Label>
            <Input
              id="column-title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Backlog, Testing, Deployed"
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label>Column Color</Label>
            <div className="grid grid-cols-4 gap-2">
              {columnColors.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, color: color.value })}
                  className={`h-8 w-full rounded border-2 ${color.value} ${
                    formData.color === color.value ? 'ring-2 ring-offset-2 ring-primary' : ''
                  }`}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={loading || !formData.title.trim()}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="mr-2 w-4 h-4" />
                  Add Column
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}