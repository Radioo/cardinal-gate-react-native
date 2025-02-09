import {ThemedText} from "@/components/ThemedText";
import {View} from "react-native";
import GdDifficultyInfo from "@/components/GdDifficulty";
import ThemedCard from "@/components/ThemedCard";
import * as React from "react";
import {GdMusicSkillItem} from "@/types/gd-skill-data-response";

type GdSkillListItemProps = {
    item: GdMusicSkillItem;
    index: number;
    first: boolean;
    last: boolean;
}

export default function GdSkillListItem({item, index, first, last}: GdSkillListItemProps) {
    const formatValue = (value: number) => {
        if(value < 0) {
            return '???';
        }

        return (value / 100).toFixed(2);
    }

    return (
        <ThemedCard style={{
            flexDirection: 'row',
            gap: 5,
            alignItems: 'center',
            marginLeft: 10,
            marginRight: 10,
            marginTop: first ? 10 : 5,
            marginBottom: last ? 10 : 5,
            flex: 1,
        }}>
            <ThemedText style={{
                lineHeight: 40,
                fontSize: 30,
                fontFamily: 'monospace',
                fontWeight: 'bold',
            }}>#{(index + 1).toString().padStart(2, '0')}</ThemedText>
            <View style={{flexDirection: 'column', justifyContent: 'space-between', flex: 1}}>
                <ThemedText numberOfLines={1} ellipsizeMode="tail">{item.title}</ThemedText>
                <GdDifficultyInfo difficulty={item.difficulty}/>
            </View>
            <View>
                <ThemedText style={{fontWeight: 'bold', textAlign: 'right'}}>{formatValue(item.skill)}</ThemedText>
                <ThemedText style={{textAlign: 'right'}}>{formatValue(item.percentage)}%</ThemedText>
            </View>
        </ThemedCard>
    )
}
