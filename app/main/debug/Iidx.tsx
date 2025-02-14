import {IidxDifficulty} from "@/enums/iidx-difficulty";
import {FlatList, View} from "react-native";
import {IidxDifficultyItem, IidxDifficultyProps} from "@/components/IidxDifficulty";
import ThemedCard from "@/components/ThemedCard";
import {ThemedText} from "@/components/ThemedText";
import {useTheme} from "@/hooks/useTheme";

export default function Iidx() {
    const theme = useTheme();
    const difficulties: IidxDifficultyProps[] = [];

    Object.keys(IidxDifficulty).forEach(difficulty => {
        for(let i = 1; i <= 12; i++) {
            difficulties.push({
                difficulty: difficulty as IidxDifficulty,
                level: i,
                theme: theme.scheme,
            })
        }
    })

    return (
        <View style={{flex: 1}}>
            <ThemedCard>
                <ThemedText>All of these should be readable and take only one line</ThemedText>
            </ThemedCard>
            <FlatList data={difficulties} renderItem={({item, index}) => (
                <View style={{flexDirection: 'row'}}>
                    <IidxDifficultyItem key={index} difficulty={item.difficulty} level={item.level} theme={item.theme} />
                </View>
            )}/>
        </View>

    )
}
