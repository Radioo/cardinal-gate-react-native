import {SdvxPlay} from "@/types/sdvx-play";
import ThemedText from "@/components/themed/ThemedText";
import ThemedCard from "@/components/themed/ThemedCard";
import SdvxDifficultyItem from "@/components/sdvx/SdvxDifficultyItem";
import {View} from "react-native";
import useTheme from "@/hooks/useTheme";
import SdvxClearTypeItem from "@/components/sdvx/SdvxClearTypeItem";

type SdvxPlayRowProps = {
    play: SdvxPlay;
}

export default function SdvxPlayRow({play}: SdvxPlayRowProps) {
    const theme = useTheme();

    return (
        <ThemedCard className="gap-[5px]">
            <View className="gap-[5px]">
                <ThemedText numberOfLines={1}>{play.title}</ThemedText>
                <SdvxDifficultyItem difficulty={play.difficulty} level={play.level}/>
            </View>
            <View className="h-px" style={{backgroundColor: theme.primary}}/>
            <View className="flex-row gap-[5px]">
                <View className="flex-[2] items-center justify-center">
                    <SdvxClearTypeItem clearType={play.clear_type}/>
                </View>
                <View className="flex-1 items-center justify-center">
                    <ThemedText className="font-bold text-center">
                        {play.score.toLocaleString()}
                    </ThemedText>
                    {play.ex_score === 0 || play.ex_score === null ? null :
                        <ThemedText className="text-center text-sm">
                            {play.ex_score.toLocaleString()} EX
                        </ThemedText>
                    }
                </View>
                <View className="flex-1 items-center justify-center">
                    <ThemedText className="font-bold text-center text-2xl leading-10">
                        {play.grade}
                    </ThemedText>
                </View>
            </View>
        </ThemedCard>
    )
}
