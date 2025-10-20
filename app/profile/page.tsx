import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { ProfileContent } from '@/components/profile-content';
import { getUserSubscription } from '@/lib/subscription';
import { prisma } from '@/lib/prisma';

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        redirect('/login');
    }

    // Get user from database with all profile fields
    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: {
            id: true,
            name: true,
            email: true,
            image: true,
            bio: true,
            location: true,
            company: true,
            jobTitle: true,
        },
    });

    if (!user) {
        redirect('/login');
    }

    // Get subscription data
    const subscription = await getUserSubscription(user.id);

    // Get statistics
    const [projectCount, taskCount, completedTaskCount] = await Promise.all([
        prisma.project.count({
            where: { userId: user.id },
        }),
        prisma.task.count({
            where: { userId: user.id },
        }),
        prisma.task.count({
            where: {
                userId: user.id,
                status: 'done',
            },
        }),
    ]);

    // Calculate hours logged (estimated based on completed tasks)
    const hoursLogged = completedTaskCount * 2;

    // For team members, count unique assignees in tasks
    const tasksWithAssignees = await prisma.task.findMany({
        where: { userId: user.id },
        select: { assignee: true },
        distinct: ['assignee'],
    });

    const teamMembers = tasksWithAssignees.filter((t) => t.assignee).length;

    const stats = {
        projects: projectCount,
        tasksCompleted: completedTaskCount,
        teamMembers: teamMembers,
        hoursLogged: hoursLogged,
    };

    return <ProfileContent user={user} subscription={subscription} stats={stats} />;
}
