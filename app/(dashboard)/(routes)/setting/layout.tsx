import React, {ReactNode} from 'react';
const Layout = ({children}: {children: ReactNode}) => {
    return <div className="space-y-4">
        <div className="flex flex-col justify-center items-center text-center space-y-4 lg:space-y-1 pt-1 mb-3 lg:mb-3">
            <h1 className="text-2xl font-bold tracking-wider"> Manage Your Account </h1>
            <span className="text-zinc-500 tracking-wider text-sm"> make changes to your account here. you can`t change your password here. </span>
        </div>
        <main className="px-4 md:px-8 lg:px-16">
            {children}
        </main>
    </div>
}

export default Layout;