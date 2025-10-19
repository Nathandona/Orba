import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-09-30.clover',
  typescript: true,
});

export const STRIPE_PLANS = {
  starter: {
    name: 'Starter',
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER!,
    price: 0,
  },
  pro_monthly: {
    name: 'Pro (Monthly)',
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_MONTHLY!,
    price: 12,
    interval: 'month' as const,
  },
  pro_annual: {
    name: 'Pro (Annual)',
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_ANNUAL!,
    price: 10,
    interval: 'year' as const,
  },
} as const;

export type StripePlan = keyof typeof STRIPE_PLANS;

