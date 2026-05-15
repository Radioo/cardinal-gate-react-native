import {FlatList, RefreshControl, useWindowDimensions, View} from "react-native";
import {ReactElement} from "react";
import FullScreenLoader from "@/components/shared/FullScreenLoader";
import ErrorScreen from "@/components/shared/ErrorScreen";
import Pagination from "@/components/shared/Pagination";
import usePullToRefresh from "@/hooks/usePullToRefresh";

const MIN_CARD_WIDTH = 380;

export function getNumColumns(width: number): number {
    return Math.max(1, Math.floor(width / MIN_CARD_WIDTH));
}

type PaginatedPlaysListBaseProps<T> = {
    plays: T[];
    pages: number;
    isPending: boolean;
    refetch: () => Promise<unknown>;
    page: number;
    onPageChange: (page: number) => void;
    renderItem: (item: T) => ReactElement;
};

type PaginatedPlaysListProps<T> = PaginatedPlaysListBaseProps<T> & (
    | {isError: true; error: Error}
    | {isError: false; error: null}
);

export default function PaginatedPlaysList<T>(props: PaginatedPlaysListProps<T>) {
    const {plays, pages, isPending, refetch, page, onPageChange, renderItem} = props;
    const {refreshing, handleRefresh} = usePullToRefresh(refetch);
    const {width} = useWindowDimensions();
    const numColumns = getNumColumns(width);

    if (props.isError) {
        return <ErrorScreen error={props.error} onRetry={refetch}/>;
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
