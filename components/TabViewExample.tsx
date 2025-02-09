import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

const renderScene = SceneMap({
    first: () => <View style={{ flex: 1, backgroundColor: '#ff4081' }} />,
    second: () => <View style={{ flex: 1, backgroundColor: '#673ab7' }} />,
});

const routes = [
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
];

export default function TabViewExample() {
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
        />
    );
}
