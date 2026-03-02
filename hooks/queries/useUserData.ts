import useApiQuery from "@/hooks/queries/useApiQuery";
import {UserData} from "@/types/user-data";

export default function useUserData() {
    return useApiQuery<UserData>(['userData'], '/api2/me');
}
