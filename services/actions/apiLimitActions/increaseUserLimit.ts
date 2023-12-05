"use server"

import {getUserLimit} from "@/services/actions/apiLimitActions/getUserLimit";
import {updateUserLimit} from "@/services/actions/apiLimitActions/updateUserLimit";
import {createUserLimit} from "@/services/actions/apiLimitActions/createUserLimit";

export const increaseUserLimit = async () => {
    const userApiLimit = await getUserLimit()
    const count = userApiLimit + 1

    if (!userApiLimit) {
        await createUserLimit(1);
    } else {
        await updateUserLimit(count);
    }
}