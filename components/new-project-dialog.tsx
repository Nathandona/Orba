'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Plus, Crown, Lock, CheckCircle, LockOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/toast';

interface NewProjectDialogProps {
  onProjectCreated?: () => void;
}

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  plan: 'free' | 'premium';
  color: string;
  columns: Array<{ title: string; color: string; position: number }>;
  sampleTasks?: Array<{ title: string; description: string; priority: string; column: number }>;
}

const projectColors = [
  { name: 'Blue', value: 'bg-blue-500' },
  { name: 'Purple', value: 'bg-purple-500' },
  { name: 'Green', value: 'bg-green-500' },
  { name: 'Orange', value: 'bg-orange-500' },
  { name: 'Red', value: 'bg-red-500' },
  { name: 'Pink', value: 'bg-pink-500' },
  { name: 'Yellow', value: 'bg-yellow-500' },
  { name: 'Indigo', value: 'bg-indigo-500' },
];

export function NewProjectDialog({ onProjectCreated }: NewProjectDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [activeTab, setActiveTab] = useState<'custom' | 'template'>('custom');
  const [userTier, setUserTier] = useState<'free' | 'premium'>('free');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: 'bg-blue-500',
    dueDate: '',
  });
  const router = useRouter();

  // Fetch templates when dialog opens
  useEffect(() => {
    if (open) {
      fetchTemplates();
      fetchUserTier();
    }
  }, [open]);

  const fetchTemplates = async () => {
    try {
      const response = await fetch('/api/templates');
      if (response.ok) {
        const data = await response.json();
        setTemplates(data);
      }
    } catch (error) {
      console.error('Error fetching templates:', error);
    }
  };

  const fetchUserTier = async () => {
    try {
      const response = await fetch('/api/profile');
      if (response.ok) {
        const user = await response.json();
        setUserTier(user.subscription?.plan === 'free' || !user.subscription ? 'free' : 'premium');
      }
    } catch (error) {
      console.error('Error fetching user plan:', error);
    }
  };

  const handleTemplateSelect = (template: Template) => {
    if (template.plan === 'premium' && userTier === 'free') {
      showToast('This template requires a pro subscription. Upgrade to unlock pro templates!', 'destructive');
      return;
    }

    setSelectedTemplate(template);
    setFormData(prev => ({
      ...prev,
      name: template.name,
      description: template.description,
      color: template.color,
    }));
    setActiveTab('custom');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        ...formData,
        templateId: selectedTemplate?.id,
      }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        if (errorData.code === 'PROJECT_LIMIT_EXCEEDED') {
          showToast(errorData.error || 'You have reached your project limit on the free plan.', 'destructive');
          return;
        }

        if (errorData.code === 'PREMIUM_TEMPLATE_REQUIRED') {
          showToast(errorData.error || 'This template requires a premium subscription.', 'destructive');
          return;
        }

        throw new Error(errorData.error || 'Failed to create project');
      }

      const project = await response.json();

      // Reset form
      setFormData({
        name: '',
        description: '',
        color: 'bg-blue-500',
        dueDate: '',
      });
      setSelectedTemplate(null);
      setActiveTab('custom');
      setOpen(false);

      // Callback or refresh
      if (onProjectCreated) {
        onProjectCreated();
      } else {
        router.refresh();
      }

      // Show success toast before navigation
      showToast(`Project "${formData.name}" created successfully!`, 'default');

      // Navigate to the new project
      router.push(`/dashboard/project/${project.id}`);
    } catch (error) {
      console.error('Error creating project:', error);
      showToast('Failed to create project. Please try again.', 'destructive');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Start from scratch or choose a template to get started quickly.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(value: string) => setActiveTab(value as 'custom' | 'template')} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="custom">Custom Project</TabsTrigger>
            <TabsTrigger value="template">Choose Template</TabsTrigger>
          </TabsList>

          <TabsContent value="template" className="mt-4">
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                Select a template to pre-configure your project with columns and sample tasks.
              </div>

              {/* Templates Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                {templates.map((template) => {
                  const isLocked = template.plan === 'premium' && userTier === 'free';
                  return (
                    <Card
                      key={template.id}
                      className={`transition-all hover:shadow-md gap-1 ${
                        selectedTemplate?.id === template.id ? 'ring-2 ring-primary' : ''
                      } ${
                        isLocked
                          ? 'opacity-60 cursor-not-allowed relative overflow-hidden'
                          : 'cursor-pointer'
                      }`}
                      onClick={() => !isLocked && handleTemplateSelect(template)}
                    >
                      {/* Locked overlay */}
                      {isLocked && (
                        <div className="absolute inset-0 bg-black/5 backdrop-blur-[1px] z-10" />
                      )}

                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-sm font-medium flex items-center gap-2">
                              {template.name}
                              {template.plan === 'premium' && (
                                <Lock className="w-4 h-4" />
                              )}
                            </CardTitle>
                            <CardDescription className="text-xs mt-1">
                              {template.category}
                            </CardDescription>
                          </div>
                          <Badge
                            variant={isLocked ? 'default' : 'secondary'}
                            className={`text-xs`}
                          >
                            {isLocked ? 'Pro' : template.plan.charAt(0).toUpperCase() + template.plan.slice(1)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-xs text-muted-foreground mb-3">
                          {template.description}
                        </p>

                        {/* Preview columns */}
                        <div className="text-xs font-medium mb-2">Columns:</div>
                        <div className="flex flex-wrap gap-1">
                          {template.columns.slice(0, 3).map((column, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className={`text-xs border-2 ${column.color.replace('bg-', 'border-')} ${isLocked ? 'opacity-50' : ''}`}
                            >
                              {column.title}
                            </Badge>
                          ))}
                          {template.columns.length > 3 && (
                            <Badge variant="outline" className={`text-xs ${isLocked ? 'opacity-50' : ''}`}>
                              +{template.columns.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {userTier === 'free' && templates.some(t => t.plan === 'premium') && (
                <Button
                  type="button"
                  onClick={() => router.push('/pricing')}
                  className="w-full text-sm p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg flex items-center justify-center gap-2 text-amber-700 dark:text-amber-300 cursor-pointer"
                  aria-label="Upgrade to Pro"
                >
                  <LockOpen className="w-4 h-4" />
                  <span>Upgrade to Pro to unlock all templates</span>
                </Button>
              )}
            </div>
          </TabsContent>

          <TabsContent value="custom" className="mt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {selectedTemplate && (
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium">Template:</span>
                      <span className="text-sm">{selectedTemplate.name}</span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedTemplate(null);
                        setFormData({
                          name: '',
                          description: '',
                          color: 'bg-blue-500',
                          dueDate: '',
                        });
                      }}
                      className="text-xs"
                    >
                      Clear
                    </Button>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="project-name">Project Name *</Label>
                <Input
                  id="project-name"
                  placeholder="Website Redesign"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>

          <div className="space-y-2">
            <Label htmlFor="project-description">Description</Label>
            <Textarea
              id="project-description"
              placeholder="Describe your project..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label>Project Color</Label>
            <div className="grid grid-cols-4 gap-2">
              {projectColors.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, color: color.value })}
                  disabled={loading}
                  className={`flex items-center gap-2 p-2 rounded-md border-2 transition-all ${
                    formData.color === color.value
                      ? 'border-primary bg-muted'
                      : 'border-transparent hover:border-muted-foreground/20'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full ${color.value}`} />
                  <span className="text-sm">{color.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="project-due-date">Due Date (Optional)</Label>
            <Input
              id="project-due-date"
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              disabled={loading}
            />
          </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setOpen(false)}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create Project'
                  )}
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
