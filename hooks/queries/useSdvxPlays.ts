import useApiQuery from "@/hooks/queries/useApiQuery";
import {SdvxPlaysResponse} from "@/types/sdvx-plays-response";

// Backend uses query-param pagination here; see useIidxPlays for the path-param sibling.
// Client-facing hook shape is identical across games — this divergence is contained.
export default function useSdvxPlays(page: number) {
    return useApiQuery<SdvxPlaysResponse>(['sdvxPlays', page], `/api2/sdvx/plays?page=${page}`);
}
