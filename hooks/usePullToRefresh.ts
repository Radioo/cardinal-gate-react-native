import {useCallback, useState} from "react";
import {displayMessage} from "@/lib/notifications";
import {MessageSeverity} from "@/enums/message-severity";

export default function usePullToRefresh<T>(refetch: () => Promise<T>) {
    const [refreshing, setRefreshing] = useState(false);
    const handleRefresh = useCallback(() => {
        setRefreshing(true);
        refetch()
            .catch(error => {
                displayMessage(MessageSeverity.ERROR, error instanceof Error ? error.message : 'Refresh failed');
            })
            .finally(() => setRefreshing(false));
    }, [refetch]);
    return { refreshing, handleRefresh };
}
