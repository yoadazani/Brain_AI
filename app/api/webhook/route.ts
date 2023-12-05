import { headers } from "next/headers";
import { NextResponse } from "next/server";

import Stripe from "stripe";
import prisma from "@/lib/getPrismaClient"
import { StripeClient } from "@/lib/stripe";

export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get('Stripe-Signature') as string;

    let event: Stripe.Event;

    try {
        event = StripeClient.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: any) {
        return NextResponse.json(`[WEBHOOK ERROR: ${error.message}]`, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === "checkout.session.completed") {
        const subscription = await StripeClient.subscriptions.retrieve(
            session.subscription as string
        )

        if (!session?.metadata?.userId) {
            return new NextResponse("User ID not found in metadata", { status: 400 });
        }

        await prisma.userSubscription.create({
            data: {
                userId: session.metadata.userId,
                stripeSubscriptionId: subscription.id,
                stripeCustomerId: subscription.customer as string,
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(
                    subscription.current_period_end * 1000
                ),
            }
        })
    }

    if (event.type === "invoice.payment_succeeded") {
        const subscription = await StripeClient.subscriptions.retrieve(
            session.subscription as string
        )

        await prisma.userSubscription.update({
            where: {
                stripeSubscriptionId: subscription.id
            },
            data: {
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(
                    subscription.current_period_end * 1000
                ),
            }
        })
    }

    return NextResponse.json({ received: true }, { status: 200 });
}
