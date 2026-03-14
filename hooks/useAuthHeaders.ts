import {useQuery} from "@tanstack/react-query";
import {buildAuthRequestInit} from "@/services/auth-headers";

export default function useAuthHeaders() {
    return useQuery({
        queryKey: ['authHeaders'],
        queryFn: async () => {
            const init = await buildAuthRequestInit();
            const headers = init.headers;
            if (!headers || headers instanceof Headers || Array.isArray(headers)) {
                return {};
            }
            return headers;
        },
        staleTime: Infinity,
    });
}
