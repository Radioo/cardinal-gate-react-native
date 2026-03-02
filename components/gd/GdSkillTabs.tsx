import {Route, SceneMap, TabBar, TabBarItem, TabBarProps, TabView} from "react-native-tab-view";
import * as React from "react";
import {useMemo, useState} from "react";
import GdSkillList from "@/components/gd/GdSkillList";
import {useWindowDimensions} from "react-native";
import useTheme from "@/hooks/useTheme";
import {GdSkillDataResponse} from "@/types/gd-skill-data-response";
import ThemedText from "@/components/themed/ThemedText";

type GdSkillTabsProps = {
    data: GdSkillDataResponse | undefined;
}

const RenderTabBar = (props: TabBarProps<Route>) => {
    const theme = useTheme();

    const renderLabel = ({route, focused}: {route: Route; focused: boolean}) => (
        <ThemedText
            numberOfLines={1}
            style={{
                color: focused ? theme.primary : theme.text,
                fontWeight: '600',
            }}
        >
            {route.title}
        </ThemedText>
    );

    return (
        <TabBar {...props}
                style={{backgroundColor: theme.background}}
                activeColor={theme.primary}
                inactiveColor={theme.text}
                pressColor={theme.primarySurface}
                indicatorStyle={{backgroundColor: theme.primary}}
                renderTabBarItem={(itemProps) => (
                    <TabBarItem {...itemProps} key={itemProps.route.key} label={renderLabel} />
                )}
        />
    );
}

const routes = [
    {key: 'hot_dm', title: '🥁 HOT'},
    {key: 'other_dm', title: '🥁 OTHER'},
    {key: 'hot_gf', title: '🎸 HOT'},
    {key: 'other_gf', title: '🎸 OTHER'},
];

export default function GdSkillTabs({data}: GdSkillTabsProps) {
    const layout = useWindowDimensions();
    const [currentTab, setCurrentTab] = useState(0);

    const renderScene = useMemo(() => {
        return SceneMap({
            hot_dm: () => <GdSkillList items={data?.skill_data.dm.exist ?? []} />,
            other_dm: () => <GdSkillList items={data?.skill_data.dm.new ?? []} />,
            hot_gf: () => <GdSkillList items={data?.skill_data.gf.exist ?? []} />,
            other_gf: () => <GdSkillList items={data?.skill_data.gf.new ?? []} />,
        });
    }, [data]);

    return (
        <TabView onIndexChange={setCurrentTab}
                 navigationState={{index: currentTab, routes}}
                 renderScene={renderScene}
                 initialLayout={{width: layout.width}}
                 renderTabBar={RenderTabBar}
        />
    )
}
