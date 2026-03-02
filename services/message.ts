import {MessageSeverity} from "@/enums/message-severity";
import {Notifier, NotifierComponents} from "react-native-notifier";

const getTitle = (severity: MessageSeverity) => {
    switch (severity) {
        case MessageSeverity.ERROR:
            return 'Error';
        case MessageSeverity.SUCCESS:
            return 'Success';
        default:
            return 'Info';
    }
}

const getAlertType = (severity: MessageSeverity) => {
    switch (severity) {
        case MessageSeverity.ERROR:
            return 'error';
        case MessageSeverity.SUCCESS:
            return 'success';
        default:
            return 'info';
    }
}

export const displayMessage = (severity: MessageSeverity, message: string) => {
    Notifier.showNotification({
        title: getTitle(severity),
        description: message,
        Component: NotifierComponents.Alert,
        componentProps: {
            alertType: getAlertType(severity),
        },
    });
}
