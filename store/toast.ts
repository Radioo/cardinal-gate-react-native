import {create} from 'zustand';
import {MessageSeverity} from '@/enums/message-severity';

interface Toast {
    id: string;
    severity: MessageSeverity;
    title: string;
    description: string;
}

interface ToastStore {
    nextId: number;
    toasts: Toast[];
    addToast: (toast: Omit<Toast, 'id'>) => void;
    removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
    nextId: 0,
    toasts: [],
    addToast: (toast) => {
        set((state) => {
            const id = String(state.nextId);
            setTimeout(() => {
                set((s) => ({toasts: s.toasts.filter((t) => t.id !== id)}));
            }, 3000);
            return {
                nextId: state.nextId + 1,
                toasts: [...state.toasts, {...toast, id}],
            };
        });
    },
    removeToast: (id) =>
        set((state) => ({toasts: state.toasts.filter((t) => t.id !== id)})),
}));
