import {IidxClearType} from "@/enums/iidx-clear-type";
import {StyleProp, ViewStyle} from "react-native";
import IidxFullComboClearTypeItem from "@/components/iidx/IidxFullComboClearTypeItem";
import {IIDX_CHIP_HEIGHT} from "@/components/iidx/IidxDifficultyItem";
import useTheme from "@/hooks/useTheme";
import {deriveClearTypeChipPalette} from "@/lib/color-utils";
import Chip from "@/components/shared/Chip";

export const IIDX_CLEAR_TYPE_COLORS: Record<IidxClearType, string> = {
    [IidxClearType.NO_PLAY]: '#7d7d7d',
    [IidxClearType.FAILED]: '#d63636',
    [IidxClearType.ASSIST_CLEAR]: '#c63bc6',
    [IidxClearType.EASY_CLEAR]: '#33b347',
    [IidxClearType.CLEAR]: '#2dafff',
    [IidxClearType.HARD_CLEAR]: '#9aa0a6',
    [IidxClearType.EX_HARD_CLEAR]: '#e0c020',
    [IidxClearType.FULL_COMBO]: '#a8c2ff',
};

type IidxClearTypeProps = {
    clearType: IidxClearType;
    style?: StyleProp<ViewStyle>;
};

export default function IidxClearTypeItem({clearType, style}: IidxClearTypeProps) {
    const theme = useTheme();

    if (clearType === IidxClearType.FULL_COMBO) {
        return <IidxFullComboClearTypeItem style={style}/>;
    }

    const base = IIDX_CLEAR_TYPE_COLORS[clearType];
    const palette = deriveClearTypeChipPalette(base, theme.scheme === 'dark');

    return (
        <Chip
            height={IIDX_CHIP_HEIGHT}
            border={palette.border}
            segments={[{text: clearType, background: palette.bg, textColor: palette.text}]}
            style={style}
        />
    );
}
