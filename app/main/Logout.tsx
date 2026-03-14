import {router} from "expo-router";
import {clearSession} from "@/services/auth";
import {useEffect} from "react";
import FullScreenLoader from "@/components/shared/FullScreenLoader";

export default function Logout() {
    useEffect(() => {
        clearSession()
            .then(() => router.replace("/login"))
            .catch(() => router.replace("/login"));
    }, []);

    return (
        <FullScreenLoader/>
    )
}
