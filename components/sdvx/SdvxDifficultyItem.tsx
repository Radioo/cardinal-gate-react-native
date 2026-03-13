import {SdvxDifficulty} from "@/enums/sdvx-difficulty";
import {Text, View} from "react-native";
import useTheme from "@/hooks/useTheme";
import {darken, lighten} from "polished";
import {memo} from "react";

type SdvxDifficultyProps = {
    difficulty: SdvxDifficulty;
    level: number;
}

const DIFFICULTY_COLORS: Record<SdvxDifficulty, string> = {
    [SdvxDifficulty.NOVICE]: '#8666be',
    [SdvxDifficulty.ADVANCED]: '#ec0',
    [SdvxDifficulty.EXHAUST]: '#f33',
    [SdvxDifficulty.INFINITE]: '#e3d',
    [SdvxDifficulty.GRAVITY]: '#f60',
    [SdvxDifficulty.HEAVENLY]: '#31a0ff',
    [SdvxDifficulty.VIVID]: '#f19',
    [SdvxDifficulty.EXCEED]: '#3b71ff',
    [SdvxDifficulty.MAXIMUM]: '#9ac',
};

const SdvxDifficultyItemInner = ({difficulty, level}: SdvxDifficultyProps) => {
    const theme = useTheme();
    const baseColor = DIFFICULTY_COLORS[difficulty] ?? '#000';
    const difficultyColor = theme.scheme === 'dark'
        ? darken(0.25, baseColor)
        : lighten(0.25, baseColor);
    const borderColor = theme.scheme === 'dark'
        ? lighten(0.25, difficultyColor)
        : darken(0.25, difficultyColor);

    return (
        <View className="flex-row border-2 self-start" style={{borderColor}}>
            <Text className="px-[5px] font-bold" style={{backgroundColor: difficultyColor, color: theme.text}}>
                {difficulty}
            </Text>
            <View className="w-0.5" style={{backgroundColor: borderColor}} />
            <Text className="px-[5px] font-bold" style={{backgroundColor: difficultyColor, color: theme.text}}>
                {level}
            </Text>
        </View>
    )
}

export default memo(SdvxDifficultyItemInner);
