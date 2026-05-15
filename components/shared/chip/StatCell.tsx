import {Text} from "@/components/ui/text";
import {View} from "react-native";
import useTheme from "@/hooks/useTheme";
import {hexToRgba} from "@/lib/color-utils";

type StatCellProps = {
    label: string;
    children: React.ReactNode;
    align?: 'left' | 'center' | 'right';
};

export default function StatCell({label, children, align = 'center'}: StatCellProps) {
    const theme = useTheme();
    const mutedText = hexToRgba(theme.text, 0.55);
    const alignClass = align === 'left' ? 'items-start' : align === 'right' ? 'items-end' : 'items-center';

    return (
        <View className={`flex-1 ${alignClass} justify-start`}>
            <Text
                className="text-[9px] font-semibold"
                style={{color: mutedText, letterSpacing: 2.2, lineHeight: 12}}
                numberOfLines={1}
            >
                {label}
            </Text>
            <View className="mt-1">
                {children}
            </View>
        </View>
    );
}
