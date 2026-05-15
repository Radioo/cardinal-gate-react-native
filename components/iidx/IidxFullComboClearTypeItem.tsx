import React from "react";
import {StyleProp, ViewStyle} from "react-native";
import {IidxClearType} from "@/enums/iidx-clear-type";
import {IIDX_CHIP_HEIGHT} from "@/components/iidx/IidxDifficultyItem";
import AnimatedClearChip from "@/components/shared/AnimatedClearChip";

const LIGHT = {
    bg: ['#dce5ff', '#ffd6ee', '#d2f1e1', '#dce5ff'],
    text: ['#274dc1', '#a72d77', '#1f7a52', '#274dc1'],
    border: ['#7a96e8', '#e08fc1', '#6cb893', '#7a96e8'],
} as const;

const DARK = {
    bg: ['#1d2548', '#3a1d34', '#1c3a2f', '#1d2548'],
    text: ['#b7c8ff', '#ffb4dd', '#9be4c1', '#b7c8ff'],
    border: ['#7faaff', '#ff8fe0', '#a4ffd4', '#7faaff'],
} as const;

type Props = {
    style?: StyleProp<ViewStyle>;
};

export default function IidxFullComboClearTypeItem({style}: Props) {
    return (
        <AnimatedClearChip
            label={IidxClearType.FULL_COMBO}
            height={IIDX_CHIP_HEIGHT}
            light={LIGHT}
            dark={DARK}
            style={style}
        />
    );
}
