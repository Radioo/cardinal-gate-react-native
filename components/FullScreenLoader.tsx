import {ActivityIndicator, StyleSheet, View} from "react-native";
import {useThemeColor} from "@/hooks/useThemeColor";

export default function FullScreenLoader() {
    const color = useThemeColor({}, 'primary');

    return (
        <View style={styles.container}>
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
