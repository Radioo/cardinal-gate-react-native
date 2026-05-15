import {useQuery} from "@tanstack/react-query";
import {getSecureValue} from "@/services/secure-storage";
import {SecureValue} from "@/enums/secure-value";

export default function useAuthToken() {
    return useQuery({
        queryKey: ['authToken'],
        queryFn: () => getSecureValue(SecureValue.TOKEN),
        staleTime: Infinity,
        retry: false,
    });
}
