import {SdvxPlay} from "@/types/sdvx-play";
import {Text} from "@/components/ui/text";
import {View} from "react-native";
import useTheme from "@/hooks/useTheme";
import SdvxDifficultyItem from "@/components/sdvx/SdvxDifficultyItem";
import SdvxClearTypeItem from "@/components/sdvx/SdvxClearTypeItem";
import StatCell from "@/components/shared/chip/StatCell";
import {hexToRgba} from "@/lib/color-utils";

type SdvxPlayRowProps = {
    play: SdvxPlay;
}

export default function SdvxPlayRow({play}: SdvxPlayRowProps) {
    const theme = useTheme();

    const divider = hexToRgba(theme.primary, 0.30);
    const mutedText = hexToRgba(theme.text, 0.55);
    const exScore = play.ex_score;
    const hasExScore = exScore !== null && exScore > 0;

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

                <View style={{height: 1, backgroundColor: divider, marginVertical: 10}}/>

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
                                    {exScore.toLocaleString()} EX
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
