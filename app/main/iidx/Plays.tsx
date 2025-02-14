import {RefreshControl, ScrollView, View} from "react-native";
import useIidxPlays from "@/hooks/queries/useIidxPlays";
import {useUserRefresh} from "@/hooks/useUserRefresh";
import {useEffect, useRef, useState} from "react";
import FullScreenLoader from "@/components/FullScreenLoader";
import ErrorScreen from "@/components/ErrorScreen";
import {ThemedButton} from "@/components/ThemedButton";
import SetPageModal from "@/components/SetPageModal";
import IidxPlayRow from "@/components/IidxPlayRow";
import {useTheme} from "@/hooks/useTheme";
import {Entypo} from "@expo/vector-icons";

export default function Plays() {
    const [page, setPage] = useState(1);
    const {data, isPending, isError, refetch, error} = useIidxPlays(page);
    const {refreshing, handleRefresh} = useUserRefresh(refetch);
    const [modalVisible, setModalVisible] = useState(false);
    const scrollViewRef = useRef<ScrollView>(null);
    const currentPageLabel = `${page.toLocaleString()} / ${data?.pages.toLocaleString()}`;
    const theme = useTheme();

    useEffect(() => {
        if(scrollViewRef.current) {
            scrollViewRef.current.scrollTo({y: 0, animated: true});
        }
    }, [page]);

    const updatePage = (newPage: number) => {
        setPage(newPage < 1 ? 1 : newPage);
    }

    if(isPending) {
        return <FullScreenLoader/>
    }

    if(isError) {
        return <ErrorScreen error={error} onRetry={refetch}/>
    }

    return (
        <View style={{flex: 1}}>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh}/>}
                        style={{flex: 1}}
                        ref={scrollViewRef}
            >
                {data?.plays.map((play, index) => (
                    <IidxPlayRow play={play}
                                 key={play.id}
                    />
                ))}
            </ScrollView>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: theme.background,
                padding: 10,
            }}>
                <SetPageModal modalVisible={modalVisible}
                              onClose={page => {
                                  updatePage(page);
                                  setModalVisible(false);
                              }}
                              initialValue={page.toString()}
                              maxPage={data?.pages ?? 1}
                />
                <ThemedButton icon={<Entypo name="chevron-left" size={24} color={theme.background} />}
                              onPress={() => updatePage(page - 1)}
                              disabled={page === 1}
                              style={{width: 50}}
                />
                <ThemedButton label={currentPageLabel} onPress={() => setModalVisible(true)}/>
                <ThemedButton icon={<Entypo name="chevron-right" size={24} color={theme.background} />}
                              onPress={() => updatePage(page + 1)}
                              disabled={page === data?.pages}
                              style={{width: 50}}
                />
            </View>
        </View>
    )
}
