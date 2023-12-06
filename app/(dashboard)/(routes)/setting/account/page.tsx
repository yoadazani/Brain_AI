"use client"

import React, {useState} from "react";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {AccountForm} from "@/components/pages/setting/account/AccountForm";
import {Button} from "@/components/ui/button";
import {useQueryString} from "@/hooks/useQueryString";
import {ButtonLoader} from "@/components/app/ButtonLoader";
import {sleep} from "@/utils/sleep";
import {useRouter} from "next/navigation";

const Account = () => {
    const router = useRouter();

    const {createQueryString, getQueryString} = useQueryString();
    const [loading, setLoading] = useState(false);

    const handleEdit = async () => {
        setLoading(true);
        await sleep(3000)
        createQueryString("isEditable", "1");
        setLoading(false);
    }

    return (
        <Card className="w-[90%] md:w-[80%] xl:w-[60%] m-auto">
            <CardHeader>
                <CardTitle>
                    Manage Your Account
                </CardTitle>
            </CardHeader>

            <CardContent>
                <AccountForm/>
            </CardContent>

            <CardFooter>
                <Button
                    onClick={handleEdit}
                    disabled={getQueryString("isEditable") === "1"}
                    variant="premium"
                    className="min-w-[150px]"
                >
                    {
                        loading
                            ? <ButtonLoader/>
                            : "Update Account"
                    }
                </Button>
            </CardFooter>
        </Card>
    )
}

export default Account;