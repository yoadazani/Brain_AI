"use server"
import {getUserLimit} from "@/services/actions/apiLimitActions/getUserLimit";
import {getUserSubscription} from "@/services/actions/userSubscription/getUserSubscription";
export const checkUserLimit = async (userId: string) => {

    const userPlan = await getUserSubscription(userId)
    const userApiLimit = await getUserLimit(userId)

    if (!userApiLimit || !userPlan) return false

    if (userApiLimit.count >= userPlan.limit) return false
}