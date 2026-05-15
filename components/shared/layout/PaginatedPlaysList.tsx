import {FlatList, RefreshControl, useWindowDimensions, View} from "react-native";
import {ReactElement} from "react";
import {UseQueryResult} from "@tanstack/react-query";
import FullScreenLoader from "@/components/shared/feedback/FullScreenLoader";
import ErrorScreen from "@/components/shared/feedback/ErrorScreen";
import Pagination from "@/components/shared/Pagination";
import usePullToRefresh from "@/hooks/usePullToRefresh";

const MIN_CARD_WIDTH = 380;

export function getNumColumns(width: number): number {
    return Math.max(1, Math.floor(width / MIN_CARD_WIDTH));
}

type PaginatedPlaysListProps<T> = {
    query: UseQueryResult<{plays: T[]; pages: number}>;
    page: number;
    onPageChange: (page: number) => void;
    renderItem: (item: T) => ReactElement;
};

export default function PaginatedPlaysList<T>({query, page, onPageChange, renderItem}: PaginatedPlaysListProps<T>) {
    const {refreshing, handleRefresh} = usePullToRefresh(query.refetch);
    const {width} = useWindowDimensions();
    const numColumns = getNumColumns(width);

    if (query.isError) {
        return <ErrorScreen error={query.error} onRetry={query.refetch}/>;
    }

    const plays = query.data?.plays ?? [];
    const pages = query.data?.pages ?? 1;

    return (
        <View className="flex-1">
            {query.isPending ? <FullScreenLoader/> :
                <FlatList
                    key={numColumns}
                    data={plays}
                    numColumns={numColumns}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh}/>}
                    renderItem={({item}) => (
                        <View style={{flex: 1 / numColumns, padding: 5}}>
                            {renderItem(item)}
                        </View>
                    )}
                />
            }
            <Pagination
                currentPage={page}
                totalPages={pages}
                onPageChange={onPageChange}
                isLoading={query.isPending}
            />
        </View>
    );
}
