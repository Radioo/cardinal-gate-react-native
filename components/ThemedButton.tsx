import {ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps} from "react-native";
import {useTheme} from "@/hooks/useTheme";

export type ThemedButtonProps = TouchableOpacityProps & {
    label: string;
    type?: 'primary';
    loading?: boolean;
}

export function ThemedButton({
    label,
    style,
    type = 'primary',
    loading = false,
    ...rest
}: ThemedButtonProps) {
    const theme = useTheme();

    return (
        <TouchableOpacity style={[
            {
                backgroundColor: theme[type],
                height: 40,
                paddingLeft: 10,
                paddingRight: 10,
                alignItems: 'center',
                justifyContent: 'center',
            },
            style,
        ]} disabled={loading} {...rest}>
            {loading ? (
                <ActivityIndicator color={theme.background} />
            ) : (
                <Text style={[{ color: theme.background, fontWeight: 'bold' }]}>{label}</Text>
            )}
        </TouchableOpacity>
    )
}
