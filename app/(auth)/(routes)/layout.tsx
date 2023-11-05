import React, {ReactNode} from 'react';
import Logo from "@/components/Logo";

const AuthLayout = ({children}: { children: ReactNode }) => {
    return (
        <div className="flex flex-col h-screen w-full bg-gray-100">
            <Logo color="text-gray-600"/>
            <div className="mt-20 px-2 md:px-0">
                <div className="max-w-[600px] m-auto">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AuthLayout;