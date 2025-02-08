import {Redirect} from "expo-router";
import {useUserData} from "@/hooks/useUserData";
import {useEffect} from "react";
import FullScreenLoader from "@/components/FullScreenLoader";

export default function logout() {
    const {loading, clear} = useUserData();

    useEffect(() => {
        clear();
    }, []);

    if(loading) {
        return <FullScreenLoader></FullScreenLoader>;
    }

    return (
        <Redirect href={"/login"} />
    )
}
