import useApiQuery from "@/hooks/queries/useApiQuery";
import {GdProfileResponse} from "@/types/gd-profile-response";

export default function useGdProfile() {
    return useApiQuery<GdProfileResponse>(['gdProfile'], '/api2/gd/profile');
}
