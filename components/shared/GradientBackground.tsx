import {Platform, StyleSheet, View, ViewStyle} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {useThemeStore} from "@/store/theme";
import {useColorScheme as useSystemColorScheme} from "react-native";
import {hexToRgba} from "@/lib/color-utils";

type WebViewStyle = ViewStyle & { backgroundImage?: string };

const GRADIENT_LOCATIONS: [number, number, number] = [0, 0.3, 0.7];
const GRADIENT_DIRECTIONS = [
    {start: {x: 0, y: 0}, end: {x: 1, y: 0}},
    {start: {x: 0, y: 0}, end: {x: 0, y: 1}},
] as const;

export default function GradientBackground() {
    const {primaryColor} = useThemeStore();
    const colorScheme = useSystemColorScheme();
    const isDark = colorScheme === 'dark';

    const opacity = isDark ? 0.12 : 0.08;

    if (Platform.OS === 'web') {
        return (
            <View
                style={[
                    styles.gradient,
                    {
                        backgroundImage: `radial-gradient(ellipse at top left, ${hexToRgba(primaryColor, opacity)} 0%, transparent 60%)`,
                    } as WebViewStyle,
                ]}
            />
        );
    }

    const gradientColors = [
        hexToRgba(primaryColor, opacity),
        hexToRgba(primaryColor, opacity * 0.3),
        'transparent',
    ] as const;

    return (
        <>
            {GRADIENT_DIRECTIONS.map((dir, i) => (
                <LinearGradient
                    key={i}
                    colors={[...gradientColors]}
                    locations={GRADIENT_LOCATIONS}
                    start={dir.start}
                    end={dir.end}
                    style={styles.gradient}
                />
            ))}
        </>
    );
}

const styles = StyleSheet.create({
    gradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});
