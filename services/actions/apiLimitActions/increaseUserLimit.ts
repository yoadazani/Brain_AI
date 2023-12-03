"use server"

import prisma from "@/lib/getPrismaClient"
import {getUserLimit} from "@/services/actions/apiLimitActions/getUserLimit";
import {updateUserLimit} from "@/services/actions/apiLimitActions/updateUserLimit";
import {createUserLimit} from "@/services/actions/apiLimitActions/createUserLimit";

export const increaseUserLimit = async (
    userId: string,
)=> {
    const userApiLimit = await getUserLimit(userId)

    if (!userApiLimit) {
        return await createUserLimit(userId, 1);
    }

    return await updateUserLimit(userId, userApiLimit.count + 1);
}