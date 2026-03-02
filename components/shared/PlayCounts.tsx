import ThemedText from "@/components/themed/ThemedText";
import FullScreenLoader from "@/components/shared/FullScreenLoader";
import {StyleSheet, View} from "react-native";
import ThemedCard from "@/components/themed/ThemedCard";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import useTheme from "@/hooks/useTheme";
import {getSeriesName, estimatePlayTimeHours} from "@/services/game";
import useSummary from "@/hooks/queries/useSummary";

export default function PlayCounts() {
    const {data, isPending} = useSummary();
    const theme = useTheme();

    if(isPending) {
        return <FullScreenLoader style={styles.loader}/>
    }

    return (
        <View style={styles.container}>
            <ThemedCard>
                <View style={styles.timeRow}>
                    <MaterialIcons name="access-time" size={24} color={theme.text} />
                    <ThemedText>Estimated play time: {estimatePlayTimeHours(data?.play_counts ?? [])} hours</ThemedText>
                </View>
            </ThemedCard>
            <ThemedCard>
                {data?.play_counts.map((item, index) => (
                    <View key={index} style={styles.playCountItemContainer}>
                        <ThemedText>{getSeriesName(item.game)}</ThemedText>
                        <ThemedText>{item.count.toLocaleString()} plays</ThemedText>
                    </View>
                ))}
            </ThemedCard>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        gap: 5,
    },
    loader: {height: 100},
    timeRow: {flexDirection: 'row', alignItems: 'center', gap: 5},
    playCountItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})
