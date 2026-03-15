import {MessageSeverity} from "@/enums/message-severity";
import * as Haptics from 'expo-haptics';

type AddToastFn = (toast: { severity: MessageSeverity; title: string; description: string }) => void;

const titles: Record<MessageSeverity, string> = {
    [MessageSeverity.ERROR]: 'Error',
    [MessageSeverity.SUCCESS]: 'Success',
};

const hapticTypes: Record<MessageSeverity, Haptics.NotificationFeedbackType> = {
    [MessageSeverity.SUCCESS]: Haptics.NotificationFeedbackType.Success,
    [MessageSeverity.ERROR]: Haptics.NotificationFeedbackType.Error,
};

let _addToast: AddToastFn | null = null;

/**
 * Register the toast store's addToast function. Called once from the app layout
 * so this module never imports from store/ directly.
 */
export function registerToastHandler(addToast: AddToastFn) {
    _addToast = addToast;
}

/**
 * Display a toast notification. No-op until {@link registerToastHandler} is called
 * (typically by the root layout on mount).
 */
export function displayMessage(severity: MessageSeverity, message: string) {
    if (!_addToast) return;
    _addToast({
        severity,
        title: titles[severity],
        description: message,
    });
    void Haptics.notificationAsync(hapticTypes[severity]).catch(() => {});
}
