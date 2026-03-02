import {SdvxPlay} from "@/types/sdvx-play";
import ThemedText from "@/components/themed/ThemedText";
import ThemedCard from "@/components/themed/ThemedCard";
import SdvxDifficultyItem from "@/components/sdvx/SdvxDifficultyItem";
import {StyleSheet, View} from "react-native";
import useTheme from "@/hooks/useTheme";
import SdvxClearTypeItem from "@/components/sdvx/SdvxClearTypeItem";

type SdvxPlayRowProps = {
    play: SdvxPlay;
}

export default function SdvxPlayRow({play}: SdvxPlayRowProps) {
    const theme = useTheme();

    return (
        <ThemedCard style={styles.card}>
            <View style={styles.header}>
                <ThemedText numberOfLines={1}>{play.title}</ThemedText>
                <SdvxDifficultyItem difficulty={play.difficulty} level={play.level}/>
            </View>
            <View style={[styles.divider, {backgroundColor: theme.primary}]}/>
            <View style={styles.statsRow}>
                <View style={styles.clearTypeCell}>
                    <SdvxClearTypeItem clearType={play.clear_type}/>
                </View>
                <View style={styles.scoreCell}>
                    <ThemedText style={styles.scoreText}>
                        {play.score.toLocaleString()}
                    </ThemedText>
                    {play.ex_score === 0 || play.ex_score === null ? null :
                        <ThemedText style={styles.exScoreText}>
                            {play.ex_score.toLocaleString()} EX
                        </ThemedText>
                    }
                </View>
                <View style={styles.gradeCell}>
                    <ThemedText style={styles.gradeText}>
                        {play.grade}
                    </ThemedText>
                </View>
            </View>
        </ThemedCard>
    )
}

const styles = StyleSheet.create({
    card: {gap: 5},
    header: {gap: 5},
    divider: {height: 1},
    statsRow: {flexDirection: 'row', gap: 5},
    clearTypeCell: {flex: 2, alignItems: 'center', justifyContent: 'center'},
    scoreCell: {flex: 1, alignItems: 'center', justifyContent: 'center'},
    gradeCell: {alignItems: 'center', justifyContent: 'center', flex: 1},
    scoreText: {fontWeight: 'bold', textAlign: 'center'},
    exScoreText: {textAlign: 'center', fontSize: 14},
    gradeText: {fontWeight: 'bold', textAlign: 'center', fontSize: 24, lineHeight: 40},
});
