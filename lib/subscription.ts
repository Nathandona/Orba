import { prisma } from './prisma';

export async function getUserSubscription(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { subscription: true },
  });

  if (!user) return null;

  const subscription = user.subscription;

  return {
    ...subscription,
    isActive:
      subscription?.stripeStatus === 'active' ||
      subscription?.stripeStatus === 'trialing',
    isPro:
      subscription?.stripeStatus === 'active' &&
      subscription?.plan === 'pro',
    isCanceled: subscription?.stripeCancelAtPeriodEnd || false,
  };
}

export async function getPlanFromPriceId(priceId: string): Promise<string> {
  // Map Stripe price IDs to plan names
  if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_MONTHLY ||
      priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_ANNUAL) {
    return 'pro';
  }
  return 'starter';
}

