'use client';

import { useState } from 'react';
import { DashboardNavbar } from '@/components/dashboard-navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import {
    User,
    Mail,
    Calendar,
    MapPin,
    Briefcase,
    Save,
    Camera,
    Shield,
    Bell,
    Palette,
    Lock,
    CheckCircle2,
    AlertCircle,
    CreditCard,
    Crown,
    ExternalLink,
    Loader2,
} from 'lucide-react';

interface ProfileContentProps {
    user: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
        bio?: string | null;
        location?: string | null;
        company?: string | null;
        jobTitle?: string | null;
    };
    subscription?: {
        plan: string;
        stripeStatus?: string;
        stripeCurrentPeriodEnd?: Date | null;
        stripeCancelAtPeriodEnd?: boolean;
        isActive?: boolean;
        isPro?: boolean;
        isCanceled?: boolean;
    } | null;
    stats?: {
        projects: number;
        tasksCompleted: number;
        teamMembers: number;
        hoursLogged: number;
    };
}

export function ProfileContent({ user, subscription, stats }: ProfileContentProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [isLoadingPortal, setIsLoadingPortal] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || '',
        location: user.location || '',
        company: user.company || '',
        jobTitle: user.jobTitle || '',
    });

    const handleSave = async () => {
        setIsSaving(true);
        setSaveStatus('idle');
        
        try {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    bio: formData.bio,
                    location: formData.location,
                    company: formData.company,
                    jobTitle: formData.jobTitle,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            setIsSaving(false);
            setSaveStatus('success');
            setIsEditing(false);
            
            // Reset status after 3 seconds and reload to show updated data
            setTimeout(() => {
                setSaveStatus('idle');
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.error('Error saving profile:', error);
            setIsSaving(false);
            setSaveStatus('error');
            
            // Reset error status after 3 seconds
            setTimeout(() => {
                setSaveStatus('idle');
            }, 3000);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setFormData({
            name: user.name || '',
            email: user.email || '',
            bio: user.bio || '',
            location: user.location || '',
            company: user.company || '',
            jobTitle: user.jobTitle || '',
        });
    };

    const handleManageSubscription = async () => {
        setIsLoadingPortal(true);
        try {
            const response = await fetch('/api/stripe/portal', {
                method: 'POST',
            });
            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            }
        } catch (error) {
            console.error('Error opening customer portal:', error);
        } finally {
            setIsLoadingPortal(false);
        }
    };

    const statsData = [
        { label: 'Projects', value: stats?.projects?.toString() || '0' },
        { label: 'Tasks Completed', value: stats?.tasksCompleted?.toString() || '0' },
        { label: 'Team Members', value: stats?.teamMembers?.toString() || '0' },
        { label: 'Hours Logged', value: stats?.hoursLogged?.toString() || '0' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
            <DashboardNavbar user={user} />

            <main className="px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-5xl mx-auto space-y-8">
                    {/* Header Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                                    {/* Avatar */}
                                    <div className="relative group">
                                        <Avatar className="h-32 w-32 border-4 border-primary/20">
                                            <AvatarImage src={user.image || undefined} alt={user.name || 'User'} />
                                            <AvatarFallback className="text-4xl font-bold bg-primary text-primary-foreground">
                                                {user.name?.charAt(0).toUpperCase() || 
                                                 user.email?.charAt(0).toUpperCase() || 
                                                 'U'}
                                            </AvatarFallback>
                                        </Avatar>
                                        <Button
                                            size="sm"
                                            className="absolute bottom-0 right-0 rounded-full h-10 w-10 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Camera className="h-4 w-4" />
                                        </Button>
                                    </div>

                                    {/* User Info */}
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center gap-2">
                                            <h1 className="text-3xl font-bold">{user.name || 'User'}</h1>
                                            <Badge variant="outline" className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                                Verified
                                            </Badge>
                                        </div>
                                        <p className="text-muted-foreground flex items-center gap-2">
                                            <Mail className="h-4 w-4" />
                                            {user.email}
                                        </p>
                                        {formData.jobTitle && formData.company && (
                                            <p className="text-muted-foreground flex items-center gap-2">
                                                <Briefcase className="h-4 w-4" />
                                                {formData.jobTitle} at {formData.company}
                                            </p>
                                        )}
                                        {formData.location && (
                                            <p className="text-muted-foreground flex items-center gap-2">
                                                <MapPin className="h-4 w-4" />
                                                {formData.location}
                                            </p>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2">
                                        {!isEditing ? (
                                            <Button onClick={() => setIsEditing(true)}>
                                                Edit Profile
                                            </Button>
                                        ) : (
                                            <>
                                                <Button
                                                    variant="outline"
                                                    onClick={handleCancel}
                                                    disabled={isSaving}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    onClick={handleSave}
                                                    disabled={isSaving}
                                                >
                                                    {isSaving ? (
                                                        'Saving...'
                                                    ) : (
                                                        <>
                                                            <Save className="h-4 w-4 mr-2" />
                                                            Save Changes
                                                        </>
                                                    )}
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Stats */}
                                <Separator className="my-6" />
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {statsData.map((stat, index) => (
                                        <motion.div
                                            key={stat.label}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="text-center"
                                        >
                                            <div className="text-2xl font-bold text-primary">{stat.value}</div>
                                            <div className="text-sm text-muted-foreground">{stat.label}</div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Save Status */}
                                {saveStatus === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-4 p-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg flex items-center gap-2"
                                    >
                                        <CheckCircle2 className="h-4 w-4" />
                                        Profile updated successfully!
                                    </motion.div>
                                )}
                                {saveStatus === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-4 p-3 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg flex items-center gap-2"
                                    >
                                        <AlertCircle className="h-4 w-4" />
                                        Failed to update profile. Please try again.
                                    </motion.div>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Tabs Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Tabs defaultValue="general" className="w-full">
                            <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="general">
                                    <User className="h-4 w-4 mr-2" />
                                    General
                                </TabsTrigger>
                                <TabsTrigger value="billing">
                                    <CreditCard className="h-4 w-4 mr-2" />
                                    Billing
                                </TabsTrigger>
                                <TabsTrigger value="security">
                                    <Shield className="h-4 w-4 mr-2" />
                                    Security
                                </TabsTrigger>
                                <TabsTrigger value="preferences">
                                    <Palette className="h-4 w-4 mr-2" />
                                    Preferences
                                </TabsTrigger>
                            </TabsList>

                            {/* General Tab */}
                            <TabsContent value="general" className="space-y-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Personal Information</CardTitle>
                                        <CardDescription>
                                            Update your personal details and information
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="name">Full Name</Label>
                                                <Input
                                                    id="name"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    disabled={!isEditing}
                                                    placeholder="Enter your full name"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email">Email Address</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    disabled={!isEditing}
                                                    placeholder="Enter your email"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="bio">Bio</Label>
                                            <Textarea
                                                id="bio"
                                                value={formData.bio}
                                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                                disabled={!isEditing}
                                                placeholder="Tell us about yourself..."
                                                rows={4}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="jobTitle">Job Title</Label>
                                                <Input
                                                    id="jobTitle"
                                                    value={formData.jobTitle}
                                                    onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                                                    disabled={!isEditing}
                                                    placeholder="e.g. Software Engineer"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="company">Company</Label>
                                                <Input
                                                    id="company"
                                                    value={formData.company}
                                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                                    disabled={!isEditing}
                                                    placeholder="Your company name"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="location">Location</Label>
                                            <Input
                                                id="location"
                                                value={formData.location}
                                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                                disabled={!isEditing}
                                                placeholder="e.g. San Francisco, CA"
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Billing Tab */}
                            <TabsContent value="billing" className="space-y-4">
                                <Card>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <CardTitle>Subscription & Billing</CardTitle>
                                                <CardDescription>
                                                    Manage your subscription and payment methods
                                                </CardDescription>
                                            </div>
                                            {subscription?.isPro && (
                                                <Badge className="bg-primary/10 text-primary border-primary">
                                                    <Crown className="h-3 w-3 mr-1" />
                                                    Pro
                                                </Badge>
                                            )}
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        {/* Current Plan */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold">Current Plan</h3>
                                            <div className="rounded-lg border-2 border-primary/20 p-6 bg-primary/5">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h4 className="text-2xl font-bold capitalize">
                                                            {subscription?.plan || 'Starter'} Plan
                                                        </h4>
                                                        {subscription?.isPro && (
                                                            <p className="text-muted-foreground mt-2">
                                                                {subscription.stripeCurrentPeriodEnd && (
                                                                    <>
                                                                        {subscription.isCanceled
                                                                            ? 'Expires'
                                                                            : 'Renews'} on{' '}
                                                                        {new Date(subscription.stripeCurrentPeriodEnd).toLocaleDateString('en-US', {
                                                                            month: 'long',
                                                                            day: 'numeric',
                                                                            year: 'numeric',
                                                                        })}
                                                                    </>
                                                                )}
                                                            </p>
                                                        )}
                                                        {subscription?.isCanceled && (
                                                            <Badge variant="destructive" className="mt-2">
                                                                Canceled - Access until period end
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <div className="text-right">
                                                        {subscription?.isPro ? (
                                                            <>
                                                                <div className="text-3xl font-bold">$12</div>
                                                                <div className="text-sm text-muted-foreground">/user/month</div>
                                                            </>
                                                        ) : (
                                                            <div className="text-3xl font-bold">Free</div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Plan Features */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold">Plan Features</h3>
                                            <div className="space-y-2">
                                                {subscription?.isPro ? (
                                                    <>
                                                        <div className="flex items-center gap-2 text-sm">
                                                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                                                            <span>Unlimited boards</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-sm">
                                                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                                                            <span>Unlimited team members</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-sm">
                                                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                                                            <span>Advanced analytics</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-sm">
                                                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                                                            <span>Priority support</span>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="flex items-center gap-2 text-sm">
                                                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                                                            <span>Up to 3 boards</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-sm">
                                                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                                                            <span>5 team members</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-sm">
                                                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                                                            <span>Basic templates</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-sm">
                                                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                                                            <span>Email support</span>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        <Separator />

                                        {/* Actions */}
                                        <div className="space-y-4">
                                            {subscription?.isPro ? (
                                                <>
                                                    <Button
                                                        onClick={handleManageSubscription}
                                                        disabled={isLoadingPortal}
                                                        className="w-full"
                                                    >
                                                        {isLoadingPortal ? (
                                                            <>
                                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                                Loading...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <CreditCard className="mr-2 h-4 w-4" />
                                                                Manage Subscription
                                                                <ExternalLink className="ml-2 h-4 w-4" />
                                                            </>
                                                        )}
                                                    </Button>
                                                    <p className="text-xs text-muted-foreground text-center">
                                                        Update payment method, billing info, or cancel your subscription
                                                    </p>
                                                </>
                                            ) : (
                                                <Button
                                                    onClick={() => window.location.href = '/pricing'}
                                                    className="w-full"
                                                >
                                                    <Crown className="mr-2 h-4 w-4" />
                                                    Upgrade to Pro
                                                </Button>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Security Tab */}
                            <TabsContent value="security" className="space-y-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Security Settings</CardTitle>
                                        <CardDescription>
                                            Manage your password and security preferences
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="current-password">Current Password</Label>
                                            <Input
                                                id="current-password"
                                                type="password"
                                                placeholder="Enter current password"
                                                disabled={!isEditing}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="new-password">New Password</Label>
                                            <Input
                                                id="new-password"
                                                type="password"
                                                placeholder="Enter new password"
                                                disabled={!isEditing}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="confirm-password">Confirm New Password</Label>
                                            <Input
                                                id="confirm-password"
                                                type="password"
                                                placeholder="Confirm new password"
                                                disabled={!isEditing}
                                            />
                                        </div>

                                        <Separator className="my-4" />

                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                                <Lock className="h-5 w-5" />
                                                Two-Factor Authentication
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                Add an extra layer of security to your account
                                            </p>
                                            <Button variant="outline" disabled={!isEditing}>
                                                Enable Two-Factor Authentication
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Preferences Tab */}
                            <TabsContent value="preferences" className="space-y-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Preferences</CardTitle>
                                        <CardDescription>
                                            Customize your experience
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                                <Bell className="h-5 w-5" />
                                                Notifications
                                            </h3>
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="font-medium">Email Notifications</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            Receive email updates about your projects
                                                        </p>
                                                    </div>
                                                    <input type="checkbox" className="h-4 w-4" disabled={!isEditing} />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="font-medium">Push Notifications</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            Receive push notifications for important updates
                                                        </p>
                                                    </div>
                                                    <input type="checkbox" className="h-4 w-4" disabled={!isEditing} />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="font-medium">Weekly Summary</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            Get a weekly summary of your activity
                                                        </p>
                                                    </div>
                                                    <input type="checkbox" className="h-4 w-4" disabled={!isEditing} />
                                                </div>
                                            </div>
                                        </div>

                                        <Separator />

                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                                <Calendar className="h-5 w-5" />
                                                Date & Time
                                            </h3>
                                            <div className="space-y-2">
                                                <Label htmlFor="timezone">Timezone</Label>
                                                <Input
                                                    id="timezone"
                                                    placeholder="UTC-8 (Pacific Time)"
                                                    disabled={!isEditing}
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
