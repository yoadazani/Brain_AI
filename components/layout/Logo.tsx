import Image from "next/image";
import Link from "next/link"
import {cn} from "@/lib/utils";
import {logoProps} from "@/types/layout/logoProps";
const Logo = ({src, context, color}: logoProps) => {
    return (
       <div>
           <Link className="flex w-8/12 items-center pl-1 py-2 cursor-pointer" href="/">
               <Image src={src} height={25} width={68} alt="logo"/>
               <h2 className={cn("font-mono font-bold tracking-wider text-xl", color)}>{context}</h2>
           </Link>
       </div>
    )
}

export default Logo;