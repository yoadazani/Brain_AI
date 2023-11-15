"use server"
import jsonWebToken from "jsonwebtoken"


export const generateAccessToken = (user: any) => {
    const secret = process.env.JWT_SECRET as string
    return jsonWebToken.sign(user, secret, {
        expiresIn: "1d",
    })
}