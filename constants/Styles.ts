import {Platform, StyleProp, TextStyle} from "react-native";

export const tabBarLabelStyle = () => {
    const tabBarLabelStyle: StyleProp<TextStyle> = {};
    if(Platform.OS === 'web') {
        tabBarLabelStyle.lineHeight = 10;
        tabBarLabelStyle.fontSize = 10;
    }

    return tabBarLabelStyle;
}
