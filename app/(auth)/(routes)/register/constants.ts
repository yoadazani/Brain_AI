import * as z from "zod"

export const registerSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required",
    }),
    email: z.string().min(1, {
        message: "Email is required",
    }).email({
        message: "Invalid email address",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters",
    }),
})