import {useQuery} from "@tanstack/react-query";
import fetchApi2 from "@/services/api2";
import {IidxPlaysResponse} from "@/types/iidx-plays-response";

export default function useIidxPlays(page: number) {
    let properPage = page;
    if(properPage < 1) {
        properPage = 1;
    }

    return useQuery({
        queryKey: ['iidxPlays', properPage],
        queryFn: () => fetchApi2<IidxPlaysResponse>(`/iidx/plays/${properPage}`),
        staleTime: Infinity,
    });
}
