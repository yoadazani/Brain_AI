import MobileSideBar from "@/components/layout/MobileSideBar";

const NavBar = () => {
    return <div className="flex justify-between md:justify-end items-center p-2">
        <MobileSideBar/>
        <div className="flex items-center justify-center rounded-full bg-gray-800 p-1.5 w-8 cursor-pointer">
            <span className="text-gray-100 font-semibold text-sm">YA</span>
        </div>
    </div>;
}

export default NavBar;