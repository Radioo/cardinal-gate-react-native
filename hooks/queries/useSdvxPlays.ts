import useApiQuery from "@/hooks/queries/useApiQuery";
import {SdvxPlaysResponse} from "@/types/sdvx-plays-response";

export default function useSdvxPlays(page: number) {
    return useApiQuery<SdvxPlaysResponse>(['sdvxPlays', page], `/api2/sdvx/plays?page=${page}`);
}
