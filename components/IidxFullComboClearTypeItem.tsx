import {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    interpolateColor, withRepeat,
} from "react-native-reanimated";
import React, { useEffect } from "react";
import Animated from "react-native-reanimated";
import {Text} from "react-native";
import {IidxClearType} from "@/enums/iidx-clear-type";

export default function IidxFullComboClearTypeItem() {
    const progress = useSharedValue(0);

    useEffect(() => {
        progress.value = withRepeat(
            withTiming(1, { duration: 1000 }),
            -1,
        );
    }, [progress]);

    const animatedBackground = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(progress.value, [0, 0.33, 0.66, 1], [
                "#163667",
                "#6c284d",
                "#4e6b5c",
                "#163667",
            ]),
            borderColor: interpolateColor(progress.value, [0, 0.33, 0.66, 1], [
                "#3274dc",
                "#d04b95",
                "#8fc5aa",
                "#3274dc",
            ]),
        };
    });

    return (
        <Animated.View style={[animatedBackground, {borderWidth: 2}]}>
            <Text style={{
                fontWeight: 'bold',
                color: 'white',
                padding: 2,
                textAlign: 'center',
            }}
                  numberOfLines={1}
            >
                {IidxClearType.FULL_COMBO}
            </Text>
        </Animated.View>
    );
}
