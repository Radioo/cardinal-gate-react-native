import ThemedText from "@/components/themed/ThemedText";
import {View} from "react-native";
import ThemedCard from "@/components/themed/ThemedCard";
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
        <ThemedCard className="flex-row gap-[5px] items-center mx-2.5 flex-1">
            <ThemedText className="leading-10 text-3xl font-mono font-bold">#{(index + 1).toString().padStart(2, '0')}</ThemedText>
            <View className="flex-col justify-between flex-1">
                <ThemedText numberOfLines={1} ellipsizeMode="tail">{item.title}</ThemedText>
                <GdDifficultyInfo difficulty={item.difficulty}/>
            </View>
            <View>
                <ThemedText className="font-bold text-right">{formatGdSkillValue(item.skill)}</ThemedText>
                <ThemedText className="text-right">{formatGdSkillValue(item.percentage)}%</ThemedText>
            </View>
        </ThemedCard>
    )
}

export default memo(GdSkillListItemInner);
