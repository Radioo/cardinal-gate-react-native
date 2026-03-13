import {View} from "react-native";
import ThemedCard from "@/components/themed/ThemedCard";
import ThemedText from "@/components/themed/ThemedText";
import ThemedButton from "@/components/themed/ThemedButton";

type ErrorScreenProps = {
    error: Error;
    onRetry?: () => void;
}

export default function ErrorScreen({error, onRetry}: ErrorScreenProps) {
    return (
        <View className="flex-1 justify-center items-center gap-2.5">
            <ThemedCard>
                <ThemedText>{error.message}</ThemedText>
            </ThemedCard>
            {onRetry ? <ThemedButton label="Retry" onPress={onRetry}></ThemedButton> : null}
        </View>
    )
}
