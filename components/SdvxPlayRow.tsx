import {SdvxPlay} from "@/types/sdvx-play";
import {ThemedText} from "@/components/ThemedText";
import ThemedCard from "@/components/ThemedCard";
import SdvxDifficultyItem from "@/components/SdvxDifficultyItem";
import {View} from "react-native";
import {useTheme} from "@/hooks/useTheme";
import SdvxClearTypeItem from "@/components/SdvxClearTypeItem";

type SdvxPlayRowProps = {
    play: SdvxPlay;
}

export default function SdvxPlayRow(props: SdvxPlayRowProps) {
    const theme = useTheme();

    return (
        <ThemedCard style={{gap: 5}}>
            <View style={{gap: 5}}>
                <ThemedText numberOfLines={1}>{props.play.title}</ThemedText>
                <SdvxDifficultyItem difficulty={props.play.difficulty} level={props.play.level}/>
            </View>
            <View style={{height: 1, backgroundColor: theme.primary}}></View>
            <View style={{flexDirection: 'row', gap: 5}}>
                <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
                    <SdvxClearTypeItem clearType={props.play.clear_type}/>
                </View>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <ThemedText style={{
                        fontWeight: 'bold',
                        textAlign: 'center',
                    }}>
                        {props.play.score.toLocaleString()}
                    </ThemedText>
                    {props.play.ex_score === 0 || props.play.ex_score === null ? null :
                        <ThemedText style={{
                            textAlign: 'center',
                            fontSize: 14,
                        }}>
                            {props.play.ex_score.toLocaleString()} EX
                        </ThemedText>
                    }
                </View>
                <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                    <ThemedText style={{
                        fontWeight: 'bold',
                        textAlign: 'center',
                        fontSize: 24,
                        lineHeight: 40,
                    }}>
                        {props.play.grade}
                    </ThemedText>
                </View>
            </View>
        </ThemedCard>
    )
}
