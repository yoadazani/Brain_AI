import {NextResponse} from "next/server"
import prisma, {connectToDatabase} from "@/lib/getPrismaClient";
import bcrypt from "bcrypt"
import {findUser} from "@/services/queries/auth/findUser";

export async function POST(request: Request) {
    try {
        const userInfo = await request.json()


        await connectToDatabase()
        const userExists = await findUser(userInfo.email)

        if (userExists) {
            return new NextResponse("user already exists", {
                status: 400
            })
        }

        const encodedPassword = bcrypt.hashSync(userInfo.hashedPassword, 10)

        const user = await prisma?.user.create({
            data: {
                ...userInfo,
                hashedPassword: encodedPassword
            }
        })

        if (!user) {
            return new NextResponse("internal server error", {
                status: 500
            })
        }

        return NextResponse.json("user created successfully", {
            status: 200
        })

    } catch (error) {
        console.log("[REGISTER_ERROR]", error)
        return new NextResponse("internal server error", {
            status: 500
        })
    }
}

