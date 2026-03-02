import {StyleProp, StyleSheet, Text, View, ViewStyle} from "react-native";
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
        <View style={[styles.container, style]}>
            <Text
                style={[styles.text, {color: theme.text, backgroundColor, borderColor}]}
                numberOfLines={1}
            >
                {text}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {alignSelf: 'flex-start'},
    text: {borderWidth: 2, paddingHorizontal: 5, fontWeight: 'bold', textAlign: 'center'},
});
