import {useQuery} from "@tanstack/react-query";
import fetchApi2 from "@/services/api2";

export default function useIidxScoreCard(playId: number) {
    return useQuery({
        queryKey: ['iidxScoreCard', playId],
        queryFn: () => fetchApi2<Blob>(
            `/iidx/chart-screenshot/${playId}.png`,
            undefined,
            true,
        ).then(response => {
            let url = `${process.env.EXPO_PUBLIC_API_URL}/iidx/chart-screenshot/${playId}.png`;
            url = url.replace('/api2', '');

            return new Promise<{b64: string, url: string}>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    resolve({
                        b64: reader.result as string,
                        url: url,
                    });
                };
                reader.onerror = reject;
                reader.readAsDataURL(response);
            });
        }),
        staleTime: Infinity,
        enabled: false,
    })
}
