import {forwardRef} from "react";
import {TextInput, type TextInputProps} from "react-native";
import {Input} from "@/components/ui/input";
import {cn} from "@/lib/utils";

type ThemedTextInputProps = TextInputProps & {
    className?: string;
};

const ThemedTextInput = forwardRef<TextInput, ThemedTextInputProps>(({
    style,
    className,
    ...rest
}, ref) => {
    return (
        <Input
            ref={ref}
            className={cn("border-primary", className)}
            style={style}
            {...rest}
        />
    );
});

export default ThemedTextInput;
