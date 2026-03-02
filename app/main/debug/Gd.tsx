import {GdDifficultyType} from "@/enums/gd-difficulty-type";
import {GdDifficultyContainer} from "@/types/gd-difficulty-container";
import {GdDifficulty} from "@/enums/gd-difficulty";
import {FlatList, StyleSheet, View} from "react-native";
import GdDifficultyInfo from "@/components/gd/GdDifficulty";
import ThemedCard from "@/components/themed/ThemedCard";
import ThemedText from "@/components/themed/ThemedText";

const MAX_DIFFICULTY_LEVEL = 995;
const LEVEL_STEP = 5;
const difficulties: GdDifficultyContainer[] = [];
Object.keys(GdDifficultyType).forEach(type => {
    Object.keys(GdDifficulty).forEach(difficulty => {
        for (let i = LEVEL_STEP; i <= MAX_DIFFICULTY_LEVEL; i += LEVEL_STEP) {
            difficulties.push({
                type: GdDifficultyType[type as keyof typeof GdDifficultyType],
                difficulty: GdDifficulty[difficulty as keyof typeof GdDifficulty],
                level: i,
            })
        }
    })
})

export default function Gd() {
    return (
        <View style={styles.container}>
            <ThemedCard>
                <ThemedText>All of these should be readable and take only one line</ThemedText>
            </ThemedCard>
            <FlatList data={difficulties} renderItem={({item}) => (
                <GdDifficultyInfo difficulty={item} />
            )}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1},
});
