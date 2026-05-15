import {SdvxClearType} from "@/enums/sdvx-clear-type";
import {StyleProp, ViewStyle} from "react-native";
import useTheme from "@/hooks/useTheme";
import {deriveClearTypeChipPalette} from "@/lib/color-utils";
import {SDVX_CHIP_HEIGHT} from "@/components/sdvx/SdvxDifficultyItem";
import SdvxPerfectUltimateChainItem from "@/components/sdvx/SdvxPerfectUltimateChainItem";
import Chip from "@/components/shared/Chip";

export const SDVX_CLEAR_TYPE_DATA: Record<SdvxClearType, { text: string; color: string }> = {
    [SdvxClearType.NO_PLAY]: {text: 'NO PLAY', color: '#7d7d7d'},
    [SdvxClearType.PLAYED]: {text: 'PLAYED', color: '#7d7d7d'},
    [SdvxClearType.COMPLETE]: {text: 'CLEAR', color: '#39c44d'},
    [SdvxClearType.EXCESSIVE_COMPLETE]: {text: 'EXC CLEAR', color: '#a040dc'},
    [SdvxClearType.MAXXIVE_COMPLETE]: {text: 'MAXXIVE', color: '#c0c0c0'},
    [SdvxClearType.ULTIMATE_CHAIN]: {text: 'ULT CHAIN', color: '#d33046'},
    [SdvxClearType.PERFECT_ULTIMATE_CHAIN]: {text: 'PUC', color: '#d4c500'},
};

type SdvxClearTypeItemProps = {
    clearType: SdvxClearType;
    style?: StyleProp<ViewStyle>;
}

export default function SdvxClearTypeItem({clearType, style}: SdvxClearTypeItemProps) {
    const theme = useTheme();

    if (clearType === SdvxClearType.PERFECT_ULTIMATE_CHAIN) {
        return <SdvxPerfectUltimateChainItem style={style}/>;
    }

    const data = SDVX_CLEAR_TYPE_DATA[clearType];
    const palette = deriveClearTypeChipPalette(data.color, theme.scheme === 'dark');

    return (
        <Chip
            height={SDVX_CHIP_HEIGHT}
            border={palette.border}
            segments={[{text: data.text, background: palette.bg, textColor: palette.text}]}
            style={style}
        />
    );
}
