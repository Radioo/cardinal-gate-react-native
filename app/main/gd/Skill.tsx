import {ThemedText} from "@/components/ThemedText";
import {useEffect, useState} from "react";
import {GdMusicSkillItem, GdSkillDataResponse} from "@/types/gd-skill-data-response";
import FullScreenLoader from "@/components/FullScreenLoader";
import {useGdStore} from "@/store/gd";
import {Picker} from "@react-native-picker/picker";
import {useTheme} from "@/hooks/useTheme";
import {Game} from "@/types/game";
import fetchApi from "@/services/api";
import {Route, SceneMap, SceneRendererProps, TabBar, TabBarProps, TabView} from "react-native-tab-view";
import {FlatList, Text, useWindowDimensions, View} from "react-native";
import * as React from "react";
import ThemedCard from "@/components/ThemedCard";
import GdDifficulty from "@/components/GdDifficulty";
import GradientText from "@/components/GradientText";

const renderTabBar = <T extends Route, >(props: TabBarProps<T>) => {
    const theme = useTheme();

    return (<TabBar {...props} style={{
        backgroundColor: theme.background,
        borderColor: 'red',
        outlineColor: 'red',
        shadowColor: 'red',
    }}
                    activeColor={theme.primary}
                    inactiveColor={theme.text}
                    pressColor={theme.primarySurface}
                    indicatorStyle={{backgroundColor: theme.primary}}
    />)
}

function SkillList({items}: {items: GdMusicSkillItem[]}) {
    if(items.length === 0) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ThemedText>No data</ThemedText>
            </View>
        )
    }

    const formatValue = (value: number) => {
        if(value < 0) {
            return '???';
        }

        return (value / 100).toFixed(2);
    }

    return (
        <FlatList data={items}
                  keyExtractor={(_item, index) => index.toString()}
                  renderItem={({item, index}) => (
            <ThemedCard style={{
                flexDirection: 'row',
                gap: 5,
                alignItems: 'center',
                marginLeft: 10,
                marginRight: 10,
                marginTop: index === 0 ? 10 : 5,
                marginBottom: index === items.length - 1 ? 10 : 5,
                flex: 1,
            }}>
                <ThemedText style={{
                    lineHeight: 40,
                    fontSize: 30,
                    fontFamily: 'monospace',
                    fontWeight: 'bold',
                }}>#{(index + 1).toString().padStart(2, '0')}</ThemedText>
                <View style={{flexDirection: 'column', justifyContent: 'space-between', flex: 1}}>
                    <ThemedText numberOfLines={1} ellipsizeMode="tail">{item.title}</ThemedText>
                    <GdDifficulty difficulty={item.difficulty}/>
                </View>
                <View>
                    <ThemedText style={{fontWeight: 'bold', textAlign: 'right'}}>{formatValue(item.skill)}</ThemedText>
                    <ThemedText style={{textAlign: 'right'}}>{formatValue(item.percentage)}%</ThemedText>
                </View>
            </ThemedCard>
        )} />
    )
}

type TotalSkillProps = {
    name: string;
    skill?: number;
    allMusicSkill?: number;
}

function TotalSkill(props: TotalSkillProps) {
    const theme = useTheme();

    const formatNumber = (number: number | undefined) => {
        if(number === undefined) {
            return 'No data';
        }

        return (number / 100).toFixed(2);
    }

    const getNumberColor = (number: number | undefined) => {
        if(number === undefined) {
            return '#888888';
        }

        return theme.text;
    }

    const getNumberGradient = (number: number | undefined): readonly [string, string, ...string[]] => {
        if(number === undefined) {
            return ['#888888', '#888888'];
        }

        if(number >= 850000) {
            return ['#6ABBC6', '#57FF71', '#FFF147', '#FFA09B', '#C17DEE'];
        }
        if(number >= 800000) {
            return ['#D6A616', '#FEFC8D'];
        }
        if(number >= 750000) {
            return ['#9D9D9D', '#E9FCFA'];
        }
        if(number >= 700000) {
            return ['#D35E04', '#FDD0BB'];
        }
        if(number >= 650000) {
            return ['#E41122', '#FFF9FC'];
        }
        if(number >= 600000) {
            return ['#E41122', '#E41122'];
        }
        if(number >= 550000) {
            return ['#EF41F1', '#FEF9FF'];
        }
        if(number >= 500000) {
            return ['#EF41F1', '#EF41F1'];
        }
        if(number >= 450000) {
            return ['#1C84F5', '#FCFFFF'];
        }
        if(number >= 400000) {
            return ['#1C84F5', '#1C84F5'];
        }
        if(number >= 350000) {
            return ['#05CF2B', '#F7FCF8'];
        }
        if(number >= 300000) {
            return ['#05CF2B', '#05CF2B'];
        }
        if(number >= 250000) {
            return ['#FFD800', '#FFFFF8'];
        }
        if(number >= 200000) {
            return ['#FFD800', '#FFD800'];
        }
        if(number >= 150000) {
            return ['#FF8C2B', '#FBF6F2'];
        }
        if(number >= 100000) {
            return ['#FF8C2B', '#FF8C2B'];
        }

        return ['#ffffff', '#ffffff'];
    }

    return (
        <View style={{flex: 1}}>
            <ThemedText style={{textAlign: 'center'}}>{props.name}</ThemedText>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <View style={{backgroundColor: '#272727', borderColor: '#000000', borderWidth: 5}}>
                    <GradientText style={{
                        textAlign: 'center',
                        color: getNumberColor(props.skill),
                        fontSize: 30,
                        lineHeight: 40,
                        fontWeight: 'bold',
                        paddingLeft: 10,
                        paddingRight: 10,
                    }}
                                  colors={getNumberGradient(props.skill)}
                                  start={{x: 0.5, y: 0.25}}
                                  end={{x: 0.5, y: 0.75}}
                    >
                        {formatNumber(props.skill)}
                    </GradientText>
                </View>
            </View>
            <ThemedText style={{textAlign: 'center'}}>
                All music skill: <ThemedText style={{color: getNumberColor(props.allMusicSkill)}}>{formatNumber(props.allMusicSkill)}</ThemedText>
            </ThemedText>
        </View>
    )
}

const routes = [
    { key: 'hot_dm', title: '🥁 HOT' },
    { key: 'other_dm', title: '🥁 OTHER' },
    { key: 'hot_gf', title: '🎸 HOT' },
    { key: 'other_gf', title: '🎸 OTHER' },
];

export default function() {
    const [loadingState, setLoadingState] = useState(true);
    const [selectedGameIndex, setSelectedGameIndex] = useState<number | null>(null);
    const [currentTab, setCurrentTab] = useState(0);
    const {profileData} = useGdStore();
    const [skillData, setSkillData] = useState<GdSkillDataResponse | null>(null);
    const theme = useTheme();
    const layout = useWindowDimensions();
    const loading = loadingState || profileData === null;

    useEffect(() => {
        if(selectedGameIndex === null) {
            return;
        }

        console.log('selectedGame', selectedGameIndex);

        setLoadingState(true);
        fetchApi<GdSkillDataResponse>(`/gd/skill/${profileData?.games[selectedGameIndex].version}`).then(data => {
            console.log('skillData', data);
            setSkillData(data);
            setLoadingState(false);
        });
    }, [selectedGameIndex]);

    useEffect(() => {
        if(selectedGameIndex === null) {
            setSelectedGameIndex(0);
        }
    }, [loading]);

    const onGameChange = (index: number) => {
        setSelectedGameIndex(index);
    }

    const renderScene = SceneMap({
        hot_dm: () => <SkillList items={skillData?.skill_data.dm?.new ?? []}/>,
        other_dm: () => <SkillList items={skillData?.skill_data.dm?.exist ?? []}/>,
        hot_gf: () => <SkillList items={skillData?.skill_data.gf?.new ?? []}/>,
        other_gf: () => <SkillList items={skillData?.skill_data.gf?.exist ?? []}/>,
    });

    if(loading) {
        return <FullScreenLoader></FullScreenLoader>
    }

    return (
        <>
            <Picker style={{
                color: theme.text,
                backgroundColor: theme.background,
            }}
                    selectedValue={selectedGameIndex}
                    onValueChange={(_itemValue, itemIndex) => {
                        onGameChange(itemIndex);
                    }}
                    selectionColor={theme.primary}
                    dropdownIconColor={theme.text}
                    dropdownIconRippleColor={theme.primarySurface}
                >
                {profileData?.games.map(((game, index) => (
                    <Picker.Item key={index} label={game.name} value={index}/>
                )))}
            </Picker>
            <View style={{flexDirection: 'row', backgroundColor: theme.background}}>
                <TotalSkill name="🥁 Skill"
                            skill={skillData?.skill_data.dm?.skill}
                            allMusicSkill={skillData?.skill_data.dm?.all_music_skill}
                />
                <TotalSkill name="🎸 Skill"
                            skill={skillData?.skill_data.gf?.skill}
                            allMusicSkill={skillData?.skill_data.gf?.all_music_skill}
                />
            </View>
            <TabView onIndexChange={setCurrentTab}
                     navigationState={{index: currentTab, routes}}
                     renderScene={renderScene}
                     initialLayout={{width: layout.width}}
                     renderTabBar={renderTabBar}
            />
        </>
    )
}
