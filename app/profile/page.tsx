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

    // Get user from database
    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    });

    if (!user) {
        redirect('/login');
    }

    // Get subscription data
    const subscription = await getUserSubscription(user.id);

    return <ProfileContent user={session.user} subscription={subscription} />;
}
