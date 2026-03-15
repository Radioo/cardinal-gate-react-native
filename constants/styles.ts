import {Platform, StyleProp, TextStyle} from "react-native";

export const TAB_BAR_LABEL_STYLE: StyleProp<TextStyle> = Platform.OS === 'web'
    ? {lineHeight: 10, fontSize: 10}
    : {};
