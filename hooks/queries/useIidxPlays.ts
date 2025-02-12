import {useQuery} from "@tanstack/react-query";
import fetchApi2 from "@/services/api2";
import {IidxPlaysResponse} from "@/types/iidx-plays-response";

export default function useIidxPlays(page: number) {
    return useQuery({
        queryKey: ['iidxPlays', page],
        queryFn: () => fetchApi2<IidxPlaysResponse>(`/iidx/plays/${page}`),
        staleTime: Infinity,
    });
}
