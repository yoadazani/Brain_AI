"use server"
import {getUserLimit} from "@/services/actions/apiLimitActions/getUserLimit";

import {FREE_TRIAL_LIMIT} from "@/constants/app/freeTrialLimit";
export const checkUserLimit = async () => {
    const userApiLimit = await getUserLimit()

    return (!userApiLimit || userApiLimit < FREE_TRIAL_LIMIT)
}