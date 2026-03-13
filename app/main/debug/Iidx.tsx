import {IidxDifficulty} from "@/enums/iidx-difficulty";
import {FlatList, View} from "react-native";
import IidxDifficultyItem, {IidxDifficultyProps} from "@/components/iidx/IidxDifficulty";
import ThemedCard from "@/components/themed/ThemedCard";
import ThemedText from "@/components/themed/ThemedText";

const difficulties: IidxDifficultyProps[] = [];
Object.keys(IidxDifficulty).forEach(difficulty => {
    for(let i = 1; i <= 12; i++) {
        difficulties.push({
            difficulty: difficulty as IidxDifficulty,
            level: i,
        })
    }
})

export default function Iidx() {
    return (
        <View className="flex-1">
            <ThemedCard>
                <ThemedText>All of these should be readable and take only one line</ThemedText>
            </ThemedCard>
            <FlatList data={difficulties} renderItem={({item, index}) => (
                <View className="flex-row">
                    <IidxDifficultyItem key={index} difficulty={item.difficulty} level={item.level} />
                </View>
            )}/>
        </View>
    )
}
