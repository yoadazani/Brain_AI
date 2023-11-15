import {ReactNode, useEffect, useState} from 'react';
import {useAuth} from "@/context/auth/AuthProvider";
import {toast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";
import Loader from "@/components/app/Loader";

const ProtectedRoute = ({children}: { children: ReactNode }) => {
    const router = useRouter();
    const [success, setSuccess] = useState(false)
    const {isAuth} = useAuth()

    useEffect(() => {
        (async () => {
            const {error} = await isAuth()
            if (error) {
                router.push("/user/login")
                return toast({
                    title: "Error",
                    description: "You must be logged in to access this page",
                    variant: "destructive",
                    duration: 3000,
                })
            }
            setSuccess(true)
        })()
    }, [router])

    if (!success) {
        return <Loader height="h-48" width="w-48" content="Loading..."/>
    }

    return (
        <>{children}</>
    )

}

export default ProtectedRoute;