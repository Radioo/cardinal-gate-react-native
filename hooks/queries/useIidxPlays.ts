import useApiQuery from "@/hooks/queries/useApiQuery";
import {IidxPlaysResponse} from "@/types/iidx-plays-response";

// Backend uses path-param pagination here; see useSdvxPlays for the query-param sibling.
// Client-facing hook shape is identical across games — this divergence is contained.
export default function useIidxPlays(page: number) {
    return useApiQuery<IidxPlaysResponse>(['iidxPlays', page], `/api2/iidx/plays/${page}`);
}
