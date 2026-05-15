import {SdvxPlay} from "@/types/sdvx-play";
import {Text} from "@/components/ui/text";
import {View} from "react-native";
import useTheme from "@/hooks/useTheme";
import SdvxDifficultyItem from "@/components/sdvx/SdvxDifficultyItem";
import SdvxClearTypeItem from "@/components/sdvx/SdvxClearTypeItem";
import {hexToRgba} from "@/lib/color-utils";

type SdvxPlayRowProps = {
    play: SdvxPlay;
}

type StatCellProps = {
    label: string;
    children: React.ReactNode;
    align?: 'left' | 'center' | 'right';
};

function StatCell({label, children, align = 'center'}: StatCellProps) {
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

export default function SdvxPlayRow({play}: SdvxPlayRowProps) {
    const theme = useTheme();

    const divider = hexToRgba(theme.primary, 0.30);
    const mutedText = hexToRgba(theme.text, 0.55);
    const hasExScore = play.ex_score !== null && play.ex_score > 0;

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
                {/* ── CHART INFO ─────────────────────────────── */}
                <View className="flex-row items-stretch gap-2">
                    <View className="flex-1 min-w-0 justify-center">
                        <Text
                            className="font-bold text-[15px] leading-5"
                            numberOfLines={1}
                        >
                            {play.title}
                        </Text>
                        {play.artist ? (
                            <Text
                                className="text-[11px] leading-4 mt-0.5"
                                style={{color: mutedText, letterSpacing: 0.3}}
                                numberOfLines={1}
                            >
                                {play.artist}
                            </Text>
                        ) : null}
                    </View>
                    <View className="flex-row items-stretch gap-1.5">
                        <SdvxDifficultyItem difficulty={play.difficulty} level={play.level}/>
                    </View>
                </View>

                {/* ── DIVIDER ────────────────────────────────── */}
                <View style={{height: 1, backgroundColor: divider, marginVertical: 10}}/>

                {/* ── SCORE INFO ─────────────────────────────── */}
                <View className="flex-row items-start">
                    <StatCell label="GRADE">
                        <Text
                            className="font-extrabold text-[26px]"
                            style={{
                                color: theme.primary,
                                letterSpacing: 1.5,
                                lineHeight: 28,
                            }}
                            numberOfLines={1}
                        >
                            {play.grade}
                        </Text>
                    </StatCell>

                    <StatCell label="SCORE">
                        <View className="items-center">
                            <Text
                                className="font-mono font-bold text-[20px]"
                                style={{letterSpacing: 0.5, lineHeight: 22}}
                                numberOfLines={1}
                            >
                                {play.score.toLocaleString()}
                            </Text>
                            {hasExScore ? (
                                <Text
                                    className="font-mono text-[10px] mt-0.5"
                                    style={{color: mutedText, letterSpacing: 0.3}}
                                    numberOfLines={1}
                                >
                                    {play.ex_score!.toLocaleString()} EX
                                </Text>
                            ) : null}
                        </View>
                    </StatCell>

                    <StatCell label="CLEAR LAMP">
                        <SdvxClearTypeItem clearType={play.clear_type}/>
                    </StatCell>
                </View>
            </View>
        </View>
    );
}
