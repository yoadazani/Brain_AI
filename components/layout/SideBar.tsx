"use client";

import LogoImage from '@/assets/Brain.svg'

import Logo from "./Logo";
import {cn} from "@/lib/utils";
import {sideBarLinks} from "@/data/sideBarLinks";
import {usePathname, useRouter} from "next/navigation";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {LimitCounter} from "@/components/app/LimitCounter";
import {IsPro} from "@/components/app/IsPro";

const SideBar = ({userApiLimit, isPro}: {userApiLimit: number, isPro: boolean}) => {
    const pathname = usePathname()
    const router = useRouter()


    return (
        <div className="flex flex-col justify-between h-full relative bg-gray-900">
            <div>
                <Logo src={LogoImage} context="Brain" color="text-white"/>

                <div className="flex flex-col mt-6">
                    {sideBarLinks.map((link) => {
                        return <div key={link.name}>

                            {!link.subLinks &&
                                <div
                                    onClick={() => router.push(link.href)}
                                    className={cn("flex flex-row items-center py-2 pl-6 space-x-4 rounded-md hover:bg-gray-800 cursor-pointer w-full", {
                                        "bg-gray-800": pathname === link.href
                                    })}
                                >
                                    <link.icon className={cn("text-2xl", link.color)}/>
                                    <span className="text-gray-100">{link.name}</span>
                                </div>
                            }

                            {
                                link.subLinks && <Accordion type="single" collapsible>
                                    <AccordionItem value="settings" className="border-0">
                                        <AccordionTrigger
                                            className={cn("py-2 pl-6 pr-2 rounded-md hover:bg-gray-800 cursor-pointer hover:!underline", {
                                                "bg-gray-800": pathname === link.href
                                            })}>
                                            <div className="flex flex-row items-center space-x-4">
                                                <link.icon className={cn("text-2xl", (
                                                    link.color
                                                ))}/>
                                                <span className="text-gray-100">{link.name}</span>
                                            </div>
                                        </AccordionTrigger>

                                        {/*sub links items*/}

                                        {link.subLinks.map((subLink) => {
                                            return <AccordionContent
                                                key={subLink.name}
                                                onClick={() => router.push(subLink.href)}
                                                className={cn("flex items-center py-2 pl-10 space-x-4 rounded-md hover:bg-gray-800 cursor-pointer", {
                                                    "bg-gray-800": pathname === subLink.href
                                                })}
                                            >
                                                <subLink.icon className={cn("text-2xl", (
                                                    subLink.color
                                                ))}/>
                                                <span className="text-gray-100 text-sm">{subLink.name}</span>
                                            </AccordionContent>
                                        })}

                                    </AccordionItem>
                                </Accordion>
                            }
                        </div>
                    })}
                </div>
            </div>
            {
                isPro
                ? <IsPro />
                :<LimitCounter apiLimitCount={userApiLimit}/>
            }
        </div>
    )
}

export default SideBar;