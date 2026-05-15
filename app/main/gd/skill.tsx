import {useState} from "react";
import FullScreenLoader from "@/components/shared/FullScreenLoader";
import {View} from "react-native";
import GdSkillTabs from "@/components/gd/GdSkillTabs";
import useGdProfile from "@/hooks/queries/useGdProfile";
import useGdSkill from "@/hooks/queries/useGdSkill";
import ErrorScreen from "@/components/shared/ErrorScreen";
import GdTotalSkill from "@/components/gd/GdTotalSkill";
import {GdGameMode} from "@/enums/gd-game-mode";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import useTheme from "@/hooks/useTheme";

export default function Skill() {
    const [selectedGameIndex, setSelectedGameIndex] = useState(0);
    const profileQuery = useGdProfile();
    const selectedVersion = profileQuery.data?.games[selectedGameIndex]?.version;
    const skillQuery = useGdSkill(selectedVersion);
    const theme = useTheme();

    if (profileQuery.isPending) return <FullScreenLoader/>;
    if (profileQuery.isError) return <ErrorScreen error={profileQuery.error} onRetry={profileQuery.refetch}/>;
    if (skillQuery.isError) return <ErrorScreen error={skillQuery.error} onRetry={skillQuery.refetch}/>;
    if (skillQuery.isPending || !skillQuery.data) return <FullScreenLoader/>;

    const games = profileQuery.data.games;
    const selectedOption = {value: selectedGameIndex.toString(), label: games[selectedGameIndex].name};
    const drumSkill = skillQuery.data.skill_data[GdGameMode.DRUM_MANIA];
    const guitarSkill = skillQuery.data.skill_data[GdGameMode.GUITAR_FREAKS];

    return (
        <>
            <Select
                value={selectedOption}
                onValueChange={(option) => {
                    if (option) setSelectedGameIndex(Number(option.value));
                }}
            >
                <SelectTrigger style={{backgroundColor: theme.background}}>
                    <SelectValue placeholder="Select version"/>
                </SelectTrigger>
                <SelectContent>
                    {games.map((game, index) => (
                        <SelectItem key={index.toString()} value={index.toString()} label={game.name}/>
                    ))}
                </SelectContent>
            </Select>
            <View className="flex-row" style={{backgroundColor: theme.background}}>
                <GdTotalSkill name="🥁 Skill" skill={drumSkill.skill} allMusicSkill={drumSkill.all_music_skill}/>
                <GdTotalSkill name="🎸 Skill" skill={guitarSkill.skill} allMusicSkill={guitarSkill.all_music_skill}/>
            </View>
            <GdSkillTabs data={skillQuery.data}/>
        </>
    );
}
