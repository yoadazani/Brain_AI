import * as z from "zod"

export const registerSchema = z.object({
    name: z.string()
        .min(1, "Name is required"),
    email: z.string()
        .min(1, "Email is required")
        .email("Invalid email address"),
    hashedPassword: z.string()
        .min(8, "Password must be at least 8 characters")
})