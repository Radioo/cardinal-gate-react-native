import * as DialogPrimitive from '@rn-primitives/dialog';
import {cn} from '@/lib/utils';
import {Platform} from 'react-native';

const Dialog = DialogPrimitive.Root;

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
        <DialogPrimitive.Portal>
            <DialogOverlay>
                <DialogPrimitive.Content
                    aria-describedby={undefined}
                    className={cn(
                        'web:animate-in web:fade-in-0 web:zoom-in-95',
                        'w-full max-w-[500px]',
                        className
                    )}
                    {...props}
                >
                    <DialogPrimitive.Title style={{position: 'absolute', width: 1, height: 1, overflow: 'hidden'}} />
                    {props.children}
                </DialogPrimitive.Content>
            </DialogOverlay>
        </DialogPrimitive.Portal>
    );
}

export {
    Dialog,
    DialogContent,
};
