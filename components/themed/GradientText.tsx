import MaskedView from "@react-native-masked-view/masked-view";
import { StyleProp, Text, TextStyle, Platform, type TextProps } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as React from "react";

type GradientTextProps = {
    colors: readonly [string, string, ...string[]];
    style?: StyleProp<TextStyle>;
    className?: string;
    start?: { x: number; y: number };
    end?: { x: number; y: number };
    children: React.ReactNode;
    backgroundColor?: string;
};

export default function GradientText({colors, style, className, start, end, children, backgroundColor}: GradientTextProps) {
    if (Platform.OS === "web") {
        const gradientString = `linear-gradient(to bottom, ${colors.join(", ")})`;

        return (
            <Text
                className={className}
                style={[
                    style,
                    {
                        backgroundImage: gradientString,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundColor,
                    } as TextProps['style'],
                ]}
            >
                {children}
            </Text>
        );
    }

    return (
        <MaskedView
            maskElement={
                <Text className={className} style={[style, { backgroundColor: "transparent" }]}>
                    {children}
                </Text>
            }
        >
            <LinearGradient
                colors={colors}
                start={start ?? { x: 0, y: 0 }}
                end={end ?? { x: 1, y: 0 }}
            >
                <Text className={className} style={[style, { opacity: 0 }]}>{children}</Text>
            </LinearGradient>
        </MaskedView>
    );
}
