"use server"

import * as jwt from "jsonwebtoken";

export const verifyAccessToken = (token: string, secret: string) => {
    try {
        if (!secret) return new Error("No secret")
        if (!token) return new Error("Not authenticated")

        return jwt.verify(token, secret)
    } catch (error) {
        console.error(error)
        return new Error("Not authenticated")
    }
}