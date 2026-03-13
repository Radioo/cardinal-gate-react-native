import {IidxPlay} from "@/types/iidx-play";
import ThemedText from "@/components/themed/ThemedText";
import {View} from "react-native";
import useTheme from "@/hooks/useTheme";
import IidxClearTypeItem from "@/components/iidx/IidxClearTypeItem";
import ThemedButton from "@/components/themed/ThemedButton";
import {FontAwesome} from "@expo/vector-icons";
import {useState} from "react";
import ShareImageModal from "@/components/shared/ShareImageModal";
import ThemedCard from "@/components/themed/ThemedCard";
import IidxDifficultyItem from "@/components/iidx/IidxDifficulty";
import {getIidxScoreCardUrl} from "@/services/game";

type IidxPlayRowProps = {
    play: IidxPlay;
}

export default function IidxPlayRow({play}: IidxPlayRowProps) {
    const theme = useTheme();
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <ThemedCard>
            <ShareImageModal url={getIidxScoreCardUrl(play.id)} visible={modalVisible} onClose={() => setModalVisible(false)}/>
            <View className="gap-1.5">
                <View className="flex-row items-center gap-2">
                    <ThemedText className="flex-1" numberOfLines={1}>{play.name}</ThemedText>
                    {play.has_score_card ?
                        <ThemedButton icon={<FontAwesome name="camera" size={18} color={theme.background}/>}
                                      className="h-8 w-8 px-0"
                                      onPress={() => setModalVisible(true)}
                        /> : null}
                </View>
                <View className="flex-row items-center gap-2">
                    <IidxDifficultyItem difficulty={play.difficulty} level={play.level}/>
                    <IidxClearTypeItem clearType={play.clear_type}/>
                </View>
                <View className="flex-row items-center">
                    <ThemedText className="flex-1 font-bold text-2xl">{play.grade}</ThemedText>
                    <View className="flex-[2] items-center">
                        <ThemedText className="font-bold text-lg">{play.ex_score.toLocaleString()} EX</ThemedText>
                        <ThemedText className="text-xs opacity-70">{play.percentage.toFixed(2)}%</ThemedText>
                    </View>
                    <View className="flex-1 items-end">
                        <ThemedText className="text-xs">{play.perfect_count.toLocaleString()} PG</ThemedText>
                        <ThemedText className="text-xs">{play.great_count.toLocaleString()} GR</ThemedText>
                        {play.miss_count === null ? null :
                            <ThemedText className="text-xs">{play.miss_count.toLocaleString()} MC</ThemedText>}
                    </View>
                </View>
            </View>
        </ThemedCard>
    )
}
