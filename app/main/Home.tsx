import {useUserData} from "@/hooks/useUserData";
import FullScreenLoader from "@/components/FullScreenLoader";
import {Animated, RefreshControl} from "react-native";
import ScrollView = Animated.ScrollView;
import {useState} from "react";
import {PlayCounts} from "@/components/PlayCounts";

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
