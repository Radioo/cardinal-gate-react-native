import {useEffect, useRef} from 'react';
import {Animated, Pressable, View} from 'react-native';
import {CircleCheck, CircleX, X} from 'lucide-react-native';
import {cn} from '@/lib/utils';
import {Text} from '@/components/ui/text';
import {Icon} from '@/components/ui/icon';
import {MessageSeverity} from '@/enums/message-severity';

type ToastItemProps = {
    severity: MessageSeverity;
    title: string;
    description: string;
    onDismiss: () => void;
};

function ToastItem({severity, title, description, onDismiss}: ToastItemProps) {
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
                <Pressable onPress={onDismiss} hitSlop={8}>
                    <Icon as={X} className="text-muted-foreground" size={16} />
                </Pressable>
            </View>
        </Animated.View>
    );
}

export {ToastItem};
