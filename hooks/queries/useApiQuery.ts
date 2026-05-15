import {useQuery, UseQueryOptions} from "@tanstack/react-query";
import {fetchApi} from "@/services/api";

/**
 * Per-resource query hooks (useGdProfile, useIidxProfile, useSummary, ...) are
 * thin wrappers around useApiQuery. The indirection is intentional: each hook
 * owns its queryKey naming so call sites read as `useUserData()` rather than
 * `useApiQuery(['userData'], '/api2/me')`, and the type parameter T is fixed
 * at the hook boundary so consumers don't pass it themselves.
 *
 * Note: `select`-based narrowing is not threaded through this wrapper because
 * no per-resource hook needs it today. If a caller wants to refine the returned
 * data shape, drop down to React Query's `useQuery` directly.
 */
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
