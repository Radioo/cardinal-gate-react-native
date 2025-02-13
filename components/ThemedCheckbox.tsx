import {Checkbox, CheckboxProps} from "expo-checkbox";
import {useTheme} from "@/hooks/useTheme";

export default function ThemedCheckbox(props: CheckboxProps) {
    const theme = useTheme();

    return (
        <Checkbox style={{
            backgroundColor: theme.background,
            outlineColor: 'red'
        }}
                  color={theme.primary}
                  {...props}
        ></Checkbox>
    )
}
