import {StyleProp, Text, View, ViewStyle} from "react-native";
import {darken, lighten} from "polished";
import useTheme from "@/hooks/useTheme";

type ColorBadgeProps = {
    text: string;
    color: string;
    style?: StyleProp<ViewStyle>;
}

export default function ColorBadge({text, color, style}: ColorBadgeProps) {
    const theme = useTheme();

    const backgroundColor = theme.scheme === 'dark'
        ? darken(0.2, color)
        : lighten(0.25, color);
    const borderColor = theme.scheme === 'dark'
        ? lighten(0.2, color)
        : darken(0.25, color);

    return (
        <View className="self-start" style={style}>
            <Text
                className="border-2 px-[5px] font-bold text-center"
                style={{color: theme.text, backgroundColor, borderColor}}
                numberOfLines={1}
            >
                {text}
            </Text>
        </View>
    );
}
