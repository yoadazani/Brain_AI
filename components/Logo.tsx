import Image from "next/image";
import LogoImage from '../assets/Brain.svg'
import Link from "next/link"
const Logo = () => {
    return (
        <Link className="flex items-center pl-1 py-4 cursor-pointer" href="/">
            <Image src={LogoImage} height={25} width={68} alt="logo"/>
            <h2 className="font-mono font-bold tracking-wider text-white text-xl">Brain</h2>
        </Link>
    )
}

export default Logo;