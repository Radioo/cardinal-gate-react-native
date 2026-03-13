import ThemedText from "@/components/themed/ThemedText";
import {View} from "react-native";
import useTheme from "@/hooks/useTheme";
import GradientText from "@/components/themed/GradientText";
import {SKILL_GRADIENT_TIERS} from "@/constants/gd-skill-tiers";
import {formatGdSkillValue} from "@/services/game";

const NO_DATA_COLOR = '#888888';

type GdTotalSkillProps = {
    name: string;
    skill?: number;
    allMusicSkill?: number;
}

const getSkillGradient = (value: number | undefined): readonly [string, string, ...string[]] => {
    if (value === undefined) return [NO_DATA_COLOR, NO_DATA_COLOR];
    for (const tier of SKILL_GRADIENT_TIERS) {
        if (value >= tier.threshold) return tier.colors;
    }
    return ['#ffffff', '#ffffff'];
};

export default function GdTotalSkill({name, skill, allMusicSkill}: GdTotalSkillProps) {
    const theme = useTheme();
    const skillColor = skill === undefined ? NO_DATA_COLOR : theme.text;
    const allMusicColor = allMusicSkill === undefined ? NO_DATA_COLOR : theme.text;

    return (
        <View className="flex-1">
            <ThemedText className="text-center">{name}</ThemedText>
            <View className="flex-row justify-center">
                <View className="bg-[#272727] border-[5px] border-black">
                    <GradientText style={{color: skillColor}}
                                  className="text-center text-3xl leading-10 font-bold px-2.5"
                                  colors={getSkillGradient(skill)}
                                  start={{x: 0.5, y: 0.25}}
                                  end={{x: 0.5, y: 0.75}}
                    >
                        {formatGdSkillValue(skill)}
                    </GradientText>
                </View>
            </View>
            <ThemedText className="text-center">
                All music skill: <ThemedText style={{color: allMusicColor}}>{formatGdSkillValue(allMusicSkill)}</ThemedText>
            </ThemedText>
        </View>
    )
}
