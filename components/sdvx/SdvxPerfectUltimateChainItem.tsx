import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    interpolateColor,
    withRepeat,
} from "react-native-reanimated";
import React, {useEffect} from "react";
import {StyleProp, ViewStyle} from "react-native";
import {SDVX_CHIP_HEIGHT} from "@/components/sdvx/SdvxDifficultyItem";
import useTheme from "@/hooks/useTheme";

const LIGHT_BG = ['#fff4cc', '#ffe1d2', '#ecf6cf', '#fff4cc'];
const LIGHT_TEXT = ['#8c7700', '#b94f1f', '#467c1f', '#8c7700'];
const LIGHT_BORDER = ['#dbb840', '#e89366', '#9bb853', '#dbb840'];

const DARK_BG = ['#3a3015', '#3a2418', '#22341a', '#3a3015'];
const DARK_TEXT = ['#ffe27a', '#ffb280', '#bce283', '#ffe27a'];
const DARK_BORDER = ['#d4b542', '#e89466', '#7ec854', '#d4b542'];

type Props = {
    style?: StyleProp<ViewStyle>;
};

export default function SdvxPerfectUltimateChainItem({style}: Props) {
    const theme = useTheme();
    const isDark = theme.scheme === 'dark';
    const progress = useSharedValue(0);

    useEffect(() => {
        progress.value = withRepeat(withTiming(1, {duration: 2400}), -1);
    }, [progress]);

    const bgSet = isDark ? DARK_BG : LIGHT_BG;
    const textSet = isDark ? DARK_TEXT : LIGHT_TEXT;
    const borderSet = isDark ? DARK_BORDER : LIGHT_BORDER;

    const containerAnimated = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(progress.value, [0, 0.33, 0.66, 1], bgSet),
        borderColor: interpolateColor(progress.value, [0, 0.33, 0.66, 1], borderSet),
    }));

    const textAnimated = useAnimatedStyle(() => ({
        color: interpolateColor(progress.value, [0, 0.33, 0.66, 1], textSet),
    }));

    return (
        <Animated.View
            style={[
                {
                    flexDirection: 'row',
                    alignSelf: 'flex-start',
                    flexShrink: 0,
                    alignItems: 'center',
                    height: SDVX_CHIP_HEIGHT,
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
                PUC
            </Animated.Text>
        </Animated.View>
    );
}
