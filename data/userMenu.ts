import {Settings, LogOut, TrendingUp} from "lucide-react";

const menuData = [
    {
        label: "manage-account",
        value: "Manage Account",
        icon: Settings,
        link: "/setting/account"
    },
    {
        label: "upgrade-plan",
        value: "Upgrade Plan",
        icon: TrendingUp,
        link: "/setting/plans"
    },
    {
        label: "sign-out",
        value: "Sign Out",
        icon: LogOut,
        link: "/"
    }
]

export default menuData