import {SdvxDifficulty} from "@/enums/sdvx-difficulty";
import SdvxDifficultyItem from "@/components/sdvx/SdvxDifficultyItem";
import {FlatList, useWindowDimensions} from "react-native";
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

const MAX_LEVEL = 20;

const difficulties = Array.from({length: MAX_LEVEL}, (_, i) => i + 1).flatMap(level =>
    Object.values(SdvxDifficulty).map(difficulty => ({difficulty, level}))
);

const clearTypes: SdvxClearType[] = Object.values(SdvxClearType);

const DifficultiesScene = () => (
    <FlatList
        data={difficulties}
        renderItem={({item}) => (
            <SdvxDifficultyItem difficulty={item.difficulty} level={item.level} />
        )}
    />
);

const ClearTypesScene = () => (
    <FlatList
        data={clearTypes}
        renderItem={({item}) => (
            <SdvxClearTypeItem clearType={item}/>
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
