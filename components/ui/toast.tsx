import {useEffect, useRef} from 'react';
import {Animated, Pressable, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CircleCheck, CircleX, X} from 'lucide-react-native';
import {Portal} from '@rn-primitives/portal';
import {cn} from '@/lib/utils';
import {Text} from '@/components/ui/text';
import {Icon} from '@/components/ui/icon';
import {MessageSeverity} from '@/enums/message-severity';
import {useToastStore} from '@/store/toast';

function ToastItem({id, severity, title, description}: {
    id: string;
    severity: MessageSeverity;
    title: string;
    description: string;
}) {
    const removeToast = useToastStore((s) => s.removeToast);
    const translateY = useRef(new Animated.Value(-100)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.spring(translateY, {toValue: 0, useNativeDriver: true}),
            Animated.timing(opacity, {toValue: 1, duration: 200, useNativeDriver: true}),
        ]).start();
    }, [translateY, opacity]);

    const isError = severity === MessageSeverity.ERROR;

    return (
        <Animated.View style={{transform: [{translateY}], opacity}}>
            <View
                className={cn(
                    'flex-row items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 shadow-lg',
                    isError && 'border-destructive/50',
                )}
            >
                <Icon
                    as={isError ? CircleX : CircleCheck}
                    className={isError ? 'text-destructive' : 'text-primary'}
                    size={20}
                />
                <View className="flex-1 gap-0.5">
                    <Text className="text-sm font-semibold">{title}</Text>
                    <Text className="text-sm text-muted-foreground">{description}</Text>
                </View>
                <Pressable onPress={() => removeToast(id)} hitSlop={8}>
                    <Icon as={X} className="text-muted-foreground" size={16} />
                </Pressable>
            </View>
        </Animated.View>
    );
}

export function Toaster() {
    const toasts = useToastStore((s) => s.toasts);
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
                    <ToastItem key={toast.id} {...toast} />
                ))}
            </View>
        </Portal>
    );
}
