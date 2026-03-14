import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Portal} from '@rn-primitives/portal';
import {ToastItem} from '@/components/ui/toast';
import {useToastStore} from '@/store/toast';

export default function Toaster() {
    const toasts = useToastStore((s) => s.toasts);
    const removeToast = useToastStore((s) => s.removeToast);
    const insets = useSafeAreaInsets();

    if (toasts.length === 0) return null;

    return (
        <Portal name="toaster">
            <View
                style={{top: insets.top + 8}}
                className="absolute left-4 right-4 z-50 gap-2"
                pointerEvents="box-none"
            >
                {toasts.map((toast) => (
                    <ToastItem
                        key={toast.id}
                        severity={toast.severity}
                        title={toast.title}
                        description={toast.description}
                        onDismiss={() => removeToast(toast.id)}
                    />
                ))}
            </View>
        </Portal>
    );
}

