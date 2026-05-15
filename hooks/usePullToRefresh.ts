import {useCallback, useState} from "react";

export default function usePullToRefresh<T>(refetch: () => Promise<T>) {
    const [refreshing, setRefreshing] = useState(false);
    const handleRefresh = useCallback(() => {
        setRefreshing(true);
        refetch().finally(() => setRefreshing(false));
    }, [refetch]);
    return { refreshing, handleRefresh };
}
