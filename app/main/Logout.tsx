import {router} from "expo-router";
import {useUserData} from "@/hooks/useUserData";
import {useEffect, useState} from "react";
import FullScreenLoader from "@/components/FullScreenLoader";

export default function Logout() {
    const [loading, setLoading] = useState(true);
    const {clear} = useUserData();

    console.log('loading', loading);

    useEffect(() => {
        clear().then(() => setLoading(false));
    }, [clear]);

    useEffect(() => {
        if (!loading) {
            router.replace("/login");
        }
    }, [loading]);

    return (
        <FullScreenLoader/>
    )
}
