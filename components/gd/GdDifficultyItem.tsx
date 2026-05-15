import {GdDifficultyContainer} from "@/types/gd-difficulty-container";
import {GdDifficulty} from "@/enums/gd-difficulty";
import {memo} from "react";
import useTheme from "@/hooks/useTheme";
import {lightenHex} from "@/lib/color-utils";
import {formatGdHundredthsValue} from "@/services/game";
import Chip from "@/components/shared/chip/Chip";

const DIFFICULTY_COLORS: Record<GdDifficulty, string> = {
    [GdDifficulty.BASIC]: '#427486',
    [GdDifficulty.ADVANCED]: '#705b38',
    [GdDifficulty.EXTREME]: '#a21e1e',
    [GdDifficulty.MASTER]: '#8f008f',
};

const TYPE_COLOR_DARK = '#4f4f4f';
const GD_CHIP_HEIGHT = 24;
const UNKNOWN_DIFFICULTY_COLOR = '#666666';

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
    const isLight = theme.scheme === 'light';
    // Wire-format runtime safety: API can ship unknown GD difficulty values.
    const baseColor = DIFFICULTY_COLORS[difficulty.difficulty] ?? UNKNOWN_DIFFICULTY_COLOR;
    const difficultyColor = isLight ? lightenHex(baseColor, 0.2) : baseColor;
    const typeColor = isLight ? lightenHex(TYPE_COLOR_DARK, 0.2) : TYPE_COLOR_DARK;

    return (
        <Chip
            height={GD_CHIP_HEIGHT}
            border="#000000"
            borderWidth={2}
            showDividers={false}
            segments={[
                {text: difficulty.type, background: typeColor, textColor: '#ffffff', textStyle: 'gd', paddingHorizontal: 4},
                {text: difficulty.difficulty, background: difficultyColor, textColor: '#ffffff', textStyle: 'gd', paddingHorizontal: 4},
                {text: formatGdHundredthsValue(difficulty.level), background: difficultyColor, textColor: '#ffffff', textStyle: 'gd', paddingHorizontal: 4},
            ]}
        />
    );
}

export default memo(GdDifficultyItemInner);
