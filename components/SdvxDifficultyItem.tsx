import {SdvxDifficulty} from "@/enums/sdvx-difficulty";
import {Text, View} from "react-native";
import {useTheme} from "@/hooks/useTheme";
import {darken, lighten} from "polished";

type SdvxDifficultyProps = {
    difficulty: SdvxDifficulty;
    level: number;
}

export default function SdvxDifficultyItem(props: SdvxDifficultyProps) {
    const theme = useTheme();

    let difficultyColor = '';
    let borderColor = '';
    switch(props.difficulty) {
        case SdvxDifficulty.NOVICE:
            difficultyColor = '#8666be';
            break;
        case SdvxDifficulty.ADVANCED:
            difficultyColor = '#ec0';
            break;
        case SdvxDifficulty.EXHAUST:
            difficultyColor = '#f33';
            break;
        case SdvxDifficulty.INFINITE:
            difficultyColor = '#e3d';
            break;
        case SdvxDifficulty.GRAVITY:
            difficultyColor = '#f60';
            break;
        case SdvxDifficulty.HEAVENLY:
            difficultyColor = '#31a0ff';
            break;
        case SdvxDifficulty.VIVID:
            difficultyColor = '#f19';
            break;
        case SdvxDifficulty.EXCEED:
            difficultyColor = '#3b71ff';
            break;
        case SdvxDifficulty.MAXIMUM:
            difficultyColor = '#9ac';
            break;
    }

    if(theme.scheme === 'dark') {
        difficultyColor = darken(0.25, difficultyColor);
        borderColor = lighten(0.25, difficultyColor);
    }
    else {
        difficultyColor = lighten(0.25, difficultyColor);
        borderColor = darken(0.25, difficultyColor);
    }

    return (
        <View style={{flexDirection: 'row', borderWidth: 2, borderColor: borderColor, alignSelf: 'flex-start'}}>
            <Text style={{
                paddingHorizontal: 5,
                backgroundColor: difficultyColor,
                fontWeight: 'bold',
                color: theme.text,
            }}>
                {props.difficulty}
            </Text>
            <View style={{width: 2, backgroundColor: borderColor}}></View>
            <Text style={{
                paddingHorizontal: 5,
                backgroundColor: difficultyColor,
                fontWeight: 'bold',
                color: theme.text,
            }}>
                {props.level}
            </Text>
        </View>
    )
}
