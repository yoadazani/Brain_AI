"use server"
import prisma from "@/lib/getPrismaClient"

export const getUserSubscription = async (userId: string) => {
    return await prisma?.userSubscription.findUnique({
        where: {
            userId,
        },
    })
}