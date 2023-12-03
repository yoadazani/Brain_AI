"use server"
import prisma from "@/lib/getPrismaClient"

export const getUserLimit = async (userId: string) => {
    return await prisma?.UserApiLimit.findUnique({
        where: {
            userId,
        },
    })
}