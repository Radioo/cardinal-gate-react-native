import {IidxClearType} from "@/enums/iidx-clear-type";
import {StyleProp, Text, View, ViewStyle} from "react-native";
import IidxFullComboClearTypeItem from "@/components/iidx/IidxFullComboClearTypeItem";
import {IIDX_CHIP_HEIGHT} from "@/components/iidx/IidxDifficultyItem";
import useTheme from "@/hooks/useTheme";
import {darkenHex, lightenHex} from "@/lib/color-utils";

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

    const base = IIDX_CLEAR_TYPE_COLORS[clearType] ?? '#000';
    const isDark = theme.scheme === 'dark';

    const bg = isDark ? darkenHex(0.30, base) : lightenHex(0.38, base);
    const text = isDark ? lightenHex(0.28, base) : darkenHex(0.22, base);
    const border = isDark ? lightenHex(0.05, base) : darkenHex(0.08, base);

    return (
        <View
            style={[
                {
                    flexDirection: 'row',
                    alignSelf: 'flex-start',
                    flexShrink: 0,
                    alignItems: 'center',
                    height: IIDX_CHIP_HEIGHT,
                    paddingHorizontal: 8,
                    backgroundColor: bg,
                    borderWidth: 1,
                    borderColor: border,
                    overflow: 'hidden',
                },
                style,
            ]}
        >
            <Text
                className="font-bold text-[10px]"
                style={{color: text, letterSpacing: 1.6, lineHeight: 12}}
                numberOfLines={1}
            >
                {clearType}
            </Text>
        </View>
    );
}
