import {View} from "react-native";
import {Card} from "@/components/ui/card";
import {Text} from "@/components/ui/text";
import {Button} from "@/components/ui/button";

type ErrorScreenProps = {
    error: Error;
    onRetry?: () => void;
}

export default function ErrorScreen({error, onRetry}: ErrorScreenProps) {
    return (
        <View className="flex-1 justify-center items-center gap-2.5">
            <Card className="border-primary bg-primary-surface gap-0 rounded-none p-1.5 shadow-none">
                <Text className="text-base leading-6">{error.message}</Text>
            </Card>
            {onRetry ? (
                <Button className="h-10 px-2.5" onPress={onRetry}>
                    <Text className="font-bold">Retry</Text>
                </Button>
            ) : null}
        </View>
    )
}
