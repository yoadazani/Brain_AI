"use client"

import React from 'react';
import {UserAvatar} from "@/components/layout/UserAvatar";
import {useSession} from "next-auth/react";
import Loader from "@/components/app/Loader";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {AccountForm} from "@/components/pages/setting/account/AccountForm";
import {useQueryString} from "@/hooks/useQueryString";

const AccountCard = () => {
    const {createQueryString, getQueryString} = useQueryString();

    const handleEdit = () => {
        createQueryString("isEditable", "1");
    }

    return <Card className="w-[90%] md:w-[80%] xl:w-[60%] m-auto">
        <CardHeader>
            <CardTitle>
                Manage Your Account
            </CardTitle>
        </CardHeader>

        <CardContent>
            <AccountForm />
        </CardContent>

        <CardFooter>
            <Button
                onClick={handleEdit}
                disabled={getQueryString("isEditable") === "1"}
                className="bg-gradient-to-r from-pink-400 via-violet-400 to-blue-400"
            >Update Account</Button>
        </CardFooter>
    </Card>
}

export default AccountCard;