import {EditableInputProps} from "@/types/app/editableInputProps";


export type EditableImageInputProps = Omit<EditableInputProps, "value"> & {
    imageUrl: string
    imageFallbackName: string
}