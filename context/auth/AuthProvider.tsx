"use client"

import {createContext, useContext} from "react";
import {IAuthContext} from "@/interfaces/auth/IAuthContext";

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({children}: any) => {

    const user = {
        name: "user",
        email: "user",
        password: "user",
        token: "user"
    }

    return (
        <AuthContext.Provider value={{
            user
        }}>
            {children}
        </AuthContext.Provider>
    )
}
