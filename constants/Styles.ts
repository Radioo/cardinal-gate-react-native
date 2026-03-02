import {Platform, StyleProp, TextStyle} from "react-native";

export const tabBarLabelStyle: StyleProp<TextStyle> = Platform.OS === 'web'
    ? {lineHeight: 10, fontSize: 10}
    : {};
