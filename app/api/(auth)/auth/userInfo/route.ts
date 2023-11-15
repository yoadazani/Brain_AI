import {NextRequest, NextResponse} from "next/server";
import {verifyAccessToken} from "@/services/auth/verifyAccessToken";
import {IUserAuth} from "@/interfaces/auth/IUserAuth";
import {findUser} from "@/services/auth/findUser";

export async function GET(req: NextRequest) {
    try {
        const accessToken = req.cookies.get("accessToken")?.value as string
        const secret = process.env.JWT_SECRET as string

        const isValidToken = verifyAccessToken(accessToken, secret) as unknown as IUserAuth

        if (!isValidToken) return new NextResponse("unauthorized", {
            status: 401
        })

        const {email} = isValidToken

        const connectedUser = await findUser(email)

        const { user } = connectedUser

        return NextResponse.json(user, {
            status: 200
        })
    } catch (error) {
        console.log("[AUTHENTICATION_ERROR]", error)
        return new NextResponse("internal server error", {
            status: 500
        })
    }
}
