import {type StyleProp, type TextStyle, View} from "react-native";
import {Button, type ButtonProps} from "@/components/ui/button";
import {Text} from "@/components/ui/text";
import React from "react";
import {cn} from "@/lib/utils";

type ThemedButtonProps = ButtonProps & {
    label?: string;
    loading?: boolean;
    icon?: React.ReactNode;
    labelStyle?: StyleProp<TextStyle>;
}

export default function ThemedButton({
    label,
    loading = false,
    disabled,
    icon,
    className,
    labelStyle,
    ...rest
}: ThemedButtonProps) {
    return (
        <Button
            className={cn("h-10 px-2.5", className)}
            disabled={loading || disabled}
            {...rest}
        >
            {loading ? (
                <View className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : icon ? (
                icon
            ) : (
                <Text className="font-bold" style={labelStyle}>{label}</Text>
            )}
        </Button>
    );
}
