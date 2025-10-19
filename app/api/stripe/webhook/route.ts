import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { getPlanFromPriceId } from '@/lib/subscription';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    console.error('Webhook signature verification failed:', error.message);
    return NextResponse.json(
      { error: `Webhook Error: ${error.message}` },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Handle successful checkout
        if (session.mode === 'subscription') {
          const subscriptionId = session.subscription as string;
          const customerId = session.customer as string;
          const userId = session.metadata?.userId;

          if (!userId) {
            console.error('No userId in session metadata');
            break;
          }

          // Get subscription details from Stripe
          const subscription: Stripe.Subscription = await stripe.subscriptions.retrieve(subscriptionId);
          const priceId = subscription.items.data[0].price.id;
          const plan = await getPlanFromPriceId(priceId);

          // Update or create subscription in database
          await prisma.subscription.upsert({
            where: { userId },
            update: {
              stripeSubscriptionId: subscriptionId,
              stripeCustomerId: customerId,
              stripePriceId: priceId,
              stripeCurrentPeriodEnd: new Date(subscription.items.data[0].current_period_end * 1000),
              stripeStatus: subscription.status,
              plan,
            },
            create: {
              userId,
              stripeSubscriptionId: subscriptionId,
              stripeCustomerId: customerId,
              stripePriceId: priceId,
              stripeCurrentPeriodEnd: new Date(subscription.items.data[0].current_period_end * 1000),
              stripeStatus: subscription.status,
              plan,
            },
          });

          // Also update user record
          await prisma.user.update({
            where: { id: userId },
            data: {
              stripeCustomerId: customerId,
              stripeSubscriptionId: subscriptionId,
              stripePriceId: priceId,
              stripeCurrentPeriodEnd: new Date(subscription.items.data[0].current_period_end * 1000),
            },
          });
        }
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;
        const priceId = subscription.items.data[0].price.id;
        const plan = await getPlanFromPriceId(priceId);

        // Find user by Stripe customer ID
        const user = await prisma.user.findUnique({
          where: { stripeCustomerId: customerId },
        });

        if (!user) {
          console.error('User not found for customer:', customerId);
          break;
        }

        // Update subscription
        await prisma.subscription.upsert({
          where: { userId: user.id },
          update: {
            stripeSubscriptionId: subscription.id,
            stripePriceId: priceId,
            stripeCurrentPeriodEnd: new Date(subscription.items.data[0].current_period_end * 1000),
            stripeStatus: subscription.status,
            stripeCancelAtPeriodEnd: subscription.cancel_at_period_end,
            plan,
          },
          create: {
            userId: user.id,
            stripeSubscriptionId: subscription.id,
            stripeCustomerId: customerId,
            stripePriceId: priceId,
            stripeCurrentPeriodEnd: new Date(subscription.items.data[0].current_period_end * 1000),
            stripeStatus: subscription.status,
            stripeCancelAtPeriodEnd: subscription.cancel_at_period_end,
            plan,
          },
        });

        // Update user record
        await prisma.user.update({
          where: { id: user.id },
          data: {
            stripeSubscriptionId: subscription.id,
            stripePriceId: priceId,
            stripeCurrentPeriodEnd: new Date(subscription.items.data[0].current_period_end * 1000),
          },
        });
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        // Find user by Stripe customer ID
        const user = await prisma.user.findUnique({
          where: { stripeCustomerId: customerId },
        });

        if (!user) {
          console.error('User not found for customer:', customerId);
          break;
        }

        // Delete subscription and reset user to free plan
        await prisma.subscription.delete({
          where: { userId: user.id },
        }).catch(() => {
          // Subscription might not exist
        });

        await prisma.user.update({
          where: { id: user.id },
          data: {
            stripeSubscriptionId: null,
            stripePriceId: null,
            stripeCurrentPeriodEnd: null,
          },
        });
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        const subscriptionId = invoice.parent?.subscription_details?.subscription as string | undefined;
        
        if (subscriptionId) {
          const subscription: Stripe.Subscription = await stripe.subscriptions.retrieve(subscriptionId);
          const customerId = subscription.customer as string;

          const user = await prisma.user.findUnique({
            where: { stripeCustomerId: customerId },
          });

          if (user) {
            // Update subscription period end
            await prisma.subscription.update({
              where: { userId: user.id },
              data: {
                stripeCurrentPeriodEnd: new Date(subscription.items.data[0].current_period_end * 1000),
                stripeStatus: subscription.status,
              },
            });

            await prisma.user.update({
              where: { id: user.id },
              data: {
                stripeCurrentPeriodEnd: new Date(subscription.items.data[0].current_period_end * 1000),
              },
            });
          }
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        const subscriptionId = invoice.parent?.subscription_details?.subscription as string | undefined;
        
        if (subscriptionId) {
          const subscription: Stripe.Subscription = await stripe.subscriptions.retrieve(subscriptionId);
          const customerId = subscription.customer as string;

          const user = await prisma.user.findUnique({
            where: { stripeCustomerId: customerId },
          });

          if (user) {
            // Update subscription status
            await prisma.subscription.update({
              where: { userId: user.id },
              data: {
                stripeStatus: subscription.status,
              },
            });
          }
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook handler error:', error);
    return NextResponse.json(
      { error: `Webhook handler failed: ${error.message}` },
      { status: 500 }
    );
  }
}

