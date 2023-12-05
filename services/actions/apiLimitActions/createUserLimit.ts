import prisma from "@/lib/getPrismaClient"
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/(auth)/auth/[...nextauth]/route";


export const createUserLimit = async (
    count: number
) => {
    const session = await getServerSession(authOptions)

    const userId = session?.user.id

    if (!userId) return

    return await prisma?.userApiLimit.create({
        data: {
            userId,
            count,
        },
    });
}