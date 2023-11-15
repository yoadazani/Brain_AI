import {NextRequest, NextResponse} from "next/server";
import {decode} from "base-64";
import {findUser} from "@/services/auth/findUser";
import {generateAccessToken} from "@/services/auth/generateAccessToken";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export async function POST(req: NextRequest) {
    try {
        const {email, password} = await req.json()

        const {user} = await findUser(email)

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
            const userInfo = {email: user.email}
            const accessToken = generateAccessToken(userInfo)
            cookies().set("accessToken", accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 60 * 60 * 24,
                path: "/",
            })
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