import {TextInput, TextInputProps} from "react-native";
import useTheme from "@/hooks/useTheme";

export default function ThemedTextInput({
    style,
    ...rest
}: TextInputProps) {
    const theme = useTheme();

    return (
        <TextInput style={[
            style,
            {
                color: theme.text,
                borderColor: theme.primary,
                borderWidth: 1,
                padding: 10,
            }
        ]} placeholderTextColor={theme.text} {...rest}/>
    )
}
