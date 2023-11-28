import React, {ReactNode} from "react";
import {LucideIcon} from "lucide-react";
import {IconType} from "react-icons";

export type EditableInputProps = {
    type: string
    name: string
    value: string
    icon: LucideIcon | IconType
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
