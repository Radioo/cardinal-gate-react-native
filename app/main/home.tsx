import {ThemedText} from "@/components/ThemedText";
import {getSecureValue} from "@/store/secure";
import {SecureValue} from "@/enums/secure-value";
import {useUserData} from "@/hooks/useUserData";
import FullScreenLoader from "@/components/FullScreenLoader";
import {Animated, RefreshControl} from "react-native";
import ScrollView = Animated.ScrollView;
import {useEffect, useState} from "react";
import fetchApi from "@/services/api";
import {PlayCounts} from "@/components/PlayCounts";

export default function () {
    const [refreshing] = useState(false);
    const {data, loading, reload} = useUserData();

    useEffect(() => {
        fetchApi('/summary').then(data => {
            console.log('summary', data);
        })
    }, []);

    if(loading || refreshing) {
        return <FullScreenLoader></FullScreenLoader>;
    }

    return (
        <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={reload}></RefreshControl>
        }>
            <PlayCounts></PlayCounts>
        </ScrollView>
    )
}
