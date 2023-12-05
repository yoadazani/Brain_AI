import {NextResponse} from "next/server";

import prisma from "@/lib/getPrismaClient"
import { StripeClient } from "@/lib/stripe";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/(auth)/auth/[...nextauth]/route";
import {absoluteUrl} from "@/lib/utils";

const settingUrl = absoluteUrl("/setting/plans")
export async function GET() {
    try {
        const session = await getServerSession(authOptions)

        const userId = session?.user?.id

        if (!userId) {
            return NextResponse.json("Unauthorized", { status: 401 })
        }

        const userSubscriptions = await prisma.userSubscription.findUnique({
            where: {
                userId
            }
        })

        if (userSubscriptions && userSubscriptions.stripeCustomerId) {
            const stripeBillingPortalSession = await StripeClient.billingPortal.sessions.create({
                customer: userSubscriptions.stripeCustomerId,
                return_url: settingUrl
            })

            return NextResponse.json({url: stripeBillingPortalSession.url})
        }

        const stripeCheckoutSession = await StripeClient.checkout.sessions.create({
            success_url: settingUrl,
            cancel_url: settingUrl,
            mode: "subscription",
            billing_address_collection: "auto",
            customer_email: session?.user?.email,
            line_items: [
                {
                    price_data: {
                        currency: "USD",
                        product_data: {
                            name: "Brain Pro",
                            description: "Ultimated AI Generations",
                        },
                        unit_amount: 4000,
                        recurring: {
                            interval: "month",
                        }
                    },
                    quantity: 1
                }
            ],
            metadata: {
                userId
            }
        })

        return NextResponse.json({url: stripeCheckoutSession.url})

    } catch (error) {
        console.log("[STRIPE ERROR]", error)
        return NextResponse.json("Internal Server Error", { status: 500 })
    }
}