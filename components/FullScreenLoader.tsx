import {ActivityIndicator, StyleProp, StyleSheet, View, ViewStyle} from "react-native";
import {useThemeColor} from "@/hooks/useThemeColor";

interface FullScreenLoaderProps {
    style?: StyleProp<ViewStyle>;
}

export default function FullScreenLoader({
    style
}: FullScreenLoaderProps) {
    const color = useThemeColor({}, 'primary');

    return (
        <View style={[styles.container, style]}>
            <ActivityIndicator color={color} size="large"></ActivityIndicator>
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
