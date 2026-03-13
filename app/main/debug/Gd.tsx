import {GdDifficultyType} from "@/enums/gd-difficulty-type";
import {GdDifficultyContainer} from "@/types/gd-difficulty-container";
import {GdDifficulty} from "@/enums/gd-difficulty";
import {FlatList, View} from "react-native";
import GdDifficultyInfo from "@/components/gd/GdDifficulty";
import {Card} from "@/components/ui/card";
import {Text} from "@/components/ui/text";

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
        <View className="flex-1">
            <Card className="border-primary bg-primary-surface gap-0 rounded-none p-1.5 shadow-none">
                <Text className="text-base leading-6">All of these should be readable and take only one line</Text>
            </Card>
            <FlatList data={difficulties} renderItem={({item}) => (
                <GdDifficultyInfo difficulty={item} />
            )}/>
        </View>
    )
}
