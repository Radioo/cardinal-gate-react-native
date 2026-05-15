import {SdvxDifficulty} from "@/enums/sdvx-difficulty";
import {Text, View} from "react-native";
import useTheme from "@/hooks/useTheme";
import {darkenHex, lightenHex} from "@/lib/color-utils";
import {memo} from "react";

type SdvxDifficultyProps = {
    difficulty: SdvxDifficulty;
    level: number;
}

export const SDVX_CHIP_HEIGHT = 22;

const DIFFICULTY_COLORS: Record<SdvxDifficulty, string> = {
    [SdvxDifficulty.NOVICE]: '#8666be',
    [SdvxDifficulty.ADVANCED]: '#d4b500',
    [SdvxDifficulty.EXHAUST]: '#e23030',
    [SdvxDifficulty.INFINITE]: '#cc33cc',
    [SdvxDifficulty.GRAVITY]: '#f57c1c',
    [SdvxDifficulty.HEAVENLY]: '#31a0ff',
    [SdvxDifficulty.VIVID]: '#f0269e',
    [SdvxDifficulty.EXCEED]: '#3b71ff',
    [SdvxDifficulty.MAXIMUM]: '#99aacc',
};

const SdvxDifficultyItemInner = ({difficulty, level}: SdvxDifficultyProps) => {
    const theme = useTheme();
    const baseColor = DIFFICULTY_COLORS[difficulty] ?? '#666666';
    const isDark = theme.scheme === 'dark';

    const tintBg = isDark ? darkenHex(0.30, baseColor) : lightenHex(0.40, baseColor);
    const tintText = isDark ? lightenHex(0.28, baseColor) : darkenHex(0.18, baseColor);
    const border = isDark ? lightenHex(0.05, baseColor) : darkenHex(0.05, baseColor);
    const accentBg = baseColor;
    const accentText = isDark ? darkenHex(0.40, baseColor) : '#ffffff';

    return (
        <View
            style={{
                flexDirection: 'row',
                flexShrink: 0,
                minHeight: SDVX_CHIP_HEIGHT,
                borderWidth: 1,
                borderColor: border,
                overflow: 'hidden',
            }}
        >
            <View style={{justifyContent: 'center', paddingHorizontal: 8, backgroundColor: tintBg}}>
                <Text
                    className="font-bold text-[10px]"
                    style={{color: tintText, letterSpacing: 1.6, lineHeight: 12}}
                    numberOfLines={1}
                >
                    {difficulty}
                </Text>
            </View>
            <View style={{width: 1, backgroundColor: border}}/>
            <View style={{justifyContent: 'center', paddingHorizontal: 7, backgroundColor: accentBg}}>
                <Text
                    className="font-mono font-bold text-[12px]"
                    style={{color: accentText, lineHeight: 12, letterSpacing: 0.3}}
                    numberOfLines={1}
                >
                    {String(level).padStart(2, '0')}
                </Text>
            </View>
        </View>
    );
};

export default memo(SdvxDifficultyItemInner);
