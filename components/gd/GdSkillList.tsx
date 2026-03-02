import {GdMusicSkillItem} from "@/types/gd-skill-data-response";
import {FlatList, StyleSheet, View} from "react-native";
import ThemedText from "@/components/themed/ThemedText";
import * as React from "react";
import GdSkillListItem from "@/components/gd/GdSkillListItem";

export default function GdSkillList({items}: {items: GdMusicSkillItem[]}) {

    if(items.length === 0) {
        return (
            <View style={styles.empty}>
                <ThemedText>No data</ThemedText>
            </View>
        )
    }

    return (
        <FlatList data={items}
                  keyExtractor={(_item, index) => index.toString()}
                  contentContainerStyle={styles.listContent}
                  ItemSeparatorComponent={() => <View style={styles.separator} />}
                  renderItem={({item, index}) => (
                      <GdSkillListItem item={item} index={index} />
                  )}
        />
    )
}

const styles = StyleSheet.create({
    empty: {flex: 1, justifyContent: 'center', alignItems: 'center'},
    listContent: {paddingVertical: 10, paddingHorizontal: 0},
    separator: {height: 10},
});
