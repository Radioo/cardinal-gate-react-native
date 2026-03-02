import useApiQuery from "@/hooks/queries/useApiQuery";
import {IidxProfileResponse} from "@/types/iidx-profile-response";

export default function useIidxProfile() {
    return useApiQuery<IidxProfileResponse>(['iidxProfile'], '/api2/iidx/profile');
}
