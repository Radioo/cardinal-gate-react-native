import {ThemedText} from "@/components/ThemedText";
import useIidxProfile from "@/hooks/queries/useIidxProfile";
import FullScreenLoader from "@/components/FullScreenLoader";
import ErrorScreen from "@/components/ErrorScreen";
import {RefreshControl, ScrollView, View} from "react-native";
import ThemedCard from "@/components/ThemedCard";
import {useTheme} from "@/hooks/useTheme";
import AntDesign from "@expo/vector-icons/AntDesign";
import {useUserRefresh} from "@/hooks/useUserRefresh";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Profile() {
    const {data, isLoading, isError, refetch, error} = useIidxProfile();
    const theme = useTheme();
    const {refreshing, handleRefresh} = useUserRefresh(refetch);

    if (isLoading) {
        return <FullScreenLoader></FullScreenLoader>
    }

    if (isError) {
        return (
            <ErrorScreen error={error} onRetry={refetch}></ErrorScreen>
        )
    }

    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh}/>}
                    style={{
                        padding: 10,
                        flex: 1,
                    }}
        >
            <ThemedCard style={{flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 10}}>
                <AntDesign name="user" size={24} color={theme.text}/>
                <ThemedText style={{marginRight: 'auto'}}>DJ {data?.dj_name}</ThemedText>
                <ThemedText
                    style={{fontFamily: 'monospace'}}>{data?.iidx_id.toString().slice(0, 4)}-{data?.iidx_id.toString().slice(4, 8)}</ThemedText>
            </ThemedCard>
            <ThemedCard style={{flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 10}}>
                <MaterialIcons name="numbers" size={24} color={theme.text} />
                <ThemedText style={{marginRight: 'auto'}}>Play count</ThemedText>
                <View>
                    <ThemedText style={{textAlign: 'right'}}>{data?.sp_play_count.toLocaleString()} SP</ThemedText>
                    <ThemedText style={{textAlign: 'right'}}>{data?.dp_play_count.toLocaleString()} DP</ThemedText>
                </View>
            </ThemedCard>
            <ThemedCard style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                <AntDesign name="staro" size={24} color={theme.text} />
                <ThemedText style={{marginRight: 'auto'}}>Class</ThemedText>
                <View>
                    <ThemedText style={{textAlign: 'right'}}>SP {data?.sp_class}</ThemedText>
                    <ThemedText style={{textAlign: 'right'}}>DP {data?.dp_class}</ThemedText>
                </View>
            </ThemedCard>
        </ScrollView>
    )
}
