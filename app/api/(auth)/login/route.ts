import {NextResponse} from "next/server";
import {decode, encode} from "base-64";
import { client as redis } from "@/lib/connectRedisDB";
import {findUser} from "@/services/queries/auth/findUser";
import {generateAccessToken} from "@/services/queries/auth/generateAccessToken";
export async function POST(req: Request) {
    try {
        const {email, password} = await req.json()

        const { user } = await findUser(email)

        if (!user) {
            return new NextResponse("user not found", {
                status: 404
            })
        }

        const decodedPassword = decode(user.password)

        if (decodedPassword !== password) {
            return new NextResponse("invalid password", {
                status: 400
            })
        } else {
            const userInfo = {
                id: user.id,
                name: user.name,
                email: user.email
            }
        }


        return NextResponse.json("logged in successfully", {
            status: 200
        })
    } catch (error) {
        console.log("[AUTHENTICATION_ERROR]", error)
        return new NextResponse("internal server error", {
            status: 500
        })
    }
}