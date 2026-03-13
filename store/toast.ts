import {create} from 'zustand';
import {MessageSeverity} from '@/enums/message-severity';

interface Toast {
    id: string;
    severity: MessageSeverity;
    title: string;
    description: string;
}

interface ToastStore {
    toasts: Toast[];
    addToast: (toast: Omit<Toast, 'id'>) => void;
    removeToast: (id: string) => void;
}

let nextId = 0;

export const useToastStore = create<ToastStore>((set) => ({
    toasts: [],
    addToast: (toast) => {
        const id = String(nextId++);
        set((state) => ({toasts: [...state.toasts, {...toast, id}]}));
        setTimeout(() => {
            set((state) => ({toasts: state.toasts.filter((t) => t.id !== id)}));
        }, 3000);
    },
    removeToast: (id) =>
        set((state) => ({toasts: state.toasts.filter((t) => t.id !== id)})),
}));
