import {IidxDifficulty} from "@/enums/iidx-difficulty";
import {memo} from "react";
import {IidxPlayStyle} from "@/enums/iidx-play-style";
import {Text, View} from "react-native";
import useTheme from "@/hooks/useTheme";
import {lightenHex} from "@/lib/color-utils";

export type IidxDifficultyProps = {
    difficulty: IidxDifficulty;
    level: number;
}

const THEME_COLORS = {
    DARK_TEXT: 'white',
    LIGHT_TEXT: 'black',
    DARK_BG: '#4f4f4f',
    LIGHT_BG: '#f0f0f0',
} as const;

const DIFFICULTY_COLORS = {
    BEGINNER: '#3f6934',
    NORMAL: '#385c70',
    HYPER: '#a28c1e',
    ANOTHER: '#8f0000',
    LEGGENDARIA: '#70008f',
} as const;

const DIFFICULTY_DATA: Record<IidxDifficulty, { playStyle: IidxPlayStyle; name: string; color: string }> = {
    [IidxDifficulty.SPB]: { playStyle: IidxPlayStyle.SP, name: 'BEGINNER', color: DIFFICULTY_COLORS.BEGINNER },
    [IidxDifficulty.SPN]: { playStyle: IidxPlayStyle.SP, name: 'NORMAL', color: DIFFICULTY_COLORS.NORMAL },
    [IidxDifficulty.SPH]: { playStyle: IidxPlayStyle.SP, name: 'HYPER', color: DIFFICULTY_COLORS.HYPER },
    [IidxDifficulty.SPA]: { playStyle: IidxPlayStyle.SP, name: 'ANOTHER', color: DIFFICULTY_COLORS.ANOTHER },
    [IidxDifficulty.SPL]: { playStyle: IidxPlayStyle.SP, name: 'LEGGENDARIA', color: DIFFICULTY_COLORS.LEGGENDARIA },
    [IidxDifficulty.DPB]: { playStyle: IidxPlayStyle.DP, name: 'BEGINNER', color: DIFFICULTY_COLORS.BEGINNER },
    [IidxDifficulty.DPN]: { playStyle: IidxPlayStyle.DP, name: 'NORMAL', color: DIFFICULTY_COLORS.NORMAL },
    [IidxDifficulty.DPH]: { playStyle: IidxPlayStyle.DP, name: 'HYPER', color: DIFFICULTY_COLORS.HYPER },
    [IidxDifficulty.DPA]: { playStyle: IidxPlayStyle.DP, name: 'ANOTHER', color: DIFFICULTY_COLORS.ANOTHER },
    [IidxDifficulty.DPL]: { playStyle: IidxPlayStyle.DP, name: 'LEGGENDARIA', color: DIFFICULTY_COLORS.LEGGENDARIA },
};

const IidxDifficultyItemInner = ({difficulty, level}: IidxDifficultyProps) => {
    const theme = useTheme();
    const data = DIFFICULTY_DATA[difficulty];
    const isDark = theme.scheme === 'dark';
    const textColor = isDark ? THEME_COLORS.DARK_TEXT : THEME_COLORS.LIGHT_TEXT;
    const bgColor = isDark ? THEME_COLORS.DARK_BG : THEME_COLORS.LIGHT_BG;
    const diffColor = isDark ? data.color : lightenHex(0.5, data.color);

    return (
        <View className="flex-row border-2 border-black">
            <Text className="px-1" style={{color: textColor, backgroundColor: bgColor}}>
                {data.playStyle}
            </Text>
            <View className="w-0.5 bg-black" />
            <Text className="px-1" style={{color: textColor, backgroundColor: diffColor}}>
                {data.name}
            </Text>
            <View className="w-0.5 bg-black" />
            <Text className="px-1" style={{color: textColor, backgroundColor: diffColor}}>
                {level}
            </Text>
        </View>
    )
}

export default memo(IidxDifficultyItemInner);
