import {Text} from "@/components/ui/text";
import {View} from "react-native";
import {Card} from "@/components/ui/card";
import {GdMusicSkillItem} from "@/types/gd-skill-data-response";
import GdDifficultyInfo from "@/components/gd/GdDifficulty";
import {memo} from "react";
import {formatGdSkillValue} from "@/services/game";

type GdSkillListItemProps = {
    item: GdMusicSkillItem;
    index: number;
}

const GdSkillListItemInner = ({item, index}: GdSkillListItemProps) => {
    return (
        <Card className="border-primary bg-primary-surface gap-0 rounded-none p-1.5 shadow-none flex-row gap-[5px] items-center mx-2.5 flex-1">
            <Text className="leading-10 text-3xl font-mono font-bold">#{(index + 1).toString().padStart(2, '0')}</Text>
            <View className="flex-col justify-between flex-1">
                <Text className="text-base leading-6" numberOfLines={1} ellipsizeMode="tail">{item.title}</Text>
                <GdDifficultyInfo difficulty={item.difficulty}/>
            </View>
            <View>
                <Text className="text-base leading-6 font-bold text-right">{formatGdSkillValue(item.skill)}</Text>
                <Text className="text-base leading-6 text-right">{formatGdSkillValue(item.percentage)}%</Text>
            </View>
        </Card>
    )
}

export default memo(GdSkillListItemInner);
