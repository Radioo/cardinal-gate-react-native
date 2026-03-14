import {GdDifficultyContainer} from "@/types/gd-difficulty-container";
import {Text, View} from "react-native";
import {GdDifficulty} from "@/enums/gd-difficulty";
import {lighten} from "polished";
import {memo} from "react";
import useTheme from "@/hooks/useTheme";
import {formatGdSkillValue} from "@/services/game";

const DIFFICULTY_COLORS: Record<GdDifficulty, string> = {
    [GdDifficulty.BASIC]: '#427486',
    [GdDifficulty.ADVANCED]: '#705b38',
    [GdDifficulty.EXTREME]: '#a21e1e',
    [GdDifficulty.MASTER]: '#8f008f',
};

/**
 * GdDifficultyItem takes a compound GdDifficultyContainer prop (type + difficulty + level)
 * because GD difficulties have a GdDifficultyType dimension (GUITAR/BASS/DRUM) absent in IIDX/SDVX.
 * This is domain-driven, not an inconsistency with IidxDifficultyItem/SdvxDifficultyItem's flat props.
 */
type GdDifficultyProps = {
    difficulty: GdDifficultyContainer;
}

const GdDifficultyItemInner = ({difficulty}: GdDifficultyProps) => {
    const theme = useTheme();
    const baseColor = DIFFICULTY_COLORS[difficulty.difficulty] ?? '#000000';
    const difficultyColor = theme.scheme === 'light' ? lighten(0.2, baseColor) : baseColor;
    const typeColor = theme.scheme === 'light' ? lighten(0.2, '#4f4f4f') : '#4f4f4f';

    return (
        <View className="flex-row">
            <Text className="text-white px-1 border-2 border-black" style={{backgroundColor: typeColor}}>
                {difficulty.type}
            </Text>
            <Text className="text-white px-1 border-y-2 border-black" style={{backgroundColor: difficultyColor}}>
                {difficulty.difficulty}
            </Text>
            <Text className="text-white px-1 border-2 border-black" style={{backgroundColor: difficultyColor}}>
                {formatGdSkillValue(difficulty.level)}
            </Text>
        </View>
    )
}

export default memo(GdDifficultyItemInner);
