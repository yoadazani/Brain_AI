import {chain} from "@/middlewares/chain"
import {authMiddleware} from "@/middlewares/authMiddleware"


const middlewares = [
    authMiddleware
]
export default chain([])

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|user|$).*)"],
}
