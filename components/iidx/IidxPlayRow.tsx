import {IidxPlay} from "@/types/iidx-play";
import {Text} from "@/components/ui/text";
import {View} from "react-native";
import useTheme from "@/hooks/useTheme";
import IidxClearTypeItem from "@/components/iidx/IidxClearTypeItem";
import {Button} from "@/components/ui/button";
import {Camera} from "lucide-react-native";
import {useState} from "react";
import ShareImageModal from "@/components/shared/ShareImageModal";
import {Card} from "@/components/ui/card";
import IidxDifficultyItem from "@/components/iidx/IidxDifficultyItem";
import {getIidxChartScreenshotUrl} from "@/services/game";

type IidxPlayRowProps = {
    play: IidxPlay;
}

export default function IidxPlayRow({play}: IidxPlayRowProps) {
    const theme = useTheme();
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <Card className="border-primary bg-primary-surface gap-0 rounded-none p-1.5 shadow-none">
            <ShareImageModal url={getIidxChartScreenshotUrl(play.id)} visible={modalVisible} onClose={() => setModalVisible(false)}/>
            <View className="gap-1.5">
                <View className="flex-row items-center gap-2">
                    <Text className="text-base leading-6 flex-1" numberOfLines={1}>{play.name}</Text>
                    {play.has_score_card ?
                        <Button className="h-8 w-8 px-0"
                                      onPress={() => setModalVisible(true)}
                        >
                            <Camera size={18} color={theme.background}/>
                        </Button> : null}
                </View>
                <View className="flex-row items-center gap-2">
                    <IidxDifficultyItem difficulty={play.difficulty} level={play.level}/>
                    <IidxClearTypeItem clearType={play.clear_type}/>
                </View>
                <View className="flex-row items-center">
                    <Text className="text-base leading-6 flex-1 font-bold text-2xl">{play.grade}</Text>
                    <View className="flex-[2] items-center">
                        <Text className="text-base leading-6 font-bold text-lg">{play.ex_score.toLocaleString()} EX</Text>
                        <Text className="text-base leading-6 text-xs opacity-70">{play.percentage.toFixed(2)}%</Text>
                    </View>
                    <View className="flex-1 items-end">
                        <Text className="text-base leading-6 text-xs">{play.perfect_count.toLocaleString()} PG</Text>
                        <Text className="text-base leading-6 text-xs">{play.great_count.toLocaleString()} GR</Text>
                        {play.miss_count === null ? null :
                            <Text className="text-base leading-6 text-xs">{play.miss_count.toLocaleString()} MC</Text>}
                    </View>
                </View>
            </View>
        </Card>
    )
}
