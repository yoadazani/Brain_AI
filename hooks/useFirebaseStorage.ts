"use client";

import {getDownloadURL, ref, uploadBytesResumable} from "@firebase/storage";
import {storage} from "@/lib/firebase-config";
import {useState} from "react";
import {IUploadFileResponse} from "@/interfaces/IUploadFileResponse";

export const useFirebaseStorage = () => {
    const [response, setResponse] = useState<IUploadFileResponse>({} as IUploadFileResponse);
    const uploadFile = async (userId: string, file: File) => {
        try {
            const fileName = `${userId}-${file?.name}`;
            const storageRef = ref(storage, `files/images/${fileName}`);
            const uploadTask = await uploadBytesResumable(storageRef, file);

            const url = await getDownloadURL(uploadTask.ref)

            return {
                status: "success",
                message: "Your file has been uploaded.",
                fileUrl: url
            }

        } catch (error: Error | any) {
            return {
                status: "error",
                message: error.message,
                fileUrl: undefined
            }
        }
    }

    return {
        uploadFile
    }
}