import * as DialogPrimitive from '@rn-primitives/dialog';
import {cn} from '@/lib/utils';
import {Platform, View, type ViewProps} from 'react-native';

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

function DialogOverlay({className, ...props}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>) {
    return (
        <DialogPrimitive.Overlay
            className={cn(
                'absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-black/50 p-2',
                Platform.OS === 'web' && 'animate-in fade-in-0 backdrop-blur-sm',
                className
            )}
            {...props}
        />
    );
}

function DialogContent({className, ...props}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>) {
    return (
        <DialogPortal>
            <DialogOverlay>
                <DialogPrimitive.Content
                    aria-describedby={undefined}
                    className={cn(
                        'web:animate-in web:fade-in-0 web:zoom-in-95',
                        className
                    )}
                    {...props}
                >
                    <DialogPrimitive.Title style={{position: 'absolute', width: 1, height: 1, overflow: 'hidden'}} />
                    {props.children}
                </DialogPrimitive.Content>
            </DialogOverlay>
        </DialogPortal>
    );
}

function DialogHeader({className, ...props}: ViewProps & React.RefAttributes<View>) {
    return <View className={cn('flex flex-col gap-1.5', className)} {...props} />;
}

function DialogFooter({className, ...props}: ViewProps & React.RefAttributes<View>) {
    return <View className={cn('flex flex-row gap-2.5', className)} {...props} />;
}

function DialogTitle({className, ...props}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>) {
    return (
        <DialogPrimitive.Title
            className={cn('text-lg font-semibold text-foreground', className)}
            {...props}
        />
    );
}

function DialogDescription({className, ...props}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>) {
    return (
        <DialogPrimitive.Description
            className={cn('text-sm text-muted-foreground', className)}
            {...props}
        />
    );
}

export {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
    DialogTrigger,
};
