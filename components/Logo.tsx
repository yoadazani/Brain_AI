import Image from "next/image";
import LogoImage from '../assets/Brain.svg'
import Link from "next/link"
import {cn} from "@/lib/utils";
const Logo = ({color}: {color: string}) => {
    return (
        <Link className="flex items-center pl-1 py-2 cursor-pointer" href="/">
            <Image src={LogoImage} height={25} width={68} alt="logo"/>
            <h2 className={cn("font-mono font-bold tracking-wider text-xl", color)}>Brain</h2>
        </Link>
    )
}

export default Logo;