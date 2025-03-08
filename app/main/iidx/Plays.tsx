import { RefreshControl, ScrollView, View } from "react-native";
import useIidxPlays from "@/hooks/queries/useIidxPlays";
import { useUserRefresh } from "@/hooks/useUserRefresh";
import { useEffect, useRef, useState } from "react";
import FullScreenLoader from "@/components/FullScreenLoader";
import ErrorScreen from "@/components/ErrorScreen";
import IidxPlayList from "@/components/IidxPlayList";
import Pagination from "@/components/Pagination";

export default function Plays() {
    const [page, setPage] = useState(1);
    const { data, isPending, isError, refetch, error } = useIidxPlays(page);
    const { refreshing, handleRefresh } = useUserRefresh(refetch);
    const scrollViewRef = useRef<ScrollView>(null);

    useEffect(() => {
        if(scrollViewRef.current) {
            scrollViewRef.current.scrollTo({y: 0, animated: true});
        }
    }, [page]);

    if(isError) {
        return <ErrorScreen error={error} onRetry={refetch}/>
    }

    return (
        <View style={{flex: 1}}>
            {isPending ? <FullScreenLoader/> :
                <IidxPlayList
                    plays={data?.plays}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh}/>}
                />
            }
            <Pagination
                currentPage={page}
                totalPages={data?.pages ?? 1}
                onPageChange={setPage}
                isLoading={isPending}
            />
        </View>
    );
}
