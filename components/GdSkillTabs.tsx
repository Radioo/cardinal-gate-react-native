import {Route, SceneMap, TabBar, TabBarItem, TabBarProps, TabView} from "react-native-tab-view";
import * as React from "react";
import {useMemo, useState} from "react";
import {SkillList} from "@/components/GdSkillList";
import {useWindowDimensions} from "react-native";
import {useTheme} from "@/hooks/useTheme";
import {GdSkillDataResponse} from "@/types/gd-skill-data-response";
import {ThemedText} from "@/components/ThemedText";

type GdSkillTabsProps = {
    data: GdSkillDataResponse;
}

const RenderTabBar = <T extends Route, >(props: TabBarProps<T>) => {
    const theme = useTheme();

    return (<TabBar {...props} style={{
        backgroundColor: theme.background,
    }}
                    activeColor={theme.primary}
                    inactiveColor={theme.text}
                    pressColor={theme.primarySurface}
                    indicatorStyle={{backgroundColor: theme.primary}}
                    renderTabBarItem={(props) => {
                        return (
                            <TabBarItem {...props}
                                key={props.route.key}
                                        label={(props) => (
                                            <ThemedText {...props}
                                                        numberOfLines={1}
                                                        style={{
                                                            color: props.focused ? theme.primary : theme.text,
                                                            fontWeight: '600',
                                                        }}
                                            >
                                                {props.route.title}
                                            </ThemedText>
                                        )}

                            />
                        )

                    }}
    />)
}

const routes = [
    {key: 'hot_dm', title: '🥁 HOT'},
    {key: 'other_dm', title: '🥁 OTHER'},
    {key: 'hot_gf', title: '🎸 HOT'},
    {key: 'other_gf', title: '🎸 OTHER'},
];

export function GdSkillTabs({data}: GdSkillTabsProps) {
    console.log('GdSkillTabs rerender');

    const layout = useWindowDimensions();
    const [currentTab, setCurrentTab] = useState(0);

    const renderScene = useMemo(() => {
        return SceneMap({
            hot_dm: () => <SkillList items={data?.skill_data.dm?.exist ?? []} />,
            other_dm: () => <SkillList items={data?.skill_data.dm?.new ?? []} />,
            hot_gf: () => <SkillList items={data?.skill_data.gf?.exist ?? []} />,
            other_gf: () => <SkillList items={data?.skill_data.gf?.new ?? []} />,
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
