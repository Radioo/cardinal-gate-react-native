import {GdDifficultyContainer} from "@/types/gd-difficulty-container";
import {Text, View} from "react-native";
import {GdDifficulty} from "@/enums/gd-difficulty";
import {lighten} from "polished";
import {memo} from "react";

type GdDifficultyProps = {
    difficulty: GdDifficultyContainer;
    theme: 'light' | 'dark';
}

const Component = ({difficulty, theme}: GdDifficultyProps) => {
    const getDifficultyColor = () => {
        switch(difficulty.difficulty) {
            case GdDifficulty.BASIC:
                return '#427486';
            case GdDifficulty.ADVANCED:
                return '#705b38';
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
                paddingLeft: 4,
                paddingRight: 4,
                borderWidth: 2,
                borderColor: '#000000',
            }}>{difficulty.type}</Text>
            <Text style={{
                color: 'white',
                backgroundColor: difficultyColor,
                paddingLeft: 4,
                paddingRight: 4,
                borderWidth: 2,
                borderColor: '#000000',
                borderLeftWidth: 0,
                borderRightWidth: 0,
            }}>{difficulty.difficulty}</Text>
            <Text style={{
                color: 'white',
                backgroundColor: difficultyColor,
                paddingLeft: 4,
                paddingRight: 4,
                borderWidth: 2,
                borderColor: '#000000',
            }}>
                {(difficulty.level / 100).toFixed(2)}
            </Text>
        </View>
    )
}

export const GdDifficultyInfo = memo(Component);
