import {useQuery} from "@tanstack/react-query";
import fetchApi2 from "@/services/api2";
import {SdvxProfileResponse} from "@/types/sdvx-profile-response";

export default function useSdvxProfile() {
    return useQuery({
        queryKey: ['sdvxProfile'],
        queryFn: () => fetchApi2<SdvxProfileResponse>('/api2/sdvx/profile'),
        staleTime: Infinity,
    })
}
