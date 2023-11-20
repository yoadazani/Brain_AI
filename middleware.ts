

export {default} from "next-auth/middleware"

export const config = {
    matcher: [
        "/dashboard",
        "/conversation",
        "/code-generator",
        "/image-generator",
        "/audio-transcriptions",
        "/setting"
    ]
}