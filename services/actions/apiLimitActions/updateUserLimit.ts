"use server"

import prisma from "@/lib/getPrismaClient"

export const updateUserLimit = async (
    userId: string,
    count: number
) => {
    return await prisma?.UserApiLimit.update({
        where: {
            userId,
        },
        data: {
            count,
        },
    });
}