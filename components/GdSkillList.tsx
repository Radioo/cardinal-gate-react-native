import {GdMusicSkillItem} from "@/types/gd-skill-data-response";
import {FlatList, View} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import * as React from "react";
import {GdSkillListItem} from "@/components/GdSkillListItem";
import {useTheme} from "@/hooks/useTheme";

export function SkillList({items}: {items: GdMusicSkillItem[]}) {
    const theme = useTheme();
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
                      <View style={{
                          marginTop: index === 0 ? 10 : 5,
                          marginBottom: index === items.length - 1 ? 10 : 5,
                      }}>
                          <GdSkillListItem item={item}
                                           index={index}
                                           theme={theme.scheme}
                          />
                      </View>

                  )}
        />
    )
}
