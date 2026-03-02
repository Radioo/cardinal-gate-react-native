import useApiQuery from "@/hooks/queries/useApiQuery";
import {IidxPlaysResponse} from "@/types/iidx-plays-response";

export default function useIidxPlays(page: number) {
    return useApiQuery<IidxPlaysResponse>(['iidxPlays', page], `/api2/iidx/plays/${page}`);
}
