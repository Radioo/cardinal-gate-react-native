import {Redirect} from "expo-router";
import {useUserData} from "@/hooks/useUserData";
import {useEffect, useState} from "react";
import FullScreenLoader from "@/components/FullScreenLoader";

export default function logout() {
    const [logoutLoading, setLogoutLoading] = useState(true);
    const {loading, clear} = useUserData();

    useEffect(() => {
        clear();
        setLogoutLoading(false);
    }, []);

    if(loading || logoutLoading) {
        return <FullScreenLoader></FullScreenLoader>;
    }

    return (
        <Redirect href={"/login"} />
    )
}
