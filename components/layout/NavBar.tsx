import MobileSideBar from "@/components/layout/MobileSideBar";
import {UserMenu} from "@/components/layout/UserMenu";

const NavBar = () => {
    return <div className="flex justify-between md:justify-end items-center p-2">
        <MobileSideBar/>
        <UserMenu />
    </div>;
}

export default NavBar;