import {NextFetchEvent, type NextRequest, NextResponse} from "next/server";
import {MiddlewareFactory} from "@/middlewares/chain";

const protectedRoutes = [
    "/dashboard",
    "/conversation",
    "/code-generator",
    "image-generator",
    "/audio-transcriptions",
    "/setting",
]
export const authMiddleware: MiddlewareFactory = (next) => (
    async (req: NextRequest, _next: NextFetchEvent) => {
        const accessToken = !!req.cookies.get("accessToken")?.value

        if (!accessToken) {
            const url = new URL("/user/login", req.nextUrl.origin)
            return NextResponse.redirect(url.toString())
        }

        if (accessToken && !protectedRoutes.includes(req.nextUrl.pathname)) {
            const url = new URL("/dashboard", req.nextUrl.origin)
            return NextResponse.redirect(url.toString())
        }

        return next(req, _next)
    }
)