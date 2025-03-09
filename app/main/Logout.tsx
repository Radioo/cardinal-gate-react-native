import {router} from "expo-router";
import {useUserData} from "@/hooks/useUserData";
import {useEffect, useState} from "react";
import FullScreenLoader from "@/components/FullScreenLoader";
import {useQueryClient} from "@tanstack/react-query";

export default function Logout() {
    const queryClient = useQueryClient();
    const [loading, setLoading] = useState(true);
    const {clear} = useUserData();

    queryClient.removeQueries();

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
