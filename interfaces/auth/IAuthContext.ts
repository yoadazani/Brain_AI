import {IUserAuth} from "@/interfaces/auth/IUserAuth";
import {AxiosError} from "axios";

export interface IAuthContext {
    getUserInfo: () => Promise<IUserAuth>
    isAuth: () => Promise<{
        user: IUserAuth | null
        error: Error | any
    }>
    logout: () => void
}