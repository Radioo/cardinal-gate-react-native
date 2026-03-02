import {IidxClearType} from "@/enums/iidx-clear-type";
import {StyleProp, View, ViewStyle} from "react-native";
import IidxFullComboClearTypeItem from "@/components/iidx/IidxFullComboClearTypeItem";
import ColorBadge from "@/components/themed/ColorBadge";

const CLEAR_TYPE_COLORS: Partial<Record<IidxClearType, string>> = {
    [IidxClearType.NO_PLAY]: '#3f3f3f',
    [IidxClearType.FAILED]: '#ff0000',
    [IidxClearType.ASSIST_CLEAR]: '#ff00ff',
    [IidxClearType.EASY_CLEAR]: '#00ff00',
    [IidxClearType.CLEAR]: '#00bbff',
    [IidxClearType.HARD_CLEAR]: '#b7b7b7',
    [IidxClearType.EX_HARD_CLEAR]: '#ffff00',
};

type IidxClearTypeProps = {
    clearType: IidxClearType;
    style?: StyleProp<ViewStyle>;
};

export default function IidxClearTypeItem({clearType, style}: IidxClearTypeProps) {
    if (clearType === IidxClearType.FULL_COMBO) {
        return (
            <View style={style}>
                <IidxFullComboClearTypeItem/>
            </View>
        );
    }

    return <ColorBadge text={clearType} color={CLEAR_TYPE_COLORS[clearType] ?? '#000000'} style={style}/>;
}
