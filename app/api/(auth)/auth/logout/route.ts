import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export async function GET(req: NextRequest) {
    try {
        const accessToken = !!req.cookies.get("accessToken")?.value

        if (!accessToken) {
            return NextResponse.json("You are not logged in", {
                status: 401
            })
        }

        cookies().delete("accessToken")

        return NextResponse.json("Logged out", {
            status: 200
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json("Something went wrong", {
            status: 500
        })
    }
}