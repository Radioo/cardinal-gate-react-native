import {IidxPlay} from "@/types/iidx-play";
import {ThemedText} from "@/components/ThemedText";
import {StyleProp, View, ViewStyle} from "react-native";
import {IidxDifficulty} from "@/enums/iidx-difficulty";
import {useTheme} from "@/hooks/useTheme";
import IidxClearTypeItem from "@/components/IidxClearTypeItem";
import {lighten} from "polished";
import {ThemedButton} from "@/components/ThemedButton";
import {FontAwesome} from "@expo/vector-icons";
import useIidxScoreCard from "@/hooks/queries/useIidxScoreCard";
import {useState} from "react";
import ShareImageModal from "@/components/ShareImageModal";

export type IidxPlayRowProps = {
    play: IidxPlay;
    style?: StyleProp<ViewStyle>;
}

export default function IidxPlayRow({play, style}: IidxPlayRowProps) {
    const theme = useTheme();
    const {data, isLoading, refetch, isFetched} = useIidxScoreCard(play.id);
    const [modalVisible, setModalVisible] = useState(false);
    const showModal = !!data && modalVisible;

    const fetchScoreCard = () => {
        if(!isFetched) {
            refetch();
        }
    }

    const getBackgroundColor = (diff: IidxDifficulty)=> {
        switch(diff) {
            case IidxDifficulty.SPB:
            case IidxDifficulty.DPB:
                return '#114411';
            case IidxDifficulty.SPN:
            case IidxDifficulty.DPN:
                return '#0f3b67';
            case IidxDifficulty.SPH:
            case IidxDifficulty.DPH:
                return '#572f00';
            case IidxDifficulty.SPA:
            case IidxDifficulty.DPA:
                return '#5d091a';
            case IidxDifficulty.SPL:
            case IidxDifficulty.DPL:
                return '#331146';
        }
    }

    const getPlayStyle = (diff: IidxDifficulty) => {
        switch(diff) {
            case IidxDifficulty.SPB:
            case IidxDifficulty.SPN:
            case IidxDifficulty.SPH:
            case IidxDifficulty.SPA:
            case IidxDifficulty.SPL:
                return 'SP';
            case IidxDifficulty.DPB:
            case IidxDifficulty.DPN:
            case IidxDifficulty.DPH:
            case IidxDifficulty.DPA:
            case IidxDifficulty.DPL:
                return 'DP';
        }
    }

    const backgroundColor = getBackgroundColor(play.difficulty);
    const themedBackgroundColor = theme.scheme === 'dark' ?
        backgroundColor :
        lighten(0.7, backgroundColor);
    const themedBorderColor = theme.scheme === 'dark' ?
        lighten(0.2, backgroundColor) :
        lighten(0.5, backgroundColor);

    return (
        <>
            {data !== undefined && isFetched ? <ShareImageModal image={data} modalVisible={showModal} onClose={() => setModalVisible(false)}/> : null}
            <View style={[{
                backgroundColor: themedBackgroundColor,
                borderColor: themedBorderColor,
                borderWidth: 2,
                boxShadow: `0 0 10px ${themedBorderColor} inset`,
                padding: 5,
                gap: 5,
                margin: 5,
            }, style]}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 5,
                }}>
                    <View style={{flex: 1}}>
                        <ThemedText numberOfLines={1}>{play.name}</ThemedText>
                        <ThemedText numberOfLines={1}>{play.artist}</ThemedText>
                    </View>
                    <ThemedText style={{lineHeight: 40, fontSize: 30, fontWeight: 'bold'}}>{getPlayStyle(play.difficulty)}</ThemedText>
                    {play.has_score_card ? <ThemedButton loading={isLoading} onPress={() => {
                        fetchScoreCard();
                        setModalVisible(true);
                    }} icon={<FontAwesome name="camera" size={24} color={theme.background} />}/> : null}

                </View>
                <View style={{height: 2, backgroundColor: theme.text}}></View>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10}}>
                        <View>
                            <ThemedText style={{fontSize: 20, lineHeight: 35, fontWeight: 'bold'}}>
                                {play.ex_score.toLocaleString()} EX
                            </ThemedText>
                            <ThemedText style={{lineHeight: 14, fontSize: 12}}>
                                {play.percentage.toFixed(2)}%
                            </ThemedText>
                        </View>
                        <View>
                            <ThemedText style={{fontSize: 12, lineHeight: 14, textAlign: 'right'}}>
                                {play.perfect_count.toLocaleString()} PG
                            </ThemedText>
                            <ThemedText style={{fontSize: 12, lineHeight: 14, textAlign: 'right'}}>
                                {play.great_count.toLocaleString()} G
                            </ThemedText>
                            {play.miss_count === null ? null : <ThemedText style={{fontSize: 12, lineHeight: 14, textAlign: 'right'}}>
                                {play.miss_count.toLocaleString()} MC
                            </ThemedText>}
                        </View>
                    </View>
                    <View style={{alignItems: 'center', flex: 1}}>
                        <IidxClearTypeItem clearType={play.clear_type}/>
                    </View>
                    <ThemedText style={{width: 60, fontSize: 30, lineHeight: 40, fontWeight: 'bold', textAlign: 'right'}}>
                        {play.grade}
                    </ThemedText>
                </View>
            </View>
        </>
    )
}
