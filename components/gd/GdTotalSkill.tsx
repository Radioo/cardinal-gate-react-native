import ThemedText from "@/components/themed/ThemedText";
import {StyleSheet, View} from "react-native";
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
        <View style={styles.container}>
            <ThemedText style={styles.centered}>{name}</ThemedText>
            <View style={styles.skillRow}>
                <View style={styles.skillBox}>
                    <GradientText style={[styles.skillText, {color: skillColor}]}
                                  colors={getSkillGradient(skill)}
                                  start={{x: 0.5, y: 0.25}}
                                  end={{x: 0.5, y: 0.75}}
                    >
                        {formatGdSkillValue(skill)}
                    </GradientText>
                </View>
            </View>
            <ThemedText style={styles.centered}>
                All music skill: <ThemedText style={{color: allMusicColor}}>{formatGdSkillValue(allMusicSkill)}</ThemedText>
            </ThemedText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1},
    centered: {textAlign: 'center'},
    skillRow: {flexDirection: 'row', justifyContent: 'center'},
    skillBox: {backgroundColor: '#272727', borderColor: '#000000', borderWidth: 5},
    skillText: {
        textAlign: 'center',
        fontSize: 30,
        lineHeight: 40,
        fontWeight: 'bold',
        paddingLeft: 10,
        paddingRight: 10,
    },
});
