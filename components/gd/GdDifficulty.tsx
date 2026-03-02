import {GdDifficultyContainer} from "@/types/gd-difficulty-container";
import {StyleSheet, Text, View} from "react-native";
import {GdDifficulty} from "@/enums/gd-difficulty";
import {lighten} from "polished";
import {memo} from "react";
import useTheme from "@/hooks/useTheme";

const difficultyColors: Record<GdDifficulty, string> = {
    [GdDifficulty.BASIC]: '#427486',
    [GdDifficulty.ADVANCED]: '#705b38',
    [GdDifficulty.EXTREME]: '#a21e1e',
    [GdDifficulty.MASTER]: '#8f008f',
};

type GdDifficultyProps = {
    difficulty: GdDifficultyContainer;
}

const GdDifficultyInfoInner = ({difficulty}: GdDifficultyProps) => {
    const theme = useTheme();
    const baseColor = difficultyColors[difficulty.difficulty] ?? '#000000';
    const difficultyColor = theme.scheme === 'light' ? lighten(0.2, baseColor) : baseColor;
    const typeColor = theme.scheme === 'light' ? lighten(0.2, '#4f4f4f') : '#4f4f4f';

    return (
        <View style={styles.row}>
            <Text style={[styles.typeCell, {backgroundColor: typeColor}]}>
                {difficulty.type}
            </Text>
            <Text style={[styles.middleCell, {backgroundColor: difficultyColor}]}>
                {difficulty.difficulty}
            </Text>
            <Text style={[styles.levelCell, {backgroundColor: difficultyColor}]}>
                {(difficulty.level / 100).toFixed(2)}
            </Text>
        </View>
    )
}

export default memo(GdDifficultyInfoInner);

const styles = StyleSheet.create({
    row: {flexDirection: 'row'},
    typeCell: {
        color: 'white',
        paddingHorizontal: 4,
        borderWidth: 2,
        borderColor: '#000000',
    },
    middleCell: {
        color: 'white',
        paddingHorizontal: 4,
        borderWidth: 2,
        borderColor: '#000000',
        borderLeftWidth: 0,
        borderRightWidth: 0,
    },
    levelCell: {
        color: 'white',
        paddingHorizontal: 4,
        borderWidth: 2,
        borderColor: '#000000',
    },
});
