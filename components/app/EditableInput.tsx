import React, {FC} from 'react';
import {MailOpen} from "lucide-react";
import {Input} from "@/components/ui/input";
import {useQueryString} from "@/hooks/useQueryString";
import {EditableInputProps} from "@/types/app/editableInputProps";


export const EditableInput: FC<EditableInputProps> = ({type, value, onChange, name, icon: Icon}) => {
    const {getQueryString} = useQueryString();
    const isEditable = getQueryString("isEditable") === "1";

    if (!isEditable) {
        return <div className="flex space-x-4">
            <div className="flex justify-center items-center bg-zinc-100 w-8 h-8 rounded-full">
                <Icon/>
            </div>
            <span>{value}</span>
        </div>
    }


    return <div className="flex items-center gap-x-2 border rounded-lg focus-within:shadow-md p-1 px-2">
        <Icon/>
        <Input
            type={type}
            name={name}
            defaultValue={value}
            className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
            onChange={onChange}
        />
    </div>
}