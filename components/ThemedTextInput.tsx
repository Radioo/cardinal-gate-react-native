import {TextInput, TextInputProps} from "react-native";
import {useThemeColor} from "@/hooks/useThemeColor";

export type ThemedTextInputProps = TextInputProps & {
}

export function ThemedTextInput({
    style,
    ...rest
}: ThemedTextInputProps) {
    const textColor = useThemeColor({}, 'text');
    const primaryColor = useThemeColor({}, 'primary');

    return (
        <TextInput style={[
            style,
            {
                color: textColor,
                borderColor: primaryColor,
                borderWidth: 1,
                padding: 10,
            }
        ]} placeholderTextColor={textColor} {...rest}/>
    )
}
