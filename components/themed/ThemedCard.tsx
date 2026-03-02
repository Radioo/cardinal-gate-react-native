import {StyleProp, StyleSheet, View, ViewStyle} from "react-native";
import React from "react";
import useTheme from "@/hooks/useTheme";

interface ThemedCardProps {
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}

export default function ThemedCard({children, style}: ThemedCardProps) {
    const theme = useTheme();

    return (
        <View style={[
            styles.container,
            {
                borderColor: theme.primary,
                backgroundColor: theme.primarySurface,
            },
            style
        ]}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        padding: 5,
    }
});
