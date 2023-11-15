'use server'

import prisma from "@/lib/getPrismaClient";

export async function findUser(email: string) {
    console.log(email)
    const user = await prisma?.user.findUnique({
        where: {
            email
        }
    })

    return {
        user
    }

}