import {useQuery} from "@tanstack/react-query";
import fetchApi2 from "@/services/api2";

export default function useIidxScoreCard(playId: number) {
    return useQuery({
        queryKey: ['iidxScoreCard', playId],
        queryFn: () => fetchApi2<Blob>(
            `/iidx/chart-screenshot/${playId}`,
            undefined,
            true,
        ).then(response => {
            return new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    resolve(reader.result as string);
                };
                reader.onerror = reject;
                reader.readAsDataURL(response);
            });
        }),
        staleTime: Infinity,
        enabled: false,
    })
}
