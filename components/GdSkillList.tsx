import {GdMusicSkillItem} from "@/types/gd-skill-data-response";
import {FlatList, View} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import * as React from "react";
import GdSkillListItem from "@/components/GdSkillListItem";

export function SkillList({items}: {items: GdMusicSkillItem[]}) {
    console.log('render skill list', items);

    if(items.length === 0) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ThemedText>No data</ThemedText>
            </View>
        )
    }

    return (
        <FlatList data={items}
                  keyExtractor={(_item, index) => index.toString()}
                  renderItem={({item, index}) => (
                      <GdSkillListItem item={item} index={index} first={index === 0} last={index === items.length - 1}/>
                  )}
        />
    )
}
