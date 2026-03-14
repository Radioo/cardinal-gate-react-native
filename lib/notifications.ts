import {MessageSeverity} from "@/enums/message-severity";
import {useToastStore} from "@/store/toast";
import * as Haptics from 'expo-haptics';

const titles: Record<MessageSeverity, string> = {
    [MessageSeverity.ERROR]: 'Error',
    [MessageSeverity.SUCCESS]: 'Success',
};

const hapticTypes: Record<MessageSeverity, Haptics.NotificationFeedbackType> = {
    [MessageSeverity.SUCCESS]: Haptics.NotificationFeedbackType.Success,
    [MessageSeverity.ERROR]: Haptics.NotificationFeedbackType.Error,
};

export function displayMessage(severity: MessageSeverity, message: string) {
    useToastStore.getState().addToast({
        severity,
        title: titles[severity],
        description: message,
    });
    Haptics.notificationAsync(hapticTypes[severity]);
}
