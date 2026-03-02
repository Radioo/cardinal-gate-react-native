import useApiQuery from "@/hooks/queries/useApiQuery";
import {SummaryResponse} from "@/types/summary-response";

export default function useSummary() {
    return useApiQuery<SummaryResponse>(['summary'], '/api2/summary');
}
