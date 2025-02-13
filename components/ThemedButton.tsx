import {ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps} from "react-native";
import {useTheme} from "@/hooks/useTheme";
import {darken} from "polished";
import React from "react";

export type ThemedButtonProps = TouchableOpacityProps & {
    label?: string;
    type?: 'primary';
    loading?: boolean;
    icon?: React.ReactNode;
}

export function ThemedButton({
    label,
    style,
    type = 'primary',
    loading = false,
    disabled = undefined,
    icon = undefined,
    ...rest
}: ThemedButtonProps) {
    const theme = useTheme();
    const backgroundColor = disabled || loading ? darken(0.3, theme[type]) : theme[type];

    return (
        <TouchableOpacity style={[
            {
                backgroundColor: backgroundColor,
                height: 40,
                paddingLeft: 10,
                paddingRight: 10,
                alignItems: 'center',
                justifyContent: 'center',
            },
            style,
        ]} disabled={loading || disabled} {...rest}>
            {loading ? (
                <ActivityIndicator color={theme.background} />
            ) : (
                icon ? icon : <Text style={[{ color: theme.background, fontWeight: 'bold' }]}>{label}</Text>
            )}
        </TouchableOpacity>
    )
}
