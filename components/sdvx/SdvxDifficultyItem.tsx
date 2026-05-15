import {SdvxDifficulty} from "@/enums/sdvx-difficulty";
import useTheme from "@/hooks/useTheme";
import {deriveDifficultyChipPalette} from "@/lib/color-utils";
import {memo} from "react";
import Chip from "@/components/shared/chip/Chip";

type SdvxDifficultyProps = {
    difficulty: SdvxDifficulty;
    level: number;
}

export const SDVX_CHIP_HEIGHT = 22;

const UNKNOWN_DIFFICULTY_COLOR = "#666666";

const DIFFICULTY_COLORS: Record<SdvxDifficulty, string> = {
    [SdvxDifficulty.NOVICE]: "#8666be",
    [SdvxDifficulty.ADVANCED]: "#d4b500",
    [SdvxDifficulty.EXHAUST]: "#e23030",
    [SdvxDifficulty.INFINITE]: "#cc33cc",
    [SdvxDifficulty.GRAVITY]: "#f57c1c",
    [SdvxDifficulty.HEAVENLY]: "#31a0ff",
    [SdvxDifficulty.VIVID]: "#f0269e",
    [SdvxDifficulty.EXCEED]: "#3b71ff",
    [SdvxDifficulty.MAXIMUM]: "#99aacc",
};

const SdvxDifficultyItemInner = ({difficulty, level}: SdvxDifficultyProps) => {
    const theme = useTheme();
    // Wire-format runtime safety: API can ship new SDVX difficulty values we
    // haven't enumerated yet. Type says the Record is total; runtime can lie.
    const baseColor = DIFFICULTY_COLORS[difficulty] ?? UNKNOWN_DIFFICULTY_COLOR;
    const palette = deriveDifficultyChipPalette(baseColor, theme.scheme === "dark");

    return (
        <Chip
            height={SDVX_CHIP_HEIGHT}
            border={palette.border}
            segments={[
                {text: difficulty, background: palette.bg, textColor: palette.text},
                {
                    text: String(level).padStart(2, "0"),
                    background: baseColor,
                    textColor: palette.accentText,
                    textStyle: "mono",
                    paddingHorizontal: 7,
                },
            ]}
        />
    );
};

export default memo(SdvxDifficultyItemInner);
