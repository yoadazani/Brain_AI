"use client"

import {useAuth} from "@/context/auth/AuthProvider";
import {useEffect, useState} from "react";
import {IUserAuth} from "@/interfaces/auth/IUserAuth";
const Setting = () => {

    const [user, setUser] = useState({} as IUserAuth)
    const {getUserInfo} = useAuth()

    useEffect(() => {
        getUserInfo().then(res => {
            setUser(res)
        })
    }, []);

    return (
        <>
            <h1>{user?.id}</h1>
            <h1>{user?.name}</h1>
        </>
    )
}

export default Setting;