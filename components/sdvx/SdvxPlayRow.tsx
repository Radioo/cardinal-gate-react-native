import {SdvxPlay} from "@/types/sdvx-play";
import {Text} from "@/components/ui/text";
import {Card} from "@/components/ui/card";
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
        <Card className="border-primary bg-primary-surface gap-0 rounded-none p-1.5 shadow-none gap-[5px]">
            <View className="gap-[5px]">
                <Text className="text-base leading-6" numberOfLines={1}>{play.title}</Text>
                <SdvxDifficultyItem difficulty={play.difficulty} level={play.level}/>
            </View>
            <View className="h-px" style={{backgroundColor: theme.primary}}/>
            <View className="flex-row gap-[5px]">
                <View className="flex-[2] items-center justify-center">
                    <SdvxClearTypeItem clearType={play.clear_type}/>
                </View>
                <View className="flex-1 items-center justify-center">
                    <Text className="text-base leading-6 font-bold text-center">
                        {play.score.toLocaleString()}
                    </Text>
                    {play.ex_score === 0 || play.ex_score === null ? null :
                        <Text className="text-base leading-6 text-center text-sm">
                            {play.ex_score.toLocaleString()} EX
                        </Text>
                    }
                </View>
                <View className="flex-1 items-center justify-center">
                    <Text className="text-base leading-6 font-bold text-center text-2xl leading-10">
                        {play.grade}
                    </Text>
                </View>
            </View>
        </Card>
    )
}
