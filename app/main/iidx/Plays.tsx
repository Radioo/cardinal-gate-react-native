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

export default function Plays() {
    const [page, setPage] = useState(1);
    const {data, isLoading, isError, refetch, error} = useIidxPlays(page);
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

    if(isLoading) {
        return <FullScreenLoader/>
    }

    if(isError) {
        return <ErrorScreen error={error} onRetry={refetch}/>
    }

    return (
        <View style={{flex: 1}}>
            <SetPageModal modalVisible={modalVisible}
                          onClose={page => {
                              setPage(page);
                              setModalVisible(false);
                          }}
                          initialValue={page.toString()}
                          maxPage={data?.pages ?? 1}
            />
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh}/>}
                        style={{flex: 1}}
                        ref={scrollViewRef}
            >
                {data?.plays.map((play, index) => (
                    <IidxPlayRow style={{marginBottom: (index === data?.plays.length - 1) ? 0 : 10}}
                                 play={play}
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
                <ThemedButton label={'<'}
                              onPress={() => setPage(page - 1)}
                              disabled={page === 1}
                              style={{width: 50}}
                />
                <ThemedButton label={currentPageLabel} onPress={() => setModalVisible(true)}/>
                <ThemedButton label={'>'}
                              onPress={() => setPage(page + 1)}
                              disabled={page === data?.pages}
                              style={{width: 50}}
                />
            </View>
        </View>
    )
}
