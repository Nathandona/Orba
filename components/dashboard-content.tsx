'use client';

import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    LayoutGrid,
    List,
    CheckCircle2,
    Clock,
    AlertCircle,
    Users,
    Target,
    MoreVertical,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { DashboardNavbar } from '@/components/dashboard-navbar';
import { NewProjectDialog } from '@/components/new-project-dialog';

interface DashboardContentProps {
    user: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
    };
    projects: Array<{
        id: string;
        name: string;
        description: string | null;
        color: string;
        dueDate: Date | null;
        totalTasks: number;
        tasksCompleted: number;
        team: number;
        isOwner: boolean;
        owner?: {
            id: string;
            name: string | null;
            email: string;
        };
    }>;
    recentTasks: Array<{
        id: string;
        title: string;
        status: string;
        priority: string;
        dueDate: Date | null;
        project: {
            name: string;
        };
    }>;
}

export function DashboardContent({ user, projects: initialProjects, recentTasks: initialTasks }: DashboardContentProps) {
    const [view, setView] = useState<'grid' | 'list'>('grid');
    const [projects, setProjects] = useState(initialProjects);
    const [projectToDelete, setProjectToDelete] = useState<typeof initialProjects[0] | null>(null);
    const [projectToLeave, setProjectToLeave] = useState<typeof initialProjects[0] | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    // Transform recent tasks to match the component's interface
    const recentTasks = initialTasks.slice(0, 4).map(task => ({
        id: task.id,
        title: task.title,
        status: (task.column?.title?.toLowerCase() === 'done' ? 'done' :
                task.column?.title?.toLowerCase().includes('progress') ? 'in-progress' :
                task.column?.title?.toLowerCase().includes('to do') || task.column?.title?.toLowerCase().includes('todo') ? 'todo' :
                'todo') as 'todo' | 'in-progress' | 'completed' | 'done',
        priority: task.priority as 'low' | 'medium' | 'high',
        dueDate: task.dueDate ? task.dueDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        project: task.project.name,
    }));

    // Calculate stats from real data
    const totalProjects = projects.length;
    const totalTasksCompleted = projects.reduce((sum, p) => sum + p.tasksCompleted, 0);
    const totalTasksInProgress = projects.reduce((sum, p) => {
        const inProgressTasks = p.totalTasks - p.tasksCompleted;
        return sum + inProgressTasks;
    }, 0);
    
    // Calculate unique collaborators across all projects
    const totalCollaborators = projects.reduce((sum, p) => sum + (p.team - 1), 0); // -1 to exclude self

    const stats = [
        {
            title: 'Total Projects',
            value: totalProjects.toString(),
            icon: Target,
            color: 'text-blue-600',
        },
        {
            title: 'Tasks Completed',
            value: totalTasksCompleted.toString(),
            icon: CheckCircle2,
            color: 'text-green-600',
        },
        {
            title: 'In Progress',
            value: totalTasksInProgress.toString(),
            icon: Clock,
            color: 'text-orange-600',
        },
        {
            title: 'Collaborators',
            value: totalCollaborators.toString(),
            icon: Users,
            color: 'text-purple-600',
        },
    ];

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed':
            case 'done':
                return <CheckCircle2 className="w-4 h-4 text-green-600" />;
            case 'in-progress':
                return <Clock className="w-4 h-4 text-orange-600" />;
            case 'todo':
                return <AlertCircle className="w-4 h-4 text-blue-600" />;
            default:
                return <AlertCircle className="w-4 h-4 text-gray-600" />;
        }
    };

    const getPriorityBadge = (priority: string) => {
        const variants: Record<string, string> = {
            high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
            medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
            low: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
        };
        return (
            <Badge className={variants[priority] || variants.medium} variant="outline">
                {priority}
            </Badge>
        );
    };

    const handleDeleteProject = async () => {
        if (!projectToDelete) return;
        
        setIsDeleting(true);
        try {
            const response = await fetch(`/api/projects/${projectToDelete.id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Remove from local state
                setProjects(projects.filter(p => p.id !== projectToDelete.id));
                setProjectToDelete(null);
                router.refresh();
            } else {
                const data = await response.json();
                alert(data.error || 'Failed to delete project');
            }
        } catch (error) {
            alert('Failed to delete project. Please try again.');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleLeaveProject = async () => {
        if (!projectToLeave) return;
        
        setIsDeleting(true);
        try {
            const response = await fetch(`/api/projects/${projectToLeave.id}/leave`, {
                method: 'POST',
            });

            if (response.ok) {
                // Remove from local state
                setProjects(projects.filter(p => p.id !== projectToLeave.id));
                setProjectToLeave(null);
                router.refresh();
            } else {
                const data = await response.json();
                alert(data.error || 'Failed to leave project');
            }
        } catch (error) {
            alert('Failed to leave project. Please try again.');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
            {/* Header */}
            <DashboardNavbar
                user={user}
                leftContent={
                    <div className="hidden md:flex items-center gap-2">
                        <Button
                            variant={view === 'grid' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setView('grid')}
                        >
                            <LayoutGrid className="w-4 h-4" />
                        </Button>
                        <Button
                            variant={view === 'list' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setView('list')}
                        >
                            <List className="w-4 h-4" />
                        </Button>
                    </div>
                }
            />

            {/* Main Content */}
            <main className="px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Welcome Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl font-bold tracking-tight">
                            Welcome back, {user.name?.split(' ')[0] || 'there'}!
                        </h2>
                        <p className="text-muted-foreground mt-2">
                            Here's what's happening with your projects today.
                        </p>
                    </motion.div>

                    {/* Stats Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
                    >
                        {stats.map((stat, index) => (
                            <Card key={stat.title}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stat.value}</div>
                                </CardContent>
                            </Card>
                        ))}
                    </motion.div>

                    {/* Projects Section */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-bold tracking-tight">Active Projects</h3>
                            <NewProjectDialog />
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className={
                                view === 'grid'
                                    ? 'grid gap-4 md:grid-cols-2 lg:grid-cols-3'
                                    : 'space-y-4'
                            }
                        >
                            {projects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 * index }}
                                >
                                    <Card
                                        className="hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                                        onClick={() => router.push(`/dashboard/project/${project.id}`)}
                                    >
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <div className={`w-3 h-3 rounded-full ${project.color}`} />
                                                        <CardTitle className="text-lg">{project.name}</CardTitle>
                                                        {!project.isOwner && (
                                                            <Badge variant="secondary" className="text-xs">
                                                                Member
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    {!project.isOwner && project.owner && (
                                                        <p className="text-xs text-muted-foreground ml-6">
                                                            Owned by {project.owner.name || project.owner.email}
                                                        </p>
                                                    )}
                                                </div>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-8 w-8 p-0"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <MoreVertical className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={(e) => {
                                                            e.stopPropagation();
                                                            router.push(`/dashboard/project/${project.id}`);
                                                        }}>
                                                            View Details
                                                        </DropdownMenuItem>
                                                        {project.isOwner && (
                                                            <>
                                                                <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                                                                    Edit Project
                                                                </DropdownMenuItem>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem
                                                                    className="text-red-600"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        setProjectToDelete(project);
                                                                    }}
                                                                >
                                                                    Delete Project
                                                                </DropdownMenuItem>
                                                            </>
                                                        )}
                                                        {!project.isOwner && (
                                                            <>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem
                                                                    className="text-red-600"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        setProjectToLeave(project);
                                                                    }}
                                                                >
                                                                    Leave Project
                                                                </DropdownMenuItem>
                                                            </>
                                                        )}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                            <CardDescription className="mt-2">{project.description}</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div>
                                                <div className="flex items-center justify-between text-sm mb-2">
                                                    <span className="text-muted-foreground">Progress</span>
                                                    <span className="font-medium">
                                                        {project.tasksCompleted}/{project.totalTasks} tasks
                                                    </span>
                                                </div>
                                                <div className="w-full bg-muted rounded-full h-2">
                                                    <div
                                                        className={`${project.color} h-2 rounded-full transition-all duration-300`}
                                                        style={{
                                                            width: `${(project.tasksCompleted / project.totalTasks) * 100}%`,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <Users className="h-4 w-4" />
                                                    <span>{project.team} members</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <Clock className="h-4 w-4" />
                                                    <span>Due {project.dueDate ? new Date(project.dueDate).toLocaleDateString() : 'No date'}</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Recent Tasks Section */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-bold tracking-tight">Recent Tasks</h3>
                            <Button variant="outline">View All</Button>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <Card>
                                <CardContent className="p-0">
                                    <div className="divide-y">
                                        {recentTasks.map((task) => (
                                            <div
                                                key={task.id}
                                                className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                                            >
                                                <div className="flex items-center gap-4 flex-1">
                                                    {getStatusIcon(task.status)}
                                                    <div className="flex-1">
                                                        <h4 className="font-medium">{task.title}</h4>
                                                        <p className="text-sm text-muted-foreground">{task.project}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    {getPriorityBadge(task.priority)}
                                                    <div className="text-sm text-muted-foreground hidden sm:block">
                                                        {new Date(task.dueDate).toLocaleDateString()}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </main>

            {/* Delete Project Dialog */}
            <AlertDialog open={!!projectToDelete} onOpenChange={(open: boolean) => !open && setProjectToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Project</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete <strong>{projectToDelete?.name}</strong>? 
                            This will permanently delete the project and all its tasks. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteProject}
                            disabled={isDeleting}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {isDeleting ? 'Deleting...' : 'Delete Project'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Leave Project Dialog */}
            <AlertDialog open={!!projectToLeave} onOpenChange={(open: boolean) => !open && setProjectToLeave(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Leave Project</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to leave <strong>{projectToLeave?.name}</strong>? 
                            You will lose access to all project tasks and resources. You can be re-invited later.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleLeaveProject}
                            disabled={isDeleting}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {isDeleting ? 'Leaving...' : 'Leave Project'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
