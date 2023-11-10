import React, {ReactNode} from 'react';
import Logo from "@/components/layout/Logo";

import LogoImage from '@/assets/Brain.svg'

const AuthLayout = ({children}: { children: ReactNode }) => {
    return (
        <div className="flex flex-col h-screen w-full bg-gray-100">
            <Logo src={LogoImage} context="Brain" color="text-gray-600"/>
            <div className="mt-10 px-2 md:px-0">
                <div className="max-w-[600px] m-auto">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AuthLayout;