import {useMemo, useState} from "react";
import FullScreenLoader from "@/components/shared/FullScreenLoader";
import {Picker, PickerProps} from "@react-native-picker/picker";
import useTheme from "@/hooks/useTheme";
import {Platform, View} from "react-native";
import GdSkillTabs from "@/components/gd/GdSkillTabs";
import useGdProfile from "@/hooks/queries/useGdProfile";
import useGdSkill from "@/hooks/queries/useGdSkill";
import ErrorScreen from "@/components/shared/ErrorScreen";
import GdTotalSkill from "@/components/gd/GdTotalSkill";
import {GdGameMode} from "@/enums/gd-game-mode";

function useNativePickerProps(theme: ReturnType<typeof useTheme>): PickerProps {
    if (Platform.OS === 'web') return {};
    return {
        selectionColor: theme.primary,
        dropdownIconColor: theme.text,
        dropdownIconRippleColor: theme.primarySurface,
    };
}

export default function Skill() {
    const [selectedGameIndex, setSelectedGameIndex] = useState(0);
    const profileQuery = useGdProfile();
    const selectedVersion = profileQuery.data?.games[selectedGameIndex]?.version;
    const skillQuery = useGdSkill(selectedVersion);
    const theme = useTheme();
    const nativePickerProps = useNativePickerProps(theme);

    const pickerStyle = useMemo(() => ({
        color: theme.text,
        backgroundColor: theme.background,
        borderColor: theme.background,
        padding: 10,
        borderRadius: 0,
        outline: 'none',
    }), [theme]);

    if (profileQuery.isPending) return <FullScreenLoader/>;
    if (profileQuery.isError) return <ErrorScreen error={profileQuery.error} onRetry={profileQuery.refetch}/>;
    if (skillQuery.isError) return <ErrorScreen error={skillQuery.error} onRetry={skillQuery.refetch}/>;
    if (skillQuery.isPending || !skillQuery.data) return <FullScreenLoader/>;

    const drumSkill = skillQuery.data.skill_data[GdGameMode.DRUM_MANIA];
    const guitarSkill = skillQuery.data.skill_data[GdGameMode.GUITAR_FREAKS];

    return (
        <>
            <Picker
                style={pickerStyle}
                selectedValue={selectedGameIndex.toString()}
                onValueChange={(_itemValue, itemIndex) => setSelectedGameIndex(itemIndex)}
                mode="dropdown"
                {...nativePickerProps}
            >
                {profileQuery.data.games.map((game, index) => (
                    <Picker.Item key={index.toString()} label={game.name} value={index.toString()}/>
                ))}
            </Picker>
            <View className="flex-row" style={{backgroundColor: theme.background}}>
                <GdTotalSkill name="🥁 Skill" skill={drumSkill.skill} allMusicSkill={drumSkill.all_music_skill}/>
                <GdTotalSkill name="🎸 Skill" skill={guitarSkill.skill} allMusicSkill={guitarSkill.all_music_skill}/>
            </View>
            <GdSkillTabs data={skillQuery.data}/>
        </>
    );
}

