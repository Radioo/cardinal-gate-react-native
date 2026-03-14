import {MessageSeverity} from "@/enums/message-severity";
import {useToastStore} from "@/store/toast";
import * as Haptics from 'expo-haptics';

function getTitle(severity: MessageSeverity) {
    switch (severity) {
        case MessageSeverity.ERROR:
            return 'Error';
        case MessageSeverity.SUCCESS:
            return 'Success';
        default:
            return 'Info';
    }
}

export function displayMessage(severity: MessageSeverity, message: string) {
    useToastStore.getState().addToast({
        severity,
        title: getTitle(severity),
        description: message,
    });
    Haptics.notificationAsync(severity === MessageSeverity.SUCCESS ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Error);
}
