"use server"

import prisma from "@/lib/getPrismaClient"
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/(auth)/auth/[...nextauth]/route";

export const getUserSubscription = async () => {
    const session = await getServerSession(authOptions)
    const userId = session?.user.id

    if (!userId) return null

    const subscription = await prisma?.userSubscription.findUnique({
        where: {
            userId
        },
        select: {
            stripeCustomerId: true,
            stripeSubscriptionId: true,
            stripePriceId: true,
            stripeCurrentPeriodEnd: true
        }
    })

    if (!subscription) return null

    return subscription
}