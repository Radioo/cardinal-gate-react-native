import {Platform, StyleSheet, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {useThemeStore} from "@/store/theme";
import {useColorScheme as useSystemColorScheme} from "react-native";

function hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

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
                    } as any,
                ]}
            />
        );
    }

    // Native: simulate radial with two overlapping linear gradients
    return (
        <>
            <LinearGradient
                colors={[
                    hexToRgba(primaryColor, opacity),
                    hexToRgba(primaryColor, opacity * 0.3),
                    'transparent',
                ]}
                locations={[0, 0.3, 0.7]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.gradient}
            />
            <LinearGradient
                colors={[
                    hexToRgba(primaryColor, opacity),
                    hexToRgba(primaryColor, opacity * 0.3),
                    'transparent',
                ]}
                locations={[0, 0.3, 0.7]}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}
                style={styles.gradient}
            />
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
