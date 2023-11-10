export interface IAuthContext {
    user: {
        name: string
        email: string
        image?: string
        password?: string
        token?: string
    }
}