import {NextResponse} from "next/server"
import prisma from "@/lib/getPrismaClient";
import {encode} from "base-64";
import {findUser} from "@/services/queries/auth/findUser";

export async function POST(request: Request) {
    try {
        const {name, email, password} = await request.json()

        const encodedPassword = encode(password)

        const userExists = await findUser(email)

        if (userExists) {
            return new NextResponse("user already exists", {
                status: 400
            })
        }

        const user = await prisma?.user.create({
            data: {
                name,
                email,
                password: encodedPassword
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

