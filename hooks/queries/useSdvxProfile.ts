import useApiQuery from "@/hooks/queries/useApiQuery";
import {SdvxProfileResponse} from "@/types/sdvx-profile-response";

export default function useSdvxProfile() {
    return useApiQuery<SdvxProfileResponse>(['sdvxProfile'], '/api2/sdvx/profile');
}
