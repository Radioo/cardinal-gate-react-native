import {IidxDifficulty} from "@/enums/iidx-difficulty";
import {memo} from "react";
import {IidxPlayStyle} from "@/enums/iidx-play-style";
import useTheme from "@/hooks/useTheme";
import {deriveDifficultyChipPalette} from "@/lib/color-utils";
import Chip from "@/components/shared/chip/Chip";

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
    const palette = deriveDifficultyChipPalette(data.color, isDark);
    const stampBg = isDark ? '#2a2c2e' : '#e8e8ea';
    const stampText = isDark ? '#c4c6c8' : '#3a3c3e';

    return (
        <Chip
            height={IIDX_CHIP_HEIGHT}
            border={palette.border}
            segments={[
                {
                    text: data.playStyle,
                    background: stampBg,
                    textColor: stampText,
                    textStyle: 'stamp',
                    paddingHorizontal: 6,
                },
                {text: data.name, background: palette.bg, textColor: palette.text},
                {
                    text: String(level).padStart(2, '0'),
                    background: data.color,
                    textColor: palette.accentText,
                    textStyle: 'mono',
                    paddingHorizontal: 7,
                },
            ]}
        />
    );
};

export default memo(IidxDifficultyItemInner);
