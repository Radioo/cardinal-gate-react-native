import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    interpolateColor,
    withRepeat,
} from "react-native-reanimated";
import React, {useEffect} from "react";
import {StyleProp, ViewStyle} from "react-native";
import {cssInterop} from "nativewind";
import useTheme from "@/hooks/useTheme";

// Reanimated's Animated.Text wraps RN Text but isn't registered with
// NativeWind by default, so className is silently dropped on it. Register
// once at module load so `font-bold text-[10px]` applies the same way it
// does to the plain <Text> used by the static Chip primitive.
cssInterop(Animated.Text, {className: 'style'});

export type AnimatedChipPalette = {
    bg: string[];
    text: string[];
    border: string[];
};

type AnimatedClearChipProps = {
    label: string;
    height: number;
    light: AnimatedChipPalette;
    dark: AnimatedChipPalette;
    style?: StyleProp<ViewStyle>;
};

const ANIMATION_DURATION_MS = 2400;

/**
 * Looping color-cycling chip used for game-specific special clear types
 * (IIDX FULL COMBO, SDVX PERFECT ULTIMATE CHAIN). The chip cycles through
 * four palette stops; each stop's index aligns across bg/text/border so the
 * three colors animate in sync.
 */
export default function AnimatedClearChip({label, height, light, dark, style}: AnimatedClearChipProps) {
    const theme = useTheme();
    const palette = theme.scheme === 'dark' ? dark : light;
    const progress = useSharedValue(0);

    useEffect(() => {
        progress.value = withRepeat(withTiming(1, {duration: ANIMATION_DURATION_MS}), -1);
    }, [progress]);

    const stops = [0, 0.33, 0.66, 1];

    const containerAnimated = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(progress.value, stops, palette.bg),
        borderColor: interpolateColor(progress.value, stops, palette.border),
    }));

    const textAnimated = useAnimatedStyle(() => ({
        color: interpolateColor(progress.value, stops, palette.text),
    }));

    return (
        <Animated.View
            style={[
                {
                    flexDirection: 'row',
                    alignSelf: 'flex-start',
                    flexShrink: 0,
                    alignItems: 'center',
                    height,
                    paddingHorizontal: 8,
                    borderWidth: 1,
                    overflow: 'hidden',
                },
                containerAnimated,
                style,
            ]}
        >
            <Animated.Text
                className="font-bold text-[10px]"
                style={[{letterSpacing: 1.6, lineHeight: 12}, textAnimated]}
                numberOfLines={1}
            >
                {label}
            </Animated.Text>
        </Animated.View>
    );
}
