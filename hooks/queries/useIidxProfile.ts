import {useQuery} from "@tanstack/react-query";
import fetchApi2 from "@/services/api2";
import {IidxProfileResponse} from "@/types/iidx-profile-response";

export default function useIidxProfile() {
    return useQuery({
        queryKey: ['iidxProfile'],
        queryFn: () => fetchApi2<IidxProfileResponse>('/iidx/profile'),
    })
}
