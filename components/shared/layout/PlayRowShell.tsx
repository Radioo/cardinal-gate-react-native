import {ReactNode} from "react";
import {Text} from "@/components/ui/text";
import {View} from "react-native";
import useTheme from "@/hooks/useTheme";
import {hexToRgba} from "@/lib/color-utils";

type PlayRowShellProps = {
    title: string;
    artist?: string;
    difficultyChip: ReactNode;
    headerExtra?: ReactNode;
    children: ReactNode;
};

/**
 * Outer chrome shared by IidxPlayRow and SdvxPlayRow:
 * a bordered card with a title/artist + difficulty header, a divider, and a
 * stats body slot. Game-specific stat content goes into {children}.
 */
export default function PlayRowShell({title, artist, difficultyChip, headerExtra, children}: PlayRowShellProps) {
    const theme = useTheme();
    const divider = hexToRgba(theme.primary, 0.30);
    const mutedText = hexToRgba(theme.text, 0.55);

    return (
        <View
            className="overflow-hidden"
            style={{
                backgroundColor: theme.primarySurface,
                borderWidth: 1,
                borderColor: theme.primary,
            }}
        >
            <View className="px-3 pt-2 pb-2.5">
                <View className="flex-row items-stretch gap-2">
                    <View className="flex-1 min-w-0 justify-center">
                        <Text
                            className="font-bold text-[15px] leading-5"
                            numberOfLines={1}
                        >
                            {title}
                        </Text>
                        {artist ? (
                            <Text
                                className="text-[11px] leading-4 mt-0.5"
                                style={{color: mutedText, letterSpacing: 0.3}}
                                numberOfLines={1}
                            >
                                {artist}
                            </Text>
                        ) : null}
                    </View>
                    <View className="flex-row items-stretch gap-1.5">
                        {difficultyChip}
                        {headerExtra}
                    </View>
                </View>

                <View style={{height: 1, backgroundColor: divider, marginVertical: 10}}/>

                {children}
            </View>
        </View>
    );
}
