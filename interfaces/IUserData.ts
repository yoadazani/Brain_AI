export type IUserData = {
    role: string,
    data: {
        prompt: string,
        n: number,
        size: "256x256" | "512x512" | "1024x1024"
    }
}
