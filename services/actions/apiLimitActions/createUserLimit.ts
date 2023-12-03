"use server"
import prisma from "@/lib/getPrismaClient"


export const createUserLimit = async (
    userId: string,
    count: number
) => {
    return await prisma?.UserApiLimit.create({
        data: {
            userId,
            count,
        },
    });
}