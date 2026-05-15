import {IidxClearType} from "@/enums/iidx-clear-type";
import {StyleProp, ViewStyle} from "react-native";
import IidxFullComboClearTypeItem from "@/components/iidx/IidxFullComboClearTypeItem";
import {IIDX_CHIP_HEIGHT} from "@/components/iidx/IidxDifficultyItem";
import useTheme from "@/hooks/useTheme";
import {deriveClearTypeChipPalette} from "@/lib/color-utils";
import Chip from "@/components/shared/chip/Chip";

export const IIDX_CLEAR_TYPE_DATA: Record<IidxClearType, {text: string; color: string}> = {
    [IidxClearType.NO_PLAY]: {text: IidxClearType.NO_PLAY, color: '#7d7d7d'},
    [IidxClearType.FAILED]: {text: IidxClearType.FAILED, color: '#d63636'},
    [IidxClearType.ASSIST_CLEAR]: {text: IidxClearType.ASSIST_CLEAR, color: '#c63bc6'},
    [IidxClearType.EASY_CLEAR]: {text: IidxClearType.EASY_CLEAR, color: '#33b347'},
    [IidxClearType.CLEAR]: {text: IidxClearType.CLEAR, color: '#2dafff'},
    [IidxClearType.HARD_CLEAR]: {text: IidxClearType.HARD_CLEAR, color: '#9aa0a6'},
    [IidxClearType.EX_HARD_CLEAR]: {text: IidxClearType.EX_HARD_CLEAR, color: '#e0c020'},
    [IidxClearType.FULL_COMBO]: {text: IidxClearType.FULL_COMBO, color: '#a8c2ff'},
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

    const data = IIDX_CLEAR_TYPE_DATA[clearType];
    const palette = deriveClearTypeChipPalette(data.color, theme.scheme === 'dark');

    return (
        <Chip
            height={IIDX_CHIP_HEIGHT}
            border={palette.border}
            segments={[{text: data.text, background: palette.bg, textColor: palette.text}]}
            style={style}
        />
    );
}
