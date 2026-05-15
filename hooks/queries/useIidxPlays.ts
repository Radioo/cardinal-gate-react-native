import {useQuery} from "@tanstack/react-query";
import {fetchApi} from "@/services/api";
import {IidxPlay} from "@/types/iidx-play";
import {IidxPlaysResponse} from "@/types/iidx-plays-response";

type IidxPlaysWireResponse = Omit<IidxPlaysResponse, 'plays'> & {
    plays: Array<Omit<IidxPlay, 'title' | 'recordedAt'> & {name: string; dts: string}>;
};

// Backend uses path-param pagination here; see useSdvxPlays for the query-param sibling.
// Backend ships `name` and `dts` for IIDX; normalize on `title` and `recordedAt` at
// this boundary so downstream consumers see canonical fields.
export default function useIidxPlays(page: number) {
    return useQuery<IidxPlaysResponse>({
        queryKey: ['iidxPlays', page],
        queryFn: async () => {
            const wire = await fetchApi<IidxPlaysWireResponse>(`/api2/iidx/plays/${page}`);
            return {
                pages: wire.pages,
                plays: wire.plays.map(({name, dts, ...rest}) => ({...rest, title: name, recordedAt: dts})),
            };
        },
        staleTime: Infinity,
    });
}
