import {ReactNode} from "react";

import SideBar from "@/components/layout/SideBar";
import NavBar from "@/components/layout/NavBar";
import {getUserLimit} from "@/services/actions/apiLimitActions/getUserLimit";
import {checkUserSubscription} from "@/services/actions/userSubscription/checkUserSubscription";


const DashboardLayout = async ({children}: { children: ReactNode }) => {
    const userApiLimit = await getUserLimit()
    const isPro = await checkUserSubscription()
    return (
        <div className="flex gap-3 md:gap-0 md:flex-row h-screen overflow-hidden">
            <div className="hidden h-full md:flex md:flex-col md:w-72 z-50">
                <SideBar userApiLimit={userApiLimit} isPro={isPro}/>
            </div>
            <main className="flex flex-col w-full h-screen max-h-screen">
                <NavBar/>
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout;