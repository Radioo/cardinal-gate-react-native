import {FlatList, RefreshControl, View} from "react-native";
import {ReactElement} from "react";
import FullScreenLoader from "@/components/shared/FullScreenLoader";
import ErrorScreen from "@/components/shared/ErrorScreen";
import Pagination from "@/components/shared/Pagination";
import useUserRefresh from "@/hooks/useUserRefresh";

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

    if (isError) {
        return <ErrorScreen error={error ?? new Error('Unknown error')} onRetry={refetch}/>;
    }

    return (
        <View className="flex-1">
            {isPending ? <FullScreenLoader/> :
                <FlatList
                    data={plays}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh}/>}
                    renderItem={({item}) => (
                        <View className="m-[5px]">
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
