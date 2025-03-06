import {ActivityIndicator, StyleProp, StyleSheet, View, ViewStyle} from "react-native";
import {useTheme} from "@/hooks/useTheme";

interface FullScreenLoaderProps {
    style?: StyleProp<ViewStyle>;
}

export default function FullScreenLoader({
    style
}: FullScreenLoaderProps) {
    const theme = useTheme();

    return (
        <View style={[styles.container, style]}>
            <ActivityIndicator color={theme.primary} size="large"></ActivityIndicator>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
