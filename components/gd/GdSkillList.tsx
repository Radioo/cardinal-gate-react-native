import {GdMusicSkillItem} from "@/types/gd-skill-data-response";
import {FlatList, View} from "react-native";
import ThemedText from "@/components/themed/ThemedText";
import * as React from "react";
import GdSkillListItem from "@/components/gd/GdSkillListItem";

export default function GdSkillList({items}: {items: GdMusicSkillItem[]}) {

    if(items.length === 0) {
        return (
            <View className="flex-1 justify-center items-center">
                <ThemedText>No data</ThemedText>
            </View>
        )
    }

    return (
        <FlatList data={items}
                  keyExtractor={(_item, index) => index.toString()}
                  contentContainerStyle={{paddingVertical: 10}}
                  ItemSeparatorComponent={() => <View className="h-2.5" />}
                  renderItem={({item, index}) => (
                      <GdSkillListItem item={item} index={index} />
                  )}
        />
    )
}
