import {ThemedText} from "@/components/ThemedText";
import {View} from "react-native";
import ThemedCard from "@/components/ThemedCard";
import * as React from "react";
import {GdMusicSkillItem} from "@/types/gd-skill-data-response";
import {GdDifficultyInfo} from "@/components/GdDifficulty";
import {memo} from "react";

type GdSkillListItemProps = {
    item: GdMusicSkillItem;
    index: number;
    theme: 'light' | 'dark';
}

const Component = ({item, index, theme}: GdSkillListItemProps) => {
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
                <GdDifficultyInfo difficulty={item.difficulty} theme={theme}/>
            </View>
            <View>
                <ThemedText style={{fontWeight: 'bold', textAlign: 'right'}}>{formatValue(item.skill)}</ThemedText>
                <ThemedText style={{textAlign: 'right'}}>{formatValue(item.percentage)}%</ThemedText>
            </View>
        </ThemedCard>
    )
}

export const GdSkillListItem = memo(Component);
