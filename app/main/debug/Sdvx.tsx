import {SdvxDifficulty} from "@/enums/sdvx-difficulty";
import {LegendList} from "@legendapp/list";
import SdvxDifficultyItem from "@/components/SdvxDifficultyItem";
import {Text, useWindowDimensions, View} from "react-native";
import {SceneMap, TabView} from "react-native-tab-view";
import {useState} from "react";
import {SdvxClearType} from "@/enums/sdvx-clear-type";
import SdvxClearTypeItem from "@/components/SdvxClearTypeItem";

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

const DifficultiesScene = () => {
    const difficulties: {difficulty: SdvxDifficulty, level: number}[] = [];

    for(let i = 1; i <= 20; i++) {
        Object.keys(SdvxDifficulty).forEach(difficulty => {
            difficulties.push({
                difficulty: SdvxDifficulty[difficulty as keyof typeof SdvxDifficulty],
                level: i,
            })
        });
    }

    return (
        <LegendList
            data={difficulties}
            estimatedItemSize={34}
            renderItem={({item}) => (
                <View style={{margin: 2}}>
                    <SdvxDifficultyItem difficulty={item.difficulty} level={item.level} />
                </View>
            )}
        />
    );
};

const ClearTypesScene = () => {
    const clearTypes: SdvxClearType[] = [];

    Object.keys(SdvxClearType).forEach(clearType => {
        clearTypes.push(SdvxClearType[clearType as keyof typeof SdvxClearType]);
    });

    return (
        <LegendList
            data={clearTypes}
            estimatedItemSize={34}
            renderItem={({item}) => (
                <View style={{margin: 2}}>
                    <SdvxClearTypeItem clearType={item}/>
                </View>
            )}
        />
    );
}

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
