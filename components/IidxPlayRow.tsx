import {IidxPlay} from "@/types/iidx-play";
import {ThemedText} from "@/components/ThemedText";
import {StyleProp, View, ViewStyle} from "react-native";
import {IidxDifficulty} from "@/enums/iidx-difficulty";
import {useTheme} from "@/hooks/useTheme";
import {IidxClearType} from "@/enums/iidx-clear-type";
import IidxClearTypeItem from "@/components/IidxClearTypeItem";
import {lighten} from "polished";

export type IidxPlayRowProps = {
    play: IidxPlay;
    style?: StyleProp<ViewStyle>;
}

export default function IidxPlayRow({play, style}: IidxPlayRowProps) {
    const theme = useTheme();

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

    const getClearTypeColor = (clearType: IidxClearType) => {

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

    return (
        <View style={[{
            backgroundColor: backgroundColor,
            borderColor: lighten(0.2, backgroundColor),
            borderWidth: 2,
            boxShadow: `0 0 10px ${lighten(0.2, backgroundColor)} inset`,
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
                <ThemedText style={{lineHeight: 40, fontSize: 30}}>{getPlayStyle(play.difficulty)}</ThemedText>
            </View>
            <View style={{height: 2, backgroundColor: theme.text}}></View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <ThemedText style={{flex: 1, fontSize: 20, lineHeight: 35, fontWeight: 'bold'}}>
                    {play.ex_score.toLocaleString()} EX
                </ThemedText>
                <IidxClearTypeItem clearType={play.clear_type}/>
                <View style={{flex: 1}}>
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
        </View>
    )
}
