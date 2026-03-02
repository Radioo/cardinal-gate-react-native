import {SdvxDifficulty} from "@/enums/sdvx-difficulty";
import SdvxDifficultyItem from "@/components/sdvx/SdvxDifficultyItem";
import {FlatList, useWindowDimensions, View} from "react-native";
import {SceneMap, TabView} from "react-native-tab-view";
import {useState} from "react";
import {SdvxClearType} from "@/enums/sdvx-clear-type";
import SdvxClearTypeItem from "@/components/sdvx/SdvxClearTypeItem";

const tabRoutes = [
    {
        key: 'difficulties',
        title: 'Difficulties',
    },
    {
        key: 'clearTypes',
        title: 'Clear Types',
    }
];

const difficulties: {difficulty: SdvxDifficulty, level: number}[] = [];
for (let i = 1; i <= 20; i++) {
    for (const key of Object.keys(SdvxDifficulty)) {
        difficulties.push({
            difficulty: SdvxDifficulty[key as keyof typeof SdvxDifficulty],
            level: i,
        });
    }
}

const clearTypes: SdvxClearType[] = Object.keys(SdvxClearType).map(
    key => SdvxClearType[key as keyof typeof SdvxClearType]
);

const DifficultiesScene = () => (
    <FlatList
        data={difficulties}
        renderItem={({item}) => (
            <View style={{margin: 2}}>
                <SdvxDifficultyItem difficulty={item.difficulty} level={item.level} />
            </View>
        )}
    />
);

const ClearTypesScene = () => (
    <FlatList
        data={clearTypes}
        renderItem={({item}) => (
            <View style={{margin: 2}}>
                <SdvxClearTypeItem clearType={item}/>
            </View>
        )}
    />
);

const renderScene = SceneMap({
    difficulties: DifficultiesScene,
    clearTypes: ClearTypesScene,
});

export default function Sdvx() {
    const layout = useWindowDimensions();
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <TabView
            onIndexChange={setTabIndex}
            navigationState={{index: tabIndex, routes: tabRoutes}}
            renderScene={renderScene}
            initialLayout={{width: layout.width}}
        />
    );
}
