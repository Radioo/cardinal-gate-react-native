import {Checkbox} from "@/components/ui/checkbox";
import {StyleProp, ViewStyle} from "react-native";

type ThemedCheckboxProps = {
    value: boolean;
    onValueChange: (value: boolean) => void;
    style?: StyleProp<ViewStyle>;
};

export default function ThemedCheckbox({value, onValueChange, style}: ThemedCheckboxProps) {
    return (
        <Checkbox
            checked={value}
            onCheckedChange={onValueChange}
            style={style}
        />
    );
}
