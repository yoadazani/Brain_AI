"use server"
import prisma from "@/lib/getPrismaClient"

export const updateUser = async ( userId: string, newUserData: any ) => {
    try {
        await prisma?.user.update({
            where: {
                id: userId
            },
            data: {
                ...newUserData,
                updatedAt: new Date(Date.now())
            }
        })
        return {
            status: "success",
            message: "Your account has been updated."
        }
    } catch (error: Error | any) {
        return {
            status: "error",
            message: "There was an error updating your account. Please try again."
        }
    }
}