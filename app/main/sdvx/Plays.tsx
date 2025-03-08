import useSdvxPlays from "@/hooks/queries/useSdvxPlays";
import {useState} from "react";
import {RefreshControl, View} from "react-native";
import FullScreenLoader from "@/components/FullScreenLoader";
import {LegendList} from "@legendapp/list";
import Pagination from "@/components/Pagination";
import SdvxPlayRow from "@/components/SdvxPlayRow";
import {useUserRefresh} from "@/hooks/useUserRefresh";

export default function Plays() {
    const [page, setPage] = useState(1);
    const playsQuery = useSdvxPlays(page);
    const {refreshing, handleRefresh} = useUserRefresh(playsQuery.refetch);

    return (
        <View style={{flex: 1}}>
            {playsQuery.isPending ? <FullScreenLoader/> :
                <LegendList data={playsQuery.data?.plays ?? []}
                            estimatedItemSize={133}
                            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh}/>}
                            renderItem={({item}) => (
                                <View style={{margin: 5}}>
                                    <SdvxPlayRow play={item}/>
                                </View>
                            )}
                />

            }

            <Pagination currentPage={page}
                        totalPages={playsQuery.data?.pages ?? 1}
                        onPageChange={setPage}
                        isLoading={playsQuery.isPending}
            />
        </View>
    )
}
