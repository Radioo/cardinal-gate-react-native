import {useQuery} from "@tanstack/react-query";
import {buildAuthHeaders} from "@/services/auth-headers";

export default function useAuthHeaders() {
    return useQuery({
        queryKey: ['authHeaders'],
        queryFn: buildAuthHeaders,
        staleTime: Infinity,
    });
}
