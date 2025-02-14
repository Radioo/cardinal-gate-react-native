import {ThemedText} from "@/components/ThemedText";
import {useEffect, useState} from "react";
import {SummaryResponse} from "@/types/summary-response";
import fetchApi from "@/services/api";
import FullScreenLoader from "@/components/FullScreenLoader";
import {StyleSheet, View} from "react-native";
import ThemedCard from "@/components/ThemedCard";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {useTheme} from "@/hooks/useTheme";
import {getSeriesName} from "@/services/game";

export function PlayCounts() {
    const [summary, setSummary] = useState<SummaryResponse | null>(null);
    const theme = useTheme();

    const getEstimatedPlayTimeHours = () => {
        let minutes = 0;

        summary?.play_counts.forEach(item => {
            minutes += item.count * 2;
        });

        const hours = minutes / 60;

        return Number.isInteger(hours) ? hours : hours.toFixed(1);
    }

    useEffect(() => {
        fetchApi<SummaryResponse>('/api2/summary').then(data => {
            setSummary(data);
        });
    }, []);

    if(summary === null) {
        return <FullScreenLoader style={{height: 100}}></FullScreenLoader>
    }

    return (
        <View style={styles.container}>
            <ThemedCard>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                    <MaterialIcons name="access-time" size={24} color={theme.text} />
                    <ThemedText>Estimated play time: {getEstimatedPlayTimeHours()} hours</ThemedText>
                </View>
            </ThemedCard>
            <View>
                {summary.play_counts.map((item, index) => (
                    <View key={index} style={styles.playCountItemContainer}>
                        <ThemedText>{getSeriesName(item.game)}</ThemedText>
                        <ThemedText>{item.count.toLocaleString()} plays</ThemedText>
                    </View>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        gap: 5,
    },
    playCountItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})
