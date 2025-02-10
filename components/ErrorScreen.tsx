import {View} from "react-native";
import ThemedCard from "@/components/ThemedCard";
import {ThemedText} from "@/components/ThemedText";
import {ThemedButton} from "@/components/ThemedButton";

type ErrorScreenProps = {
    error: Error;
    onRetry?: () => void;
}

export default function ErrorScreen({error, onRetry}: ErrorScreenProps) {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10}}>
            <ThemedCard>
                <ThemedText>{error.message}</ThemedText>
            </ThemedCard>
            {onRetry ? <ThemedButton label="Retry" onPress={onRetry}></ThemedButton> : null}
        </View>
    )
}
