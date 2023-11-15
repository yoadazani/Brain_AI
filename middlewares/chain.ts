import {NextMiddleware, NextResponse} from "next/server";

export type MiddlewareFactory = (next: NextMiddleware) => NextMiddleware
export const chain = (middlewares: MiddlewareFactory[], index: number = 0): NextMiddleware => {
    const current = middlewares[index];

    if (current) {
        const next = chain(middlewares, index + 1)
        return current(next)
    }

    return () => NextResponse.next()

}