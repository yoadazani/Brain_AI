"use client"

import {ComponentState, createContext, ReactNode, useContext, useEffect} from "react";
import {IAuthContext} from "@/interfaces/auth/IAuthContext";
import axios, {AxiosError} from "axios";
import {IUserAuth} from "@/interfaces/auth/IUserAuth";
import {redirect, useRouter} from "next/navigation";
import {toast} from "@/components/ui/use-toast";


export type AuthProviderProps = {
    children: ReactNode,
    authType: "cookies" | "localStorage" | "sessionStorage",
    authName: string
    cookieDomain: string
}
export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({children, authType, authName, cookieDomain}: AuthProviderProps) => {
    const router = useRouter()

    const isAuth = async () => {
        const data = {
            user: null as IUserAuth | null,
            error: null as AxiosError | null
        }

        try {
            const res = await axios.get("/api/auth/userInfo")
            if (res.status === 200) {
                data.user = res.data
            }
        } catch (error: Error | any) {
            console.log("you are not authenticated")
            data.error = error.message
        }

        return data
    }

    const getUserInfo = async (): Promise<IUserAuth> => {
        let userInfo = {} as IUserAuth
        const data = await isAuth()

        if (data.error) return userInfo

        if (!data.error) {
            userInfo = data.user as IUserAuth
        }

        return userInfo
    }


    const logout = async () => {
        try {
            const res = await axios.get("/api/auth/logout")
            console.log(res.status)
            if (res.status === 200) {
                toast({
                    title: "Success",
                    description: "Logout successfully",
                    className: "bg-green-400",
                    variant: "default",
                    duration: 3000,
                })
                router.push("/")
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <AuthContext.Provider value={{
            getUserInfo,
            isAuth,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}
