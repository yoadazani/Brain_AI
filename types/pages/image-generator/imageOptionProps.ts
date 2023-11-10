import {IUserData} from "@/interfaces/IUserData";
import {Dispatch, SetStateAction} from "react";

export type ImageOptionProps = {
    userMessage: IUserData
    setUserMessage: Dispatch<SetStateAction<IUserData>>
}
