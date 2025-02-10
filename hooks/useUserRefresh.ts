import {useCallback, useState} from "react";

export function useUserRefresh<T>(refetch: () => Promise<T>) {
    const [refreshing, setRefreshing] = useState(false);
    const handleRefresh = useCallback(() => {
        setRefreshing(true);
        refetch().then(() => setRefreshing(false));
    }, [refetch]);
    return { refreshing, handleRefresh };
}
