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
import {Drawer} from "expo-router/drawer";
import {Stack} from "expo-router";

export default function Home() {
    const [refreshing] = useState(false);
    const {data, loading, reload} = useUserData();
    const finishedLoading = !loading && data !== null && !refreshing;

    if(!finishedLoading) {
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
