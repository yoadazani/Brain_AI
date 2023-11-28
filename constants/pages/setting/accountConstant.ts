import * as z from "zod";


const MAX_FILE_SIZE = 5000000;
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];


export const accountSchema = z.object({
    name: z.string().min(1).optional(),
    email: z.string()
        .min(1, "Invalid email")
        .email("Invalid email").optional(),
    picture: z.instanceof(File).optional() || z.string().url().optional()
})