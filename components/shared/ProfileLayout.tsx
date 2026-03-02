import {ReactElement} from "react";
import {RefreshControl, ScrollView} from "react-native";
import {UseQueryResult} from "@tanstack/react-query";
import FullScreenLoader from "@/components/shared/FullScreenLoader";
import ErrorScreen from "@/components/shared/ErrorScreen";
import useUserRefresh from "@/hooks/useUserRefresh";

type ProfileLayoutProps<T> = {
    query: UseQueryResult<T>;
    children: (data: T) => ReactElement;
}

export default function ProfileLayout<T>({query, children}: ProfileLayoutProps<T>) {
    const {refreshing, handleRefresh} = useUserRefresh(query.refetch);

    if (query.isPending) return <FullScreenLoader/>;
    if (query.isError) return <ErrorScreen error={query.error} onRetry={query.refetch}/>;

    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh}/>}>
            {children(query.data)}
        </ScrollView>
    );
}
