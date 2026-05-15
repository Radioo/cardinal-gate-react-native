import {IidxDifficulty} from "@/enums/iidx-difficulty";
import {FlatList, View} from "react-native";
import IidxDifficultyItem, {IidxDifficultyProps} from "@/components/iidx/IidxDifficultyItem";
import {Card} from "@/components/ui/card";
import {Text} from "@/components/ui/text";

const MAX_LEVEL = 12;

const difficulties: IidxDifficultyProps[] = Object.values(IidxDifficulty).flatMap(difficulty =>
    Array.from({length: MAX_LEVEL}, (_, i) => ({difficulty, level: i + 1}))
);

export default function Iidx() {
    return (
        <View className="flex-1">
            <Card className="border-primary bg-primary-surface gap-0 rounded-none p-1.5 shadow-none">
                <Text className="text-base leading-6">All of these should be readable and take only one line</Text>
            </Card>
            <FlatList data={difficulties} renderItem={({item, index}) => (
                <View className="flex-row">
                    <IidxDifficultyItem key={index} difficulty={item.difficulty} level={item.level} />
                </View>
            )}/>
        </View>
    )
}
