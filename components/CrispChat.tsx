"use client"

import {useEffect} from 'react';


import { Crisp } from "crisp-sdk-web"
const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("221301cd-3766-4ba4-84ca-4b2a111952d2")
    }, []);

    return null
}

export default CrispChat;