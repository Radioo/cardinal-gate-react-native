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
import IidxClearTypeItem from "@/components/IidxClearTypeItem";
import {IidxClearType} from "@/enums/iidx-clear-type";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {Image} from "expo-image";
import {StyleSheet} from "react-native";

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
            <ThemedCard style={{flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 10}}>
                <AntDesign name="staro" size={24} color={theme.text} />
                <ThemedText style={{marginRight: 'auto'}}>Class</ThemedText>
                <View>
                    <ThemedText style={{textAlign: 'right'}}>SP {data?.sp_class}</ThemedText>
                    <ThemedText style={{textAlign: 'right'}}>DP {data?.dp_class}</ThemedText>
                </View>
            </ThemedCard>
            <ThemedCard style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                <MaterialCommunityIcons name="gesture-tap-button" size={24} color={theme.text} />
                <ThemedText style={{marginRight: 'auto'}}>Inputs</ThemedText>
                <View>
                    <ThemedText style={{textAlign: 'right'}}>{data?.key_count.toLocaleString()} Keys</ThemedText>
                    <ThemedText style={{textAlign: 'right'}}>{data?.scratch_count.toLocaleString()} Scratches</ThemedText>
                </View>
            </ThemedCard>

            {/*<View style={{marginTop: 10, gap: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>*/}
            {/*    <IidxClearTypeItem clearType={IidxClearType.NO_PLAY} />*/}
            {/*    <IidxClearTypeItem clearType={IidxClearType.FAILED} />*/}
            {/*    <IidxClearTypeItem clearType={IidxClearType.ASSIST_CLEAR} />*/}
            {/*    <IidxClearTypeItem clearType={IidxClearType.EASY_CLEAR} />*/}
            {/*    <IidxClearTypeItem clearType={IidxClearType.CLEAR} />*/}
            {/*    <IidxClearTypeItem clearType={IidxClearType.HARD_CLEAR} />*/}
            {/*    <IidxClearTypeItem clearType={IidxClearType.EX_HARD_CLEAR} />*/}
            {/*    <IidxClearTypeItem clearType={IidxClearType.FULL_COMBO} />*/}
            {/*</View>*/}

            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source="https://i.kym-cdn.com/entries/icons/original/000/027/475/Screen_Shot_2018-10-25_at_11.02.15_AM.png"
                    contentFit="cover"
                    transition={1000}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 200,
        height: 200,
        backgroundColor: '#0553',
    },
});
