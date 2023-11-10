import prisma from "@/lib/getPrismaClient";
import {NextResponse} from "next/server";
import {redirect} from "next/navigation";

export async function PUT(req: Request, {params}: {params: { userId: string }}) {
    try {
        const newUserData = await req.json()
        const currentUser = await prisma?.user.update({
            where: {
                id: +params.userId
            },
            data: {
                ...newUserData
            }
        })
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
