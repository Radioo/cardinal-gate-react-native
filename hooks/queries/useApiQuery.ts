import {useQuery, UseQueryOptions} from "@tanstack/react-query";
import {fetchApi} from "@/services/api";

export default function useApiQuery<T>(
    queryKey: unknown[],
    endpoint: string,
    options?: Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>,
) {
    return useQuery({
        queryKey,
        queryFn: () => fetchApi<T>(endpoint),
        staleTime: Infinity,
        ...options,
    });
}
