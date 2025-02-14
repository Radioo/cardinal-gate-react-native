import {GdDifficultyType} from "@/enums/gd-difficulty-type";
import {GdDifficultyContainer} from "@/types/gd-difficulty-container";
import {GdDifficulty} from "@/enums/gd-difficulty";
import {FlatList, View} from "react-native";
import {GdDifficultyInfo} from "@/components/GdDifficulty";
import {useTheme} from "@/hooks/useTheme";
import ThemedCard from "@/components/ThemedCard";
import {ThemedText} from "@/components/ThemedText";

export default function Gd() {
    const theme = useTheme();
    const difficulties: GdDifficultyContainer[] = [];

    Object.keys(GdDifficultyType).forEach(type => {
        Object.keys(GdDifficulty).forEach(difficulty => {
            for (let i = 5; i < 1000; i += 5) {
                difficulties.push({
                    type: GdDifficultyType[type as keyof typeof GdDifficultyType],
                    difficulty: GdDifficulty[difficulty as keyof typeof GdDifficulty],
                    level: i,
                })
            }
        })
    })

    return (
        <View style={{flex: 1}}>
            <ThemedCard>
                <ThemedText>All of these should be readable and take only one line</ThemedText>
            </ThemedCard>
            <FlatList data={difficulties} renderItem={({item}) => (
                <GdDifficultyInfo difficulty={item} theme={theme.scheme} />
            )}/>
        </View>
    )
}
