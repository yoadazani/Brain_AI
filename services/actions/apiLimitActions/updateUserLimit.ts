"use server"

import prisma from "@/lib/getPrismaClient"
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/(auth)/auth/[...nextauth]/route";

export const updateUserLimit = async (count: number) => {
    const session = await getServerSession(authOptions)

    const userId = session?.user.id

    if (!userId) return

    return await prisma?.userApiLimit.update({
        where: {
            userId,
        },
        data: {
            count,
            updatedAt: new Date(Date.now())
        }
    })
}