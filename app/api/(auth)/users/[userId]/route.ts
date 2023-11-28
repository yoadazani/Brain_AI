import prisma from "@/lib/getPrismaClient";
import {NextResponse} from "next/server";
import bcrypt from "bcrypt";

export async function PUT(req: Request, {params}: {params: { userId: string }}) {
    try {
        const body = await req.json()

        const newData = {
            ...body,
            hashedPassword: bcrypt.hashSync(body.hashedPassword, 10),
            updatedAt: new Date(Date.now())
        }
        delete newData.id
        const currentUser = await prisma?.user.update({
            where: {
                id: params.userId
            },
            data: {
                ...newData
            }
        })

        console.log(currentUser)
        return NextResponse.json("user updated", {
            status: 200,
        })
    } catch (error) {
        console.log("[AUTHENTICATION_ERROR]", error)
        return new NextResponse("internal server error", {
            status: 500
        })
    }
}
