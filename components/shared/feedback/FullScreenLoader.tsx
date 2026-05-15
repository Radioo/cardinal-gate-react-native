import {ActivityIndicator, StyleProp, View, ViewStyle} from "react-native";
import useTheme from "@/hooks/useTheme";

interface FullScreenLoaderProps {
    style?: StyleProp<ViewStyle>;
}

export default function FullScreenLoader({
    style
}: FullScreenLoaderProps) {
    const theme = useTheme();

    return (
        <View className="flex-1 justify-center items-center" style={style}>
            <ActivityIndicator color={theme.primary} size="large"></ActivityIndicator>
        </View>
    )
}
