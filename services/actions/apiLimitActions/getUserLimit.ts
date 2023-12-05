"use server"

import prisma from "@/lib/getPrismaClient"
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/(auth)/auth/[...nextauth]/route";

export const getUserLimit = async () => {
    const session = await getServerSession(authOptions)

    const userId = session?.user.id

    if (!userId) return 0

    const userApiLimit = await prisma?.userApiLimit.findUnique({
        where: {
            userId
        }
    })

    if (!userApiLimit) return 0

    return userApiLimit.count
}