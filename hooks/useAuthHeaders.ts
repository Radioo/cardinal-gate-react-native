import {useQuery} from "@tanstack/react-query";
import {buildAuthRequestInit} from "@/services/auth-headers";

export default function useAuthHeaders() {
    return useQuery({
        queryKey: ['authHeaders'],
        queryFn: async () => {
            const init = await buildAuthRequestInit();
            return (init.headers as Record<string, string>) ?? {};
        },
        staleTime: Infinity,
    });
}
