import useApiQuery from "@/hooks/queries/useApiQuery";
import {IidxPlaysResponse} from "@/types/iidx-plays-response";

// Backend uses path-param pagination (unlike SDVX which uses query params).
export default function useIidxPlays(page: number) {
    return useApiQuery<IidxPlaysResponse>(['iidxPlays', page], `/api2/iidx/plays/${page}`);
}
