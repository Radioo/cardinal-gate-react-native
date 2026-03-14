import {Text} from "@/components/ui/text";
import FullScreenLoader from "@/components/shared/FullScreenLoader";
import ErrorScreen from "@/components/shared/ErrorScreen";
import {View} from "react-native";
import {Card} from "@/components/ui/card";
import {Clock} from "lucide-react-native";
import useTheme from "@/hooks/useTheme";
import {getSeriesName, estimatePlayTimeHours} from "@/services/game";
import useSummary from "@/hooks/queries/useSummary";

export default function PlayCounts() {
    const {data, isPending, isError, error, refetch} = useSummary();
    const theme = useTheme();

    if(isPending) {
        return <FullScreenLoader style={{height: 100}}/>
    }

    if(isError) {
        return <ErrorScreen error={error} onRetry={refetch}/>
    }

    return (
        <View className="m-2.5 gap-[5px]">
            <Card className="border-primary bg-primary-surface gap-0 rounded-none p-1.5 shadow-none">
                <View className="flex-row items-center gap-[5px]">
                    <Clock size={24} color={theme.text} />
                    <Text className="text-base leading-6">Estimated play time: {estimatePlayTimeHours(data?.play_counts ?? [])} hours</Text>
                </View>
            </Card>
            <Card className="border-primary bg-primary-surface gap-0 rounded-none p-1.5 shadow-none">
                {data?.play_counts.map((item, index) => (
                    <View key={index} className="flex-row justify-between">
                        <Text className="text-base leading-6">{getSeriesName(item.series)}</Text>
                        <Text className="text-base leading-6">{item.count.toLocaleString()} plays</Text>
                    </View>
                ))}
            </Card>
        </View>
    )
}
