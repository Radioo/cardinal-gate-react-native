import {IidxDifficulty} from "@/enums/iidx-difficulty";
import {memo} from "react";
import {IidxPlayStyle} from "@/enums/iidx-play-style";
import {StyleSheet, Text, View} from "react-native";
import {lighten} from "polished";
import useTheme from "@/hooks/useTheme";

export type IidxDifficultyProps = {
    difficulty: IidxDifficulty;
    level: number;
}

const DIFFICULTY_DATA: Record<IidxDifficulty, { playStyle: IidxPlayStyle; name: string; color: string }> = {
    [IidxDifficulty.SPB]: { playStyle: IidxPlayStyle.SP, name: 'BEGINNER', color: '#3f6934' },
    [IidxDifficulty.SPN]: { playStyle: IidxPlayStyle.SP, name: 'NORMAL', color: '#385c70' },
    [IidxDifficulty.SPH]: { playStyle: IidxPlayStyle.SP, name: 'HYPER', color: '#a28c1e' },
    [IidxDifficulty.SPA]: { playStyle: IidxPlayStyle.SP, name: 'ANOTHER', color: '#8f0000' },
    [IidxDifficulty.SPL]: { playStyle: IidxPlayStyle.SP, name: 'LEGGENDARIA', color: '#70008f' },
    [IidxDifficulty.DPB]: { playStyle: IidxPlayStyle.DP, name: 'BEGINNER', color: '#3f6934' },
    [IidxDifficulty.DPN]: { playStyle: IidxPlayStyle.DP, name: 'NORMAL', color: '#385c70' },
    [IidxDifficulty.DPH]: { playStyle: IidxPlayStyle.DP, name: 'HYPER', color: '#a28c1e' },
    [IidxDifficulty.DPA]: { playStyle: IidxPlayStyle.DP, name: 'ANOTHER', color: '#8f0000' },
    [IidxDifficulty.DPL]: { playStyle: IidxPlayStyle.DP, name: 'LEGGENDARIA', color: '#70008f' },
};

const IidxDifficultyItemInner = ({difficulty, level}: IidxDifficultyProps) => {
    const theme = useTheme();
    const data = DIFFICULTY_DATA[difficulty];
    const isDark = theme.scheme === 'dark';
    const textColor = isDark ? 'white' : 'black';
    const bgColor = isDark ? '#4f4f4f' : '#f0f0f0';
    const diffColor = isDark ? data.color : lighten(0.5, data.color);

    return (
        <View style={styles.row}>
            <Text style={[styles.cell, {color: textColor, backgroundColor: bgColor}]}>
                {data.playStyle}
            </Text>
            <View style={styles.separator} />
            <Text style={[styles.cell, {color: textColor, backgroundColor: diffColor}]}>
                {data.name}
            </Text>
            <View style={styles.separator} />
            <Text style={[styles.cell, {color: textColor, backgroundColor: diffColor}]}>
                {level}
            </Text>
        </View>
    )
}

export default memo(IidxDifficultyItemInner);

const styles = StyleSheet.create({
    row: {flexDirection: 'row', borderWidth: 2, borderColor: 'black'},
    cell: {paddingHorizontal: 4},
    separator: {width: 2, backgroundColor: 'black'},
});
