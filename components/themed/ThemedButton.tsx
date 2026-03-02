import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps} from "react-native";
import useTheme from "@/hooks/useTheme";
import {darken} from "polished";
import React from "react";

type ThemedButtonProps = TouchableOpacityProps & {
    label?: string;
    loading?: boolean;
    icon?: React.ReactNode;
}

export default function ThemedButton({
    label,
    style,
    loading = false,
    disabled = undefined,
    icon = undefined,
    ...rest
}: ThemedButtonProps) {
    const theme = useTheme();
    const backgroundColor = disabled || loading ? darken(0.3, theme.primary) : theme.primary;

    return (
        <TouchableOpacity style={[
            styles.button,
            {backgroundColor},
            style,
        ]} disabled={loading || disabled} {...rest}>
            {loading ? (
                <ActivityIndicator color={theme.background} />
            ) : (
                icon ? icon : <Text style={[styles.label, {color: theme.background}]}>{label}</Text>
            )}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {height: 40, paddingHorizontal: 10, alignItems: 'center', justifyContent: 'center'},
    label: {fontWeight: 'bold'},
});
