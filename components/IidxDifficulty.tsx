import {IidxDifficulty} from "@/enums/iidx-difficulty";
import {memo} from "react";
import {IidxPlayStyle} from "@/enums/iidx-play-style";
import {Text, View} from "react-native";

export type IidxDifficultyProps = {
    difficulty: IidxDifficulty;
    level: number;
}

const Component = ({difficulty, level}: IidxDifficultyProps) => {
    const getPlayStyle = () => {
        switch(difficulty) {
            case IidxDifficulty.SPB:
            case IidxDifficulty.SPN:
            case IidxDifficulty.SPH:
            case IidxDifficulty.SPA:
            case IidxDifficulty.SPL:
                return IidxPlayStyle.SP;
            case IidxDifficulty.DPB:
            case IidxDifficulty.DPN:
            case IidxDifficulty.DPH:
            case IidxDifficulty.DPA:
            case IidxDifficulty.DPL:
                return IidxPlayStyle.DP;
        }
    }

    const getDifficultyName = () => {
        switch(difficulty) {
            case IidxDifficulty.SPB:
            case IidxDifficulty.DPB:
                return 'BEGINNER';
            case IidxDifficulty.SPN:
            case IidxDifficulty.DPN:
                return 'NORMAL';
            case IidxDifficulty.SPH:
            case IidxDifficulty.DPH:
                return 'HYPER';
            case IidxDifficulty.SPA:
            case IidxDifficulty.DPA:
                return 'ANOTHER';
            case IidxDifficulty.SPL:
            case IidxDifficulty.DPL:
                return 'LEGGENDARIA';
        }
    }

    const getDifficultyColor = () => {
        switch(difficulty) {
            case IidxDifficulty.SPB:
            case IidxDifficulty.DPB:
                return '#3f6934';
            case IidxDifficulty.SPN:
            case IidxDifficulty.DPN:
                return '#385c70';
            case IidxDifficulty.SPH:
            case IidxDifficulty.DPH:
                return '#a28c1e';
            case IidxDifficulty.SPA:
            case IidxDifficulty.DPA:
                return '#8f0000';
            case IidxDifficulty.SPL:
            case IidxDifficulty.DPL:
                return '#70008f';
        }
    }

    return (
        <View style={{flexDirection: 'row', borderWidth: 2, borderColor: 'black'}}>
            <Text style={{
                color: 'white',
                backgroundColor: '#4f4f4f',
                paddingInline: 4,
            }}>{getPlayStyle()}</Text>
            <View style={{width: 2, backgroundColor: 'black'}}></View>
            <Text style={{
                color: 'white',
                backgroundColor: getDifficultyColor(),
                paddingInline: 4,
            }}>{getDifficultyName()}</Text>
            <View style={{width: 2, backgroundColor: 'black'}}></View>
            <Text style={{
                color: 'white',
                paddingInline: 4,
                backgroundColor: getDifficultyColor(),
            }}>{level}</Text>
        </View>
    )
}

export const IidxDifficultyItem = memo(Component);
