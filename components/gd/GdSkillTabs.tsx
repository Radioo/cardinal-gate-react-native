import {Route, SceneMap, TabBar, TabBarItem, TabBarProps, TabView} from "react-native-tab-view";
import * as React from "react";
import {useMemo, useState} from "react";
import GdSkillList from "@/components/gd/GdSkillList";
import {Text as RNText, useWindowDimensions} from "react-native";
import useTheme from "@/hooks/useTheme";
import {GdSkillDataResponse} from "@/types/gd-skill-data-response";
import {GdGameMode} from "@/enums/gd-game-mode";

type GdSkillTabsProps = {
    data: GdSkillDataResponse;
}

const RenderTabBar = (props: TabBarProps<Route>) => {
    const theme = useTheme();

    const renderLabel = ({route, focused}: {route: Route; focused: boolean}) => (
        <RNText
            numberOfLines={1}
            style={{
                color: focused ? theme.primary : theme.text,
                fontWeight: '600',
                fontSize: 14,
            }}
        >
            {route.title}
        </RNText>
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

/** Maps tab keys to their game mode and skill list category (exist=HOT, new=OTHER). */
const GD_TAB_CONFIG = [
    {key: 'hot_dm', title: '🥁 HOT', mode: GdGameMode.DRUM_MANIA, category: 'exist' as const},
    {key: 'other_dm', title: '🥁 OTHER', mode: GdGameMode.DRUM_MANIA, category: 'new' as const},
    {key: 'hot_gf', title: '🎸 HOT', mode: GdGameMode.GUITAR_FREAKS, category: 'exist' as const},
    {key: 'other_gf', title: '🎸 OTHER', mode: GdGameMode.GUITAR_FREAKS, category: 'new' as const},
] as const;

const routes = GD_TAB_CONFIG.map(({key, title}) => ({key, title}));

export default function GdSkillTabs({data}: GdSkillTabsProps) {
    const layout = useWindowDimensions();
    const [currentTab, setCurrentTab] = useState(0);

    const renderScene = useMemo(() => {
        const scenes = Object.fromEntries(
            GD_TAB_CONFIG.map(({key, mode, category}) => [
                key,
                () => <GdSkillList items={data.skill_data[mode][category]} />,
            ])
        );
        return SceneMap(scenes);
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
