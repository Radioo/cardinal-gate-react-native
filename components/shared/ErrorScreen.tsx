import {StyleSheet, View} from "react-native";
import ThemedCard from "@/components/themed/ThemedCard";
import ThemedText from "@/components/themed/ThemedText";
import ThemedButton from "@/components/themed/ThemedButton";

type ErrorScreenProps = {
    error: Error;
    onRetry?: () => void;
}

export default function ErrorScreen({error, onRetry}: ErrorScreenProps) {
    return (
        <View style={styles.container}>
            <ThemedCard>
                <ThemedText>{error.message}</ThemedText>
            </ThemedCard>
            {onRetry ? <ThemedButton label="Retry" onPress={onRetry}></ThemedButton> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10},
});
