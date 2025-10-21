'use client';

import { useState, useEffect } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/toast';
import {
  Loader2,
  X,
  Paperclip,
  Upload,
  MessageSquare,
  Send,
  FileText,
  Image as ImageIcon,
  File,
  Download
} from 'lucide-react';

interface EditTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: {
    id: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    dueDate?: string;
    assignee?: { name: string; avatar?: string };
    labels?: string[];
    _count?: {
      comments: number;
      attachments: number;
    };
  };
  teamMembers?: Array<{ id: string; name: string; email: string }>;
  onSave: (updatedTask: any) => void;
}

interface Comment {
  id: string;
  userName: string;
  content: string;
  createdAt: string;
}

interface Attachment {
  id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  fileUrl: string;
  uploadedBy: string;
}

export function EditTaskDialog({ open, onOpenChange, task, teamMembers, onSave }: EditTaskDialogProps) {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority as 'low' | 'medium' | 'high',
    status: task.status,
    dueDate: task.dueDate || '',
    assignee: task.assignee?.name || '',
    labels: task.labels || [],
    currentLabel: '',
  });

  // Comments state
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loadingComments, setLoadingComments] = useState(false);
  const commentCount = comments.length; // Always derive from actual comments

  // Attachments state
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loadingAttachments, setLoadingAttachments] = useState(false);
  const attachmentCount = attachments.length; // Always derive from actual attachments

  useEffect(() => {
    setFormData({
      title: task.title,
      description: task.description,
      priority: task.priority as 'low' | 'medium' | 'high',
      status: task.status,
      dueDate: task.dueDate || '',
      assignee: task.assignee?.name || '',
      labels: task.labels || [],
      currentLabel: '',
    });
    
    // Fetch comments and attachments when dialog opens
    if (open) {
      fetchComments();
      fetchAttachments();
    }
  }, [task, open]);

  const fetchComments = async () => {
    setLoadingComments(true);
    try {
      const response = await fetch(`/api/tasks/${task.id}/comments`);
      if (response.ok) {
        const data = await response.json();
        setComments(data.comments);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoadingComments(false);
    }
  };

  const fetchAttachments = async () => {
    setLoadingAttachments(true);
    try {
      const response = await fetch(`/api/tasks/${task.id}/attachments`);
      if (response.ok) {
        const data = await response.json();
        setAttachments(data.attachments);
      }
    } catch (error) {
      console.error('Error fetching attachments:', error);
    } finally {
      setLoadingAttachments(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          status: formData.status,
          priority: formData.priority,
          dueDate: formData.dueDate || null,
          assignee: formData.assignee || null,
          labels: formData.labels,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      const updatedTask = await response.json();

      // Show success toast
      showToast('Task updated successfully!', 'default');

      onSave(updatedTask);
      onOpenChange(false);
    } catch (error) {
      console.error('Error updating task:', error);
      showToast('Failed to update task. Please try again.', 'destructive');
    } finally {
      setLoading(false);
    }
  };

  const addLabel = () => {
    if (formData.currentLabel.trim() && !formData.labels.includes(formData.currentLabel.trim())) {
      setFormData({
        ...formData,
        labels: [...formData.labels, formData.currentLabel.trim()],
        currentLabel: '',
      });
    }
  };

  const removeLabel = (label: string) => {
    setFormData({
      ...formData,
      labels: formData.labels.filter((l) => l !== label),
    });
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await fetch(`/api/tasks/${task.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newComment }),
      });

      if (response.ok) {
        const data = await response.json();
        const newComments = [...comments, data.comment];
        setComments(newComments);
        setNewComment('');

        // Update task counts and notify parent
        onSave({
          ...task,
          _count: {
            ...task._count,
            comments: newComments.length
          }
        });
      } else {
        showToast('Failed to add comment', 'destructive');
      }

      // Show success toast only if comment was added successfully
      if (response.ok) {
        showToast('Comment added successfully!', 'default');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      showToast('Failed to add comment', 'destructive');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);
    
    // Upload files one by one
    for (const file of Array.from(files)) {
      try {
        // Create a base64 data URL for the file
        const reader = new FileReader();
        reader.onloadend = async () => {
          const fileUrl = reader.result as string;
          
          const response = await fetch(`/api/tasks/${task.id}/attachments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              fileName: file.name,
              fileSize: file.size,
              fileType: file.type,
              fileUrl: fileUrl,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            setAttachments((prev) => {
              const newAttachments = [...prev, data.attachment];

              // Update task counts and notify parent
              onSave({
                ...task,
                _count: {
                  ...task._count,
                  attachments: newAttachments.length
                }
              });
              return newAttachments;
            });

            // Show success toast for file upload
            showToast(`"${file.name}" uploaded successfully!`, 'default');
          } else {
            showToast(`Failed to upload ${file.name}`, 'destructive');
          }
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Error uploading file:', error);
        showToast(`Failed to upload ${file.name}`, 'destructive');
      }
    }

    setUploading(false);
    // Clear the input
    e.target.value = '';
  };

  const removeAttachment = async (id: string) => {
    try {
      const response = await fetch(`/api/tasks/${task.id}/attachments?attachmentId=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setAttachments((prev) => {
          const newAttachments = prev.filter((a) => a.id !== id);

          // Update task counts and notify parent
          onSave({
            ...task,
            _count: {
              ...task._count,
              attachments: newAttachments.length
            }
          });
          return newAttachments;
        });
      } else {
        showToast('Failed to delete attachment', 'destructive');
      }

      // Show success toast only if attachment was deleted successfully
      if (response.ok) {
        showToast('Attachment deleted successfully!', 'default');
      }
    } catch (error) {
      console.error('Error deleting attachment:', error);
      showToast('Failed to delete attachment', 'destructive');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <ImageIcon className="w-4 h-4" />;
    if (type.includes('pdf')) return <FileText className="w-4 h-4" />;
    return <File className="w-4 h-4" />;
  };

  const handleDownloadFile = (file: Attachment) => {
    try {
      // Create a temporary anchor element to trigger download
      const link = document.createElement('a');
      link.href = file.fileUrl;
      link.download = file.fileName;
      link.target = '_blank';

      // For images and PDFs, we might want to open in new tab instead of download
      // But we'll keep download as the default behavior for consistency
      link.style.display = 'none';

      // Trigger the download
      document.body.appendChild(link);
      link.click();

      // Clean up after a short delay to ensure download starts
      setTimeout(() => {
        document.body.removeChild(link);
      }, 100);
    } catch (error) {
      console.error('Error downloading file:', error);
      showToast('Failed to download file. Please try again.', 'destructive');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>
            Update task details, add comments, and attach files
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="comments">
              <MessageSquare className="w-4 h-4 mr-2" />
              Comments ({comments.length})
            </TabsTrigger>
            <TabsTrigger value="attachments">
              <Paperclip className="w-4 h-4 mr-2" />
              Files ({attachments.length})
            </TabsTrigger>
          </TabsList>

          {/* Details Tab */}
          <TabsContent value="details">
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Task Title *</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  disabled={loading}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                    disabled={loading}
                  >
                    <SelectTrigger id="edit-status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todo">To Do</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="review">Review</SelectItem>
                      <SelectItem value="done">Done</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-priority">Priority</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value: 'low' | 'medium' | 'high') =>
                      setFormData({ ...formData, priority: value })
                    }
                    disabled={loading}
                  >
                    <SelectTrigger id="edit-priority">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-due-date">Due Date</Label>
                  <Input
                    id="edit-due-date"
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-assignee">Assignee</Label>
                  {teamMembers && teamMembers.length > 0 ? (
                    <Select
                      value={formData.assignee}
                      onValueChange={(value) => setFormData({ ...formData, assignee: value })}
                      disabled={loading}
                    >
                      <SelectTrigger id="edit-assignee">
                        <SelectValue placeholder="Select team member" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Unassigned</SelectItem>
                        {teamMembers.map((member) => (
                          <SelectItem key={member.id} value={member.name}>
                            {member.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      id="edit-assignee"
                      value={formData.assignee}
                      onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                      placeholder="Assignee name"
                      disabled={loading}
                    />
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-labels">Labels</Label>
                <div className="flex gap-2">
                  <Input
                    id="edit-labels"
                    placeholder="Add a label"
                    value={formData.currentLabel}
                    onChange={(e) => setFormData({ ...formData, currentLabel: e.target.value })}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addLabel())}
                    disabled={loading}
                  />
                  <Button type="button" variant="outline" onClick={addLabel} disabled={loading}>
                    Add
                  </Button>
                </div>
                {formData.labels.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.labels.map((label) => (
                      <Badge key={label} variant="secondary" className="px-2 py-1">
                        {label}
                        <button
                          type="button"
                          onClick={() => removeLabel(label)}
                          className="ml-1 hover:text-destructive"
                          disabled={loading}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </div>
            </form>
          </TabsContent>

          {/* Comments Tab */}
          <TabsContent value="comments" className="space-y-4">
            {loadingComments ? (
              <div className="text-center py-8 text-muted-foreground">
                <Loader2 className="w-6 h-6 mx-auto mb-2 animate-spin" />
                Loading comments...
              </div>
            ) : (
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {comments.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    No comments yet. Be the first to comment!
                  </div>
                ) : (
                  comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {comment.userName.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{comment.userName}</span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(comment.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{comment.content}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            <Separator />

            <div className="flex gap-2">
              <Input
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleAddComment())}
              />
              <Button onClick={handleAddComment} size="icon">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </TabsContent>

          {/* Attachments Tab */}
          <TabsContent value="attachments" className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <input
                type="file"
                id="file-upload"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                disabled={uploading}
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                {uploading ? (
                  <Loader2 className="w-12 h-12 mx-auto mb-4 text-muted-foreground animate-spin" />
                ) : (
                  <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                )}
                <p className="text-sm text-muted-foreground mb-2">
                  {uploading ? 'Uploading...' : 'Click to upload or drag and drop'}
                </p>
                <p className="text-xs text-muted-foreground">
                  Any file up to 10MB
                </p>
              </label>
            </div>

            {loadingAttachments ? (
              <div className="text-center py-4 text-muted-foreground">
                <Loader2 className="w-6 h-6 mx-auto mb-2 animate-spin" />
                Loading attachments...
              </div>
            ) : attachments.length > 0 ? (
              <div className="space-y-2">
                {attachments.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="p-2 bg-muted rounded">
                        {getFileIcon(file.fileType)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <button
                          onClick={() => handleDownloadFile(file)}
                          className="text-sm font-medium truncate hover:text-primary transition-colors text-left"
                          title="Click to download"
                        >
                          {file.fileName}
                        </button>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(file.fileSize)} • Uploaded by {file.uploadedBy}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownloadFile(file)}
                        className="text-muted-foreground hover:text-foreground"
                        title="Download file"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAttachment(file.id)}
                        className="text-destructive hover:text-destructive"
                        title="Delete file"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground text-sm">
                No files attached yet
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

