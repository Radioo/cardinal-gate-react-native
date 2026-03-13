import ThemedText from "@/components/themed/ThemedText";
import FullScreenLoader from "@/components/shared/FullScreenLoader";
import {View} from "react-native";
import ThemedCard from "@/components/themed/ThemedCard";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import useTheme from "@/hooks/useTheme";
import {getSeriesName, estimatePlayTimeHours} from "@/services/game";
import useSummary from "@/hooks/queries/useSummary";

export default function PlayCounts() {
    const {data, isPending} = useSummary();
    const theme = useTheme();

    if(isPending) {
        return <FullScreenLoader style={{height: 100}}/>
    }

    return (
        <View className="m-2.5 gap-[5px]">
            <ThemedCard>
                <View className="flex-row items-center gap-[5px]">
                    <MaterialIcons name="access-time" size={24} color={theme.text} />
                    <ThemedText>Estimated play time: {estimatePlayTimeHours(data?.play_counts ?? [])} hours</ThemedText>
                </View>
            </ThemedCard>
            <ThemedCard>
                {data?.play_counts.map((item, index) => (
                    <View key={index} className="flex-row justify-between">
                        <ThemedText>{getSeriesName(item.game)}</ThemedText>
                        <ThemedText>{item.count.toLocaleString()} plays</ThemedText>
                    </View>
                ))}
            </ThemedCard>
        </View>
    )
}
