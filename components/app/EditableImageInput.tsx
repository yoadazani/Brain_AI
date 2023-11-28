import React, {FC} from 'react';
import {Label} from "@/components/ui/label";
import {Camera} from "lucide-react";
import {Input} from "@/components/ui/input";
import {UserAvatar} from "@/components/layout/UserAvatar";
import {useQueryString} from "@/hooks/useQueryString";
import {EditableImageInputProps} from "@/types/app/editableImageInputProps";


export const EditableImageInput: FC<EditableImageInputProps> = ({imageUrl, imageFallbackName, onChange, name, type, icon: Icon}) => {

    const {getQueryString} = useQueryString();
    const [defaultUserPicture, setDefaultUserPicture] = React.useState<string>()
    const isEditable = getQueryString("isEditable") === "1";

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e);
        if (e.target.files) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setDefaultUserPicture(reader.result as string);
            }
        }
    }

    return <div className="relative">
        {isEditable &&
            <div
                className="absolute bottom-0 -left-1 flex justify-center items-center z-10 bg-zinc-100 w-8 h-8 rounded-full">
                <Label htmlFor="picture">
                    <Icon/>
                </Label>
                <Input
                    id="picture"
                    className="hidden"
                    type={type}
                    name={name}
                    onChange={handleImageChange}
                />
            </div>
        }
        <UserAvatar
            userName={imageFallbackName}
            userImage={defaultUserPicture ? defaultUserPicture : imageUrl}
            height="h-20"
            width="w-20"
        />
    </div>
}