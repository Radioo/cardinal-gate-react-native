import {ThemedText} from "@/components/ThemedText";
import {getSecureValue} from "@/store/secure";
import {SecureValue} from "@/enums/secure-value";
import {useUserData} from "@/hooks/useUserData";
import FullScreenLoader from "@/components/FullScreenLoader";
import {Animated, RefreshControl} from "react-native";
import ScrollView = Animated.ScrollView;
import {useState} from "react";

export default function () {
    const [refreshing] = useState(false);
    const {data, loading, reload} = useUserData();

    if(loading || refreshing) {
        return <FullScreenLoader></FullScreenLoader>;
    }

    return (
        <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={reload}></RefreshControl>
        }>
            <ThemedText>Hello {data?.username}, do you like SLAKE? And I'm warning you this is a trick question.</ThemedText>
        </ScrollView>
    )
}
