import ThemedText from "@/components/themed/ThemedText";
import {StyleSheet, View} from "react-native";
import ThemedCard from "@/components/themed/ThemedCard";
import {GdMusicSkillItem} from "@/types/gd-skill-data-response";
import GdDifficultyInfo from "@/components/gd/GdDifficulty";
import {memo} from "react";
import {formatGdSkillValue} from "@/services/game";

type GdSkillListItemProps = {
    item: GdMusicSkillItem;
    index: number;
}

const GdSkillListItemInner = ({item, index}: GdSkillListItemProps) => {
    return (
        <ThemedCard style={styles.card}>
            <ThemedText style={styles.index}>#{(index + 1).toString().padStart(2, '0')}</ThemedText>
            <View style={styles.info}>
                <ThemedText numberOfLines={1} ellipsizeMode="tail">{item.title}</ThemedText>
                <GdDifficultyInfo difficulty={item.difficulty}/>
            </View>
            <View>
                <ThemedText style={styles.skillValue}>{formatGdSkillValue(item.skill)}</ThemedText>
                <ThemedText style={styles.percentage}>{formatGdSkillValue(item.percentage)}%</ThemedText>
            </View>
        </ThemedCard>
    )
}

export default memo(GdSkillListItemInner);

const styles = StyleSheet.create({
    card: {flexDirection: 'row', gap: 5, alignItems: 'center', marginHorizontal: 10, flex: 1},
    index: {lineHeight: 40, fontSize: 30, fontFamily: 'monospace', fontWeight: 'bold'},
    info: {flexDirection: 'column', justifyContent: 'space-between', flex: 1},
    skillValue: {fontWeight: 'bold', textAlign: 'right'},
    percentage: {textAlign: 'right'},
});
