'use client';

import { useState } from 'react';
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
    Plus,
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

interface DashboardContentProps {
    user: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
    };
}

interface Project {
    id: string;
    name: string;
    description: string;
    color: string;
    tasksCompleted: number;
    totalTasks: number;
    dueDate: string;
    team: number;
}

interface Task {
    id: string;
    title: string;
    status: 'todo' | 'in-progress' | 'completed';
    priority: 'low' | 'medium' | 'high';
    dueDate: string;
    project: string;
}

export function DashboardContent({ user }: DashboardContentProps) {
    const [view, setView] = useState<'grid' | 'list'>('grid');
    const router = useRouter();

    // Mock data - replace with real data from your database
    const projects: Project[] = [
        {
            id: '1',
            name: 'Website Redesign',
            description: 'Complete overhaul of company website',
            color: 'bg-blue-500',
            tasksCompleted: 12,
            totalTasks: 20,
            dueDate: '2025-11-15',
            team: 5,
        },
        {
            id: '2',
            name: 'Mobile App Launch',
            description: 'iOS and Android app development',
            color: 'bg-purple-500',
            tasksCompleted: 8,
            totalTasks: 15,
            dueDate: '2025-12-01',
            team: 8,
        },
        {
            id: '3',
            name: 'Marketing Campaign',
            description: 'Q4 digital marketing strategy',
            color: 'bg-green-500',
            tasksCompleted: 15,
            totalTasks: 18,
            dueDate: '2025-10-30',
            team: 4,
        },
        {
            id: '4',
            name: 'Product Launch',
            description: 'New feature rollout and testing',
            color: 'bg-orange-500',
            tasksCompleted: 5,
            totalTasks: 25,
            dueDate: '2025-11-20',
            team: 6,
        },
    ];

    const recentTasks: Task[] = [
        {
            id: '1',
            title: 'Design landing page mockups',
            status: 'completed',
            priority: 'high',
            dueDate: '2025-10-20',
            project: 'Website Redesign',
        },
        {
            id: '2',
            title: 'Implement authentication flow',
            status: 'in-progress',
            priority: 'high',
            dueDate: '2025-10-22',
            project: 'Mobile App Launch',
        },
        {
            id: '3',
            title: 'Write blog post content',
            status: 'todo',
            priority: 'medium',
            dueDate: '2025-10-25',
            project: 'Marketing Campaign',
        },
        {
            id: '4',
            title: 'User testing feedback analysis',
            status: 'in-progress',
            priority: 'medium',
            dueDate: '2025-10-21',
            project: 'Product Launch',
        },
    ];

    const stats = [
        {
            title: 'Total Projects',
            value: '12',
            icon: Target,
            color: 'text-blue-600',
        },
        {
            title: 'Tasks Completed',
            value: '143',
            icon: CheckCircle2,
            color: 'text-green-600',
        },
        {
            title: 'In Progress',
            value: '28',
            icon: Clock,
            color: 'text-orange-600',
        },
        {
            title: 'Collaborators',
            value: '24',
            icon: Users,
            color: 'text-purple-600',
        },
    ];

    const getStatusIcon = (status: Task['status']) => {
        switch (status) {
            case 'completed':
                return <CheckCircle2 className="w-4 h-4 text-green-600" />;
            case 'in-progress':
                return <Clock className="w-4 h-4 text-orange-600" />;
            case 'todo':
                return <AlertCircle className="w-4 h-4 text-blue-600" />;
        }
    };

    const getPriorityBadge = (priority: Task['priority']) => {
        const variants = {
            high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
            medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
            low: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
        };
        return (
            <Badge className={variants[priority]} variant="outline">
                {priority}
            </Badge>
        );
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
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                New Project
                            </Button>
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
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-3 h-3 rounded-full ${project.color}`} />
                                                    <CardTitle className="text-lg">{project.name}</CardTitle>
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
                                                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                                                            Edit Project
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem
                                                            className="text-red-600"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            Delete Project
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                            <CardDescription>{project.description}</CardDescription>
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
                                                    <span>Due {new Date(project.dueDate).toLocaleDateString()}</span>
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
        </div>
    );
}
