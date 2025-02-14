import {IidxPlay} from "@/types/iidx-play";
import {ThemedText} from "@/components/ThemedText";
import {StyleProp, View, ViewStyle} from "react-native";
import {useTheme} from "@/hooks/useTheme";
import IidxClearTypeItem from "@/components/IidxClearTypeItem";
import {ThemedButton} from "@/components/ThemedButton";
import {FontAwesome} from "@expo/vector-icons";
import {useState} from "react";
import ShareImageModal from "@/components/ShareImageModal";
import ThemedCard from "@/components/ThemedCard";
import {IidxDifficultyItem} from "@/components/IidxDifficulty";

export type IidxPlayRowProps = {
    play: IidxPlay;
    style?: StyleProp<ViewStyle>;
}

export default function IidxPlayRow({play, style}: IidxPlayRowProps) {
    const theme = useTheme();
    const [modalVisible, setModalVisible] = useState(false);

    const getScoreCardUrl = () => {
        return `${process.env.EXPO_PUBLIC_API_URL}/iidx/chart-screenshot/${play.id}.png`;
    }

    return (
        <ThemedCard>
            <ShareImageModal url={getScoreCardUrl()} modalVisible={modalVisible} onClose={() => setModalVisible(false)}/>
            <View style={{gap: 5}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{marginRight: 'auto'}}>
                        <ThemedText>{play.name}</ThemedText>
                        <View style={{flexDirection: 'row'}}>
                            <IidxDifficultyItem difficulty={play.difficulty} level={play.level} theme={theme.scheme}/>
                        </View>
                    </View>
                    {play.has_score_card ?
                        <ThemedButton icon={<FontAwesome name="camera" size={24} color={theme.background}/>}
                                      onPress={() => setModalVisible(true)}
                        /> : null}
                </View>
                <View style={{height: 1, backgroundColor: theme.primary}}></View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex: 2, flexDirection: 'row'}}>
                        <IidxClearTypeItem clearType={play.clear_type}/>
                    </View>
                    <View style={{flex: 2}}>
                        <ThemedText style={{
                            fontWeight: 'bold',
                            lineHeight: 30,
                            fontSize: 20,
                            textAlign: 'center',
                        }}>{play.ex_score.toLocaleString()} EX</ThemedText>
                        <ThemedText style={{
                            textAlign: 'center',
                            lineHeight: 16,
                            fontSize: 12,
                        }}>{play.percentage.toFixed(2)}%</ThemedText>
                    </View>
                    <ThemedText style={{
                        flex: 1,
                        fontWeight: 'bold',
                        lineHeight: 40,
                        fontSize: 20,
                    }}>{play.grade}</ThemedText>
                    <View style={{flex: 1}}>
                        <ThemedText style={{
                            textAlign: 'right',
                            lineHeight: 16,
                            fontSize: 12,
                        }}>{play.perfect_count.toLocaleString()} PG</ThemedText>
                        <ThemedText style={{
                            textAlign: 'right',
                            lineHeight: 16,
                            fontSize: 12,
                        }}>{play.great_count.toLocaleString()} GR</ThemedText>
                        {play.miss_count === null ? null : <ThemedText style={{
                            textAlign: 'right',
                            lineHeight: 16,
                            fontSize: 12,
                        }}>{play.miss_count.toLocaleString()} MC</ThemedText>}
                    </View>
                </View>
            </View>
        </ThemedCard>
    )
}
