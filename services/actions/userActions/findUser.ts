"use server"

import prisma from "@/lib/getPrismaClient";

export async function findUser(email: string) {
    return prisma.user.findUnique({
        where: {
            email,
            hashedPassword: {
                not: null
            }
        }
    })
}