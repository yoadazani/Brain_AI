import React, {Dispatch, SetStateAction} from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {HiLanguage} from "react-icons/hi2";

type SelectLangProps = {
    lang: string
    setLang: Dispatch<SetStateAction<string>>
}

const supportedLanguages = [
    {
        lang: 'en',
        label: 'English'
    },
    {
        lang: 'he',
        label: 'Hebrew'
    },
    {
        lang: 'fr',
        label: 'French'
    },
    {
        lang: 'es',
        label: 'Spanish'
    }
]
export const SelectLang = ({lang, setLang}: SelectLangProps) => {

    const handleLangChange = (newLanguage: string) => {
        if (lang === newLanguage) return
        setLang(newLanguage)
    }

    return <DropdownMenu>
        <DropdownMenuTrigger className="text-xl cursor-pointer active:text-muted-foreground hover:text-muted-foreground">
            <HiLanguage className="border-0 outline-none active:focus-visible:ring-0, active:focus-visible:ring-transparent"/>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>Select Language</DropdownMenuLabel>
            <DropdownMenuSeparator/>
            {supportedLanguages.map(lang => (
                <DropdownMenuItem
                    key={lang.lang}
                    onClick={() => handleLangChange(lang.lang)}
                >
                    {lang.label}
                </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
    </DropdownMenu>
}