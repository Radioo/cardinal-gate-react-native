import {useQuery} from "@tanstack/react-query";
import fetchApi2 from "@/services/api2";
import {SdvxPlaysResponse} from "@/types/sdvx-plays-response";

export default function useSdvxPlays(page: number) {
    let properPage = page < 1 ? 1 : page;

    return useQuery({
        queryKey: ['sdvxPlays', properPage],
        queryFn: () => {
            const query = new URLSearchParams();
            query.append('page', properPage.toString());

            return fetchApi2<SdvxPlaysResponse>(`/api2/sdvx/plays?${query.toString()}`);
        },
        staleTime: Infinity,
    })
}
