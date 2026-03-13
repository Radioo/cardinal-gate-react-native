import {MessageSeverity} from "@/enums/message-severity";
import {useToastStore} from "@/store/toast";

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

export const displayMessage = (severity: MessageSeverity, message: string) => {
    useToastStore.getState().addToast({
        severity,
        title: getTitle(severity),
        description: message,
    });
}
