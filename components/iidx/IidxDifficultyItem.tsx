import {IidxDifficulty} from "@/enums/iidx-difficulty";
import {memo} from "react";
import {IidxPlayStyle} from "@/enums/iidx-play-style";
import {Text, View} from "react-native";
import useTheme from "@/hooks/useTheme";
import {darkenHex, lightenHex} from "@/lib/color-utils";

export type IidxDifficultyProps = {
    difficulty: IidxDifficulty;
    level: number;
}

export const IIDX_CHIP_HEIGHT = 22;

const DIFFICULTY_DATA: Record<IidxDifficulty, { playStyle: IidxPlayStyle; name: string; color: string }> = {
    [IidxDifficulty.SPB]: {playStyle: IidxPlayStyle.SP, name: 'BEGINNER', color: '#3f9d34'},
    [IidxDifficulty.SPN]: {playStyle: IidxPlayStyle.SP, name: 'NORMAL', color: '#3a85b8'},
    [IidxDifficulty.SPH]: {playStyle: IidxPlayStyle.SP, name: 'HYPER', color: '#c79a1e'},
    [IidxDifficulty.SPA]: {playStyle: IidxPlayStyle.SP, name: 'ANOTHER', color: '#c92626'},
    [IidxDifficulty.SPL]: {playStyle: IidxPlayStyle.SP, name: 'LEGGENDARIA', color: '#9333c9'},
    [IidxDifficulty.DPB]: {playStyle: IidxPlayStyle.DP, name: 'BEGINNER', color: '#3f9d34'},
    [IidxDifficulty.DPN]: {playStyle: IidxPlayStyle.DP, name: 'NORMAL', color: '#3a85b8'},
    [IidxDifficulty.DPH]: {playStyle: IidxPlayStyle.DP, name: 'HYPER', color: '#c79a1e'},
    [IidxDifficulty.DPA]: {playStyle: IidxPlayStyle.DP, name: 'ANOTHER', color: '#c92626'},
    [IidxDifficulty.DPL]: {playStyle: IidxPlayStyle.DP, name: 'LEGGENDARIA', color: '#9333c9'},
};

const IidxDifficultyItemInner = ({difficulty, level}: IidxDifficultyProps) => {
    const theme = useTheme();
    const data = DIFFICULTY_DATA[difficulty];
    const isDark = theme.scheme === 'dark';

    const tintBg = isDark ? darkenHex(0.30, data.color) : lightenHex(0.40, data.color);
    const tintText = isDark ? lightenHex(0.28, data.color) : darkenHex(0.18, data.color);
    const border = isDark ? lightenHex(0.05, data.color) : darkenHex(0.05, data.color);
    const accentBg = data.color;
    const accentText = isDark ? darkenHex(0.40, data.color) : '#ffffff';
    const stampBg = isDark ? '#2a2c2e' : '#e8e8ea';
    const stampText = isDark ? '#c4c6c8' : '#3a3c3e';

    return (
        <View
            style={{
                flexDirection: 'row',
                flexShrink: 0,
                minHeight: IIDX_CHIP_HEIGHT,
                borderWidth: 1,
                borderColor: border,
                overflow: 'hidden',
            }}
        >
            <View style={{justifyContent: 'center', paddingHorizontal: 6, backgroundColor: stampBg}}>
                <Text
                    className="font-mono font-semibold text-[10px]"
                    style={{color: stampText, letterSpacing: 1.4, lineHeight: 12}}
                    numberOfLines={1}
                >
                    {data.playStyle}
                </Text>
            </View>
            <View style={{width: 1, backgroundColor: border}}/>
            <View style={{justifyContent: 'center', paddingHorizontal: 8, backgroundColor: tintBg}}>
                <Text
                    className="font-bold text-[10px]"
                    style={{color: tintText, letterSpacing: 1.6, lineHeight: 12}}
                    numberOfLines={1}
                >
                    {data.name}
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

export default memo(IidxDifficultyItemInner);
