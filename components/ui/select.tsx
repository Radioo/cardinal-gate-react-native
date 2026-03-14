import * as SelectPrimitive from '@rn-primitives/select';
import {cn} from '@/lib/utils';
import {Platform, StyleSheet, View} from 'react-native';
import {ChevronDown, Check} from 'lucide-react-native';
import {Icon} from '@/components/ui/icon';
import {useThemeStore} from '@/store/theme';
import {useColorScheme} from '@/hooks/useColorScheme';
import {buildPrimaryColorVars} from '@/lib/color-utils';
import {useMemo} from 'react';
import {vars} from 'nativewind';

const Select = SelectPrimitive.Root;

function SelectTrigger({className, children, ...props}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>) {
    return (
        <SelectPrimitive.Trigger
            className={cn(
                'flex-row items-center justify-between px-3 py-2.5 bg-background',
                Platform.select({web: 'outline-none cursor-pointer'}),
                className,
            )}
            {...props}
        >
            {children as React.ReactNode}
            <Icon as={ChevronDown} className="text-foreground opacity-50" size={16}/>
        </SelectPrimitive.Trigger>
    );
}

function SelectValue({className, ...props}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Value>) {
    return (
        <SelectPrimitive.Value
            className={cn('text-base text-foreground', className)}
            {...props}
        />
    );
}

function useDynamicVars() {
    const {primaryColor} = useThemeStore();
    const isDark = useColorScheme() === 'dark';
    return useMemo(
        () => vars(buildPrimaryColorVars(primaryColor, isDark)),
        [primaryColor, isDark],
    );
}

function SelectContent({className, children, ...props}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>) {
    const dynamicVars = useDynamicVars();

    return (
        <SelectPrimitive.Portal>
            <SelectPrimitive.Overlay className="absolute bottom-0 left-0 right-0 top-0" style={styles.overlay}>
                <SelectPrimitive.Content
                    className={cn(
                        'bg-popover border-border border rounded-sm shadow-md',
                        Platform.select({web: 'animate-in fade-in-0 zoom-in-95'}),
                        className,
                    )}
                    style={dynamicVars}
                    position="popper"
                    sideOffset={4}
                    {...props}
                >
                    <SelectPrimitive.Viewport className="p-1">
                        {children}
                    </SelectPrimitive.Viewport>
                </SelectPrimitive.Content>
            </SelectPrimitive.Overlay>
        </SelectPrimitive.Portal>
    );
}

function SelectItem({className, children, ...props}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>) {
    return (
        <SelectPrimitive.Item
            className={cn(
                'group relative flex-row items-center pl-8 pr-2 py-2 rounded-sm',
                Platform.select({web: 'cursor-pointer outline-none data-[highlighted]:bg-primary data-[highlighted]:text-primary-foreground'}),
                className,
            )}
            {...props}
        >
            <View className="absolute left-2 top-0 bottom-0 items-center justify-center" style={{width: 20}}>
                <SelectPrimitive.ItemIndicator>
                    <Icon as={Check} className="text-popover-foreground group-data-[highlighted]:text-primary-foreground" size={14}/>
                </SelectPrimitive.ItemIndicator>
            </View>
            <SelectPrimitive.ItemText className="text-sm text-popover-foreground group-data-[highlighted]:text-primary-foreground"/>
        </SelectPrimitive.Item>
    );
}

const styles = StyleSheet.create({
    overlay: {
        backgroundColor: Platform.OS !== 'web' ? 'rgba(0,0,0,0.5)' : 'transparent',
    },
});

export {Select, SelectTrigger, SelectValue, SelectContent, SelectItem};
