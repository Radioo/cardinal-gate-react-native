import {useQuery} from "@tanstack/react-query";
import {fetchApi} from "@/services/api";
import {IidxPlay} from "@/types/iidx-play";
import {IidxPlaysResponse} from "@/types/iidx-plays-response";

type IidxPlaysWireResponse = Omit<IidxPlaysResponse, 'plays'> & {
    plays: Array<Omit<IidxPlay, 'title'> & {name: string}>;
};

// Backend uses path-param pagination here; see useSdvxPlays for the query-param sibling.
// Backend ships song labels under `name` for IIDX while SDVX uses `title`; normalise
// on `title` at this boundary so downstream consumers see one canonical field.
export default function useIidxPlays(page: number) {
    return useQuery<IidxPlaysResponse>({
        queryKey: ['iidxPlays', page],
        queryFn: async () => {
            const wire = await fetchApi<IidxPlaysWireResponse>(`/api2/iidx/plays/${page}`);
            return {
                pages: wire.pages,
                plays: wire.plays.map(({name, ...rest}) => ({...rest, title: name})),
            };
        },
        staleTime: Infinity,
    });
}
