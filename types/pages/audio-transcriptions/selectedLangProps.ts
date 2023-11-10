import {Dispatch, SetStateAction} from "react";

export type SelectLangProps = {
    lang: string
    setLang: Dispatch<SetStateAction<string>>
}
