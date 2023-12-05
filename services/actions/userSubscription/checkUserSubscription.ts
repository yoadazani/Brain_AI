"use server"

import {getUserSubscription} from "@/services/actions/userSubscription/getUserSubscription";


export const checkUserSubscription = async () => {
    const subscription = await getUserSubscription()

    const DAY_IN_MS = 86_400_000

    if (!subscription) return false

    return subscription.stripePriceId &&
        subscription.stripeCurrentPeriodEnd?.getTime() + DAY_IN_MS > Date.now()
}