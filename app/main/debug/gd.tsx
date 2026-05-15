import {GdDifficultyType} from "@/enums/gd-difficulty-type";
import {GdDifficultyContainer} from "@/types/gd-difficulty-container";
import {GdDifficulty} from "@/enums/gd-difficulty";
import {FlatList, View} from "react-native";
import GdDifficultyItem from "@/components/gd/GdDifficultyItem";
import {Card} from "@/components/ui/card";
import {Text} from "@/components/ui/text";

const MAX_DIFFICULTY_LEVEL = 995;
const LEVEL_STEP = 5;

const levels = Array.from(
    {length: MAX_DIFFICULTY_LEVEL / LEVEL_STEP},
    (_, i) => (i + 1) * LEVEL_STEP,
);

const difficulties: GdDifficultyContainer[] = Object.values(GdDifficultyType).flatMap(type =>
    Object.values(GdDifficulty).flatMap(difficulty =>
        levels.map(level => ({type, difficulty, level}))
    )
);

export default function Gd() {
    return (
        <View className="flex-1">
            <Card className="border-primary bg-primary-surface gap-0 rounded-none p-1.5 shadow-none">
                <Text className="text-base leading-6">All of these should be readable and take only one line</Text>
            </Card>
            <FlatList data={difficulties} renderItem={({item}) => (
                <GdDifficultyItem difficulty={item} />
            )}/>
        </View>
    )
}
