import {FlatList, RefreshControl, useWindowDimensions, View} from "react-native";
import {ReactElement} from "react";
import FullScreenLoader from "@/components/shared/FullScreenLoader";
import ErrorScreen from "@/components/shared/ErrorScreen";
import Pagination from "@/components/shared/Pagination";
import useUserRefresh from "@/hooks/useUserRefresh";

const MIN_CARD_WIDTH = 380;

export function computeNumColumns(width: number): number {
    return Math.max(1, Math.floor(width / MIN_CARD_WIDTH));
}

type PaginatedPlaysListProps<T> = {
    plays: T[];
    pages: number;
    isPending: boolean;
    isError: boolean;
    error: Error | null;
    refetch: () => Promise<unknown>;
    page: number;
    onPageChange: (page: number) => void;
    renderItem: (item: T) => ReactElement;
};

export default function PaginatedPlaysList<T>({
    plays, pages, isPending, isError, error, refetch, page, onPageChange, renderItem,
}: PaginatedPlaysListProps<T>) {
    const {refreshing, handleRefresh} = useUserRefresh(refetch);
    const {width} = useWindowDimensions();
    const numColumns = computeNumColumns(width);

    if (isError) {
        return <ErrorScreen error={error!} onRetry={refetch}/>;
    }

    return (
        <View className="flex-1">
            {isPending ? <FullScreenLoader/> :
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
                isLoading={isPending}
            />
        </View>
    );
}
