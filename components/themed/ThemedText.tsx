import {type TextProps} from 'react-native';
import {Text} from "@/components/ui/text";
import {cn} from "@/lib/utils";

type ThemedTextType = 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';

type ThemedTextProps = TextProps & {
    type?: ThemedTextType;
    className?: string;
};

const typeClassMap: Record<ThemedTextType, string> = {
    default: 'text-base leading-6',
    title: 'text-[32px] font-bold leading-8',
    defaultSemiBold: 'text-base leading-6 font-semibold',
    subtitle: 'text-xl font-bold',
    link: 'text-base leading-[30px] text-accent',
};

export default function ThemedText({
    style,
    type = 'default',
    className,
    ...rest
}: ThemedTextProps) {
    return (
        <Text
            className={cn(typeClassMap[type], className)}
            style={style}
            {...rest}
        />
    );
}
