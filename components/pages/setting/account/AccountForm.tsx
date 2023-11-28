import React from 'react';
import {useSession} from "next-auth/react";
import Loader from "@/components/app/Loader";
import {useQueryString} from "@/hooks/useQueryString";
import {Button} from "@/components/ui/button";
import {accountSchema} from "@/constants/pages/setting/accountConstant";
import {EditableInput} from "@/components/app/EditableInput";
import {EditableImageInput} from "@/components/app/EditableImageInput";
import * as z from "zod";
import {toast} from "@/components/ui/use-toast";
import {useFirebaseStorage} from "@/hooks/useFirebaseStorage";
import {updateUser} from "@/services/actions/userActions/updateUser";
import {Camera, MailOpen, User} from "lucide-react";

export const AccountForm = () => {

    const {uploadFile} = useFirebaseStorage();
    const {deleteQueryString, getQueryString, checkIfQueryStringExists} = useQueryString();
    const {data: session, status, update} = useSession();

    const isEditable = getQueryString("isEditable") === "1";
    const [userData, setUserData] = React.useState<z.infer<typeof accountSchema>>();


    const handleSave = async () => {
        if (!accountSchema.safeParse(userData).success) {
            return toast({
                title: "Info",
                description: "You need to provide the information to update your account.",
                variant: "default",
                className: "bg-sky-400",
                duration: 3000
            })
        }
        if (userData?.picture) {
            const firebaseResponse = await uploadFile(session?.user?.id!, userData?.picture as File);
            if (firebaseResponse.status === "error") {
                return toast({
                    title: "Error",
                    description: "There was an error uploading your picture. Please try again.",
                    variant: "destructive",
                    duration: 3000
                })
            }
            // assign new user data without picture key because updateUser doesn't accept it
            const newUserData = {
                ...userData,
                image: firebaseResponse.fileUrl
            }
            delete newUserData.picture

            const res = await updateUser(session?.user?.id!, newUserData);
            if (res.status === "success") {
                await update({...userData, picture: firebaseResponse.fileUrl});
            }
        } else {
            const res = await updateUser(session?.user?.id!, userData);
            if (res.status === "success") {
                await update(userData);
            }
        }

        setUserData(undefined)
        deleteQueryString("isEditable");
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.type === "file" ? e.target.files![0] : e.target.value
        })
    }

    const handleCancel = () => {
        setUserData(undefined)
        deleteQueryString("isEditable");
    }

    if (status === "loading") return <Loader height="h-10" width="w-10"/>;

    if (!session) return null;

    return <div className="space-y-5">
        <EditableImageInput
            type="file"
            name="picture"
            icon={Camera}
            imageUrl={session?.user?.image!}
            imageFallbackName={session?.user?.name!}
            onChange={handleChange}
        />

        <EditableInput
            type="text"
            name="name"
            icon={User}
            value={session?.user?.name!}
            onChange={handleChange}
        />

        <EditableInput
            type="text"
            name="email"
            icon={MailOpen}
            value={session?.user?.email!}
            onChange={handleChange}
        />


        {
            isEditable && <div className="flex space-x-4 justify-end">
                <Button
                    variant="outline"
                    className="bg-gradient-to-r from-pink-400 via-violet-400 to-blue-400 text-zinc-100"
                    onClick={handleSave}
                >
                    Save Changes
                </Button>
                <Button
                    onClick={handleCancel}
                    variant="outline"
                    disabled={!checkIfQueryStringExists("isEditable")}
                >Cancel</Button>
            </div>
        }
    </div>
}