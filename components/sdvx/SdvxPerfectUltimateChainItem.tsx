import React from "react";
import {StyleProp, ViewStyle} from "react-native";
import {SDVX_CHIP_HEIGHT} from "@/components/sdvx/SdvxDifficultyItem";
import AnimatedClearChip, {AnimatedChipPalette} from "@/components/shared/chip/AnimatedClearChip";

const LIGHT: AnimatedChipPalette = {
    bg: ["#fff4cc", "#ffe1d2", "#ecf6cf", "#fff4cc"],
    text: ["#8c7700", "#b94f1f", "#467c1f", "#8c7700"],
    border: ["#dbb840", "#e89366", "#9bb853", "#dbb840"],
};

const DARK: AnimatedChipPalette = {
    bg: ["#3a3015", "#3a2418", "#22341a", "#3a3015"],
    text: ["#ffe27a", "#ffb280", "#bce283", "#ffe27a"],
    border: ["#d4b542", "#e89466", "#7ec854", "#d4b542"],
};

type Props = {
    style?: StyleProp<ViewStyle>;
};

export default function SdvxPerfectUltimateChainItem({style}: Props) {
    return (
        <AnimatedClearChip
            label="PUC"
            height={SDVX_CHIP_HEIGHT}
            light={LIGHT}
            dark={DARK}
            style={style}
        />
    );
}
