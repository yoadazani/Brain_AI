import MobileSideBar from "@/components/layout/MobileSideBar";
import {UserMenu} from "@/components/layout/UserMenu";
import {getUserLimit} from "@/services/actions/apiLimitActions/getUserLimit";
import {checkUserSubscription} from "@/services/actions/userSubscription/checkUserSubscription";

const NavBar = async () => {
    const userApiLimit = await getUserLimit()
    const isPro = await checkUserSubscription()
    return <div className="flex justify-between md:justify-end items-center p-2">
        <MobileSideBar userApiLimit={userApiLimit} isPro={isPro}/>
        <UserMenu />
    </div>;
}

export default NavBar;