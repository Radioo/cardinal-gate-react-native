import {IidxPlay} from "@/types/iidx-play";
import {Text} from "@/components/ui/text";
import {Pressable, View} from "react-native";
import useTheme from "@/hooks/useTheme";
import IidxClearTypeItem from "@/components/iidx/IidxClearTypeItem";
import {Camera} from "lucide-react-native";
import {useState} from "react";
import ShareImageModal from "@/components/shared/modal/ShareImageModal";
import StatCell from "@/components/shared/chip/StatCell";
import IidxDifficultyItem from "@/components/iidx/IidxDifficultyItem";
import {getIidxChartScreenshotUrl} from "@/services/game";
import {hexToRgba} from "@/lib/color-utils";
import {webStyle} from "@/lib/web-style";

type IidxPlayRowProps = {
    play: IidxPlay;
}

export default function IidxPlayRow({play}: IidxPlayRowProps) {
    const theme = useTheme();
    const [modalVisible, setModalVisible] = useState(false);

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
            <ShareImageModal
                url={getIidxChartScreenshotUrl(play.id)}
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
            />

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
                        <IidxDifficultyItem difficulty={play.difficulty} level={play.level}/>
                        {play.has_score_card ? (
                            <Pressable
                                onPress={() => setModalVisible(true)}
                                className="items-center justify-center"
                                style={{
                                    width: 26,
                                    borderWidth: 1,
                                    borderColor: hexToRgba(theme.primary, 0.5),
                                    backgroundColor: hexToRgba(theme.primary, 0.08),
                                    ...webStyle({cursor: 'pointer'}),
                                }}
                                accessibilityRole="button"
                                accessibilityLabel="View score card"
                            >
                                <Camera size={14} color={theme.primary}/>
                            </Pressable>
                        ) : null}
                    </View>
                </View>

                <View style={{height: 1, backgroundColor: divider, marginVertical: 10}}/>

                <View className="gap-3">
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

                        <StatCell label="EX SCORE">
                            <View className="items-center">
                                <Text
                                    className="font-mono font-bold text-[20px]"
                                    style={{letterSpacing: 0.5, lineHeight: 22}}
                                    numberOfLines={1}
                                >
                                    {play.ex_score.toLocaleString()}
                                </Text>
                                <Text
                                    className="font-mono text-[10px] mt-0.5"
                                    style={{color: mutedText, letterSpacing: 0.3}}
                                    numberOfLines={1}
                                >
                                    {play.percentage.toFixed(2)}%
                                </Text>
                            </View>
                        </StatCell>

                        <StatCell label="CLEAR LAMP">
                            <IidxClearTypeItem clearType={play.clear_type}/>
                        </StatCell>
                    </View>

                    <View className="flex-row items-start">
                        <StatCell label="PERFECT">
                            <Text
                                className="font-mono font-semibold text-[14px]"
                                style={{lineHeight: 16}}
                                numberOfLines={1}
                            >
                                {play.perfect_count.toLocaleString()}
                            </Text>
                        </StatCell>
                        <StatCell label="GREAT">
                            <Text
                                className="font-mono font-semibold text-[14px]"
                                style={{lineHeight: 16}}
                                numberOfLines={1}
                            >
                                {play.great_count.toLocaleString()}
                            </Text>
                        </StatCell>
                        <StatCell label="MISS COUNT">
                            {play.miss_count !== null ? (
                                <Text
                                    className="font-mono font-semibold text-[14px]"
                                    style={{lineHeight: 16}}
                                    numberOfLines={1}
                                >
                                    {play.miss_count.toLocaleString()}
                                </Text>
                            ) : (
                                <Text
                                    className="font-mono text-[14px]"
                                    style={{lineHeight: 16, color: mutedText}}
                                >
                                    —
                                </Text>
                            )}
                        </StatCell>
                    </View>
                </View>
            </View>
        </View>
    );
}
