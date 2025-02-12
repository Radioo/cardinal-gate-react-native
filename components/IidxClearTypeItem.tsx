import { IidxClearType } from "@/enums/iidx-clear-type";
import { darken } from "polished";
import React from "react";
import {Text, View, ViewStyle} from "react-native";
import IidxFullComboClearTypeItem from "@/components/IidxFullComboClearTypeItem";
import {StyleProp} from "react-native/Libraries/StyleSheet/StyleSheet";

export type IidxClearTypeProps = {
    clearType: IidxClearType;
    style?: StyleProp<ViewStyle>;
};
export default function IidxClearTypeItem({ clearType, style }: IidxClearTypeProps) {
    if (clearType === IidxClearType.FULL_COMBO) {
        return (
            <View style={style}>
                <IidxFullComboClearTypeItem />
            </View>
        );
    }

    const getColor = (clearType: IidxClearType) => {
        switch (clearType) {
            case IidxClearType.NO_PLAY:
                return "#3f3f3f";
            case IidxClearType.FAILED:
                return "#ff0000";
            case IidxClearType.ASSIST_CLEAR:
                return "#ff00ff";
            case IidxClearType.EASY_CLEAR:
                return "#00ff00";
            case IidxClearType.CLEAR:
                return "#00bbff";
            case IidxClearType.HARD_CLEAR:
                return "#b7b7b7";
            case IidxClearType.EX_HARD_CLEAR:
                return "#ffff00";
            default:
                return "#000000";
        }
    };

    const color = getColor(clearType);

    return (
        <View style={style}>
            <Text
                style={{
                    backgroundColor: darken(0.3, color),
                    borderWidth: 2,
                    borderColor: color,
                    padding: 2,
                    fontWeight: "bold",
                    color: "white",
                    textAlign: 'center'
                }}
                numberOfLines={1}
            >
                {clearType}
            </Text>
        </View>
    );
}
