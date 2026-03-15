import {StyleProp, Text, View, ViewStyle} from "react-native";
import useTheme from "@/hooks/useTheme";
import {darkenHex, lightenHex} from "@/lib/color-utils";

type ColorBadgeProps = {
    text: string;
    color: string;
    style?: StyleProp<ViewStyle>;
}

export default function ColorBadge({text, color, style}: ColorBadgeProps) {
    const theme = useTheme();

    const backgroundColor = theme.scheme === 'dark'
        ? darkenHex(0.2, color)
        : lightenHex(0.25, color);
    const borderColor = theme.scheme === 'dark'
        ? lightenHex(0.2, color)
        : darkenHex(0.25, color);

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
