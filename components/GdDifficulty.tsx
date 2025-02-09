import {GdDifficultyContainer} from "@/types/gd-difficulty-container";
import {Text, View} from "react-native";
import {GdDifficulty} from "@/enums/gd-difficulty";
import {useColorScheme} from "@/hooks/useColorScheme";
import {darken, lighten} from "polished";

type GdDifficultyProps = {
    difficulty: GdDifficultyContainer;
}

export default function GdDifficultyInfo({difficulty}: GdDifficultyProps) {
    const theme = useColorScheme();

    const getDifficultyColor = () => {
        switch(difficulty.difficulty) {
            case GdDifficulty.BASIC:
                return '#5ca2bb';
            case GdDifficulty.ADVANCED:
                return '#9f7f4f';
            case GdDifficulty.EXTREME:
                return '#a21e1e';
            case GdDifficulty.MASTER:
                return '#8f008f';
        }
    }

    const difficultyColor = theme === 'light' ? lighten(0.2, getDifficultyColor()) : getDifficultyColor();
    const typeColor = theme === 'light' ? lighten(0.2, '#4f4f4f') : '#4f4f4f';

    return (
        <View style={{flexDirection: 'row'}}>
            <Text style={{
                color: 'white',
                backgroundColor: typeColor,
                paddingLeft: 2,
                paddingRight: 2,
                textAlign: 'left',
                width: 58,
                borderWidth: 2,
                borderColor: darken(0.1, typeColor),
                borderRightWidth: 0,
            }}>{difficulty.type}</Text>
            <Text style={{
                color: 'white',
                backgroundColor: difficultyColor,
                paddingLeft: 2,
                paddingRight: 2,
                width: 82,
                textAlign: 'center',
                borderWidth: 2,
                borderColor: darken(0.1, difficultyColor),
            }}>{difficulty.difficulty}</Text>
            <Text style={{
                color: 'white',
                backgroundColor: difficultyColor,
                paddingLeft: 2,
                paddingRight: 2,
                width: 35,
                textAlign: 'right',
                borderWidth: 2,
                borderColor: darken(0.1, difficultyColor),
                borderLeftWidth: 0,
            }}>
                {(difficulty.level / 100).toFixed(2)}
            </Text>
        </View>
    )
}
