import {ThemedText} from "@/components/ThemedText";
import {useEffect, useState} from "react";
import {SummaryResponse} from "@/types/summary-response";
import fetchApi from "@/services/api";
import FullScreenLoader from "@/components/FullScreenLoader";
import {StyleSheet, View} from "react-native";

export function PlayCounts() {
    const [summary, setSummary] = useState<SummaryResponse | null>(null);

    useEffect(() => {
        fetchApi<SummaryResponse>('/summary').then(data => {
            setSummary(data);
        });
    }, []);

    if(summary === null) {
        return <FullScreenLoader style={{height: 100}}></FullScreenLoader>
    }

    return (
        <View style={styles.container}>
            {summary.play_counts.map((item, index) => (
                <ThemedText key={index}>{item.game}: {item.count}</ThemedText>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'gray',
        margin: 10,
    }
})
