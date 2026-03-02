import {IidxPlay} from "@/types/iidx-play";
import ThemedText from "@/components/themed/ThemedText";
import {StyleSheet, View} from "react-native";
import useTheme from "@/hooks/useTheme";
import IidxClearTypeItem from "@/components/iidx/IidxClearTypeItem";
import ThemedButton from "@/components/themed/ThemedButton";
import {FontAwesome} from "@expo/vector-icons";
import {useState} from "react";
import ShareImageModal from "@/components/shared/ShareImageModal";
import ThemedCard from "@/components/themed/ThemedCard";
import IidxDifficultyItem from "@/components/iidx/IidxDifficulty";
import {getIidxScoreCardUrl} from "@/services/game";

type IidxPlayRowProps = {
    play: IidxPlay;
}

export default function IidxPlayRow({play}: IidxPlayRowProps) {
    const theme = useTheme();
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <ThemedCard>
            <ShareImageModal url={getIidxScoreCardUrl(play.id)} visible={modalVisible} onClose={() => setModalVisible(false)}/>
            <View style={styles.content}>
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <ThemedText>{play.name}</ThemedText>
                        <View style={styles.row}>
                            <IidxDifficultyItem difficulty={play.difficulty} level={play.level}/>
                        </View>
                    </View>
                    {play.has_score_card ?
                        <ThemedButton icon={<FontAwesome name="camera" size={24} color={theme.background}/>}
                                      onPress={() => setModalVisible(true)}
                        /> : null}
                </View>
                <View style={[styles.divider, {backgroundColor: theme.primary}]}/>
                <View style={styles.statsRow}>
                    <View style={styles.clearTypeCell}>
                        <IidxClearTypeItem clearType={play.clear_type}/>
                    </View>
                    <View style={styles.scoreCell}>
                        <ThemedText style={styles.scoreText}>{play.ex_score.toLocaleString()} EX</ThemedText>
                        <ThemedText style={styles.smallCenterText}>{play.percentage.toFixed(2)}%</ThemedText>
                    </View>
                    <ThemedText style={styles.gradeText}>{play.grade}</ThemedText>
                    <View style={styles.countsCell}>
                        <ThemedText style={styles.smallRightText}>{play.perfect_count.toLocaleString()} PG</ThemedText>
                        <ThemedText style={styles.smallRightText}>{play.great_count.toLocaleString()} GR</ThemedText>
                        {play.miss_count === null ? null :
                            <ThemedText style={styles.smallRightText}>{play.miss_count.toLocaleString()} MC</ThemedText>}
                    </View>
                </View>
            </View>
        </ThemedCard>
    )
}

const styles = StyleSheet.create({
    content: {gap: 5},
    header: {flexDirection: 'row', alignItems: 'center'},
    headerLeft: {marginRight: 'auto'},
    row: {flexDirection: 'row'},
    divider: {height: 1},
    statsRow: {flexDirection: 'row', alignItems: 'center'},
    clearTypeCell: {flex: 2, flexDirection: 'row'},
    scoreCell: {flex: 2},
    countsCell: {flex: 1},
    scoreText: {fontWeight: 'bold', lineHeight: 30, fontSize: 20, textAlign: 'center'},
    smallCenterText: {textAlign: 'center', lineHeight: 16, fontSize: 12},
    gradeText: {flex: 1, fontWeight: 'bold', lineHeight: 40, fontSize: 20},
    smallRightText: {textAlign: 'right', lineHeight: 16, fontSize: 12},
});
