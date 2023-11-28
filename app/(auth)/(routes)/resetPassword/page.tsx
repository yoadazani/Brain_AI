"use client"

import {useState} from "react";
import {OtpVerification} from "@/components/pages/auth/resetPassword/OtpVerification";
import {VerifyEmail} from "@/components/pages/auth/resetPassword/VerifyEmail";
import {ResetPassForm} from "@/components/pages/auth/resetPassword/ResetPassForm";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {useQueryString} from "@/hooks/useQueryString";


const ResetPassword = () => {
    const router = useRouter()
    const {getQueryString, searchParams} = useQueryString()

    const isVerified = getQueryString("isVerified") === "1"
    const confirmed = getQueryString("emailConfirmed") === "1"

    const [userEmail, setUserEmail] = useState(getQueryString("email") || "")

    return (
        <Card>
            <CardHeader>
                <CardTitle>Reset your password here</CardTitle>
            </CardHeader>
            <CardContent>
                {!confirmed && <VerifyEmail setUserEmail={setUserEmail}/>}
                {confirmed && !isVerified && <OtpVerification userEmail={userEmail}/>}

                {isVerified && <ResetPassForm/>}
            </CardContent>
            <CardFooter>
                <Button variant="outline" onClick={() => router.push("/login")} className="w-full">
                    Cancel
                </Button>
            </CardFooter>
        </Card>
    )
}

export default ResetPassword