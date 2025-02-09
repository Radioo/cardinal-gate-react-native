import MaskedView from "@react-native-masked-view/masked-view";
import {StyleProp, Text, TextStyle} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import * as React from "react";

type GradientTextProps = {
    colors: readonly [string, string, ...string[]];
    style: StyleProp<TextStyle>;
    start?: { x: number, y: number };
    end?: { x: number, y: number };
    children: React.ReactNode;
    backgroundColor?: string;
}

export default function GradientText(props: GradientTextProps) {
    return (
        <MaskedView maskElement={<Text style={[props.style, { backgroundColor: 'transparent' }]}>{props.children}</Text>}>
            <LinearGradient
                colors={props.colors}
                start={props.start ?? { x: 0, y: 0 }}
                end={props.end ?? { x: 1, y: 0 }}
            >
                <Text style={[props.style, { opacity: 0 }]}>{props.children}</Text>
            </LinearGradient>
        </MaskedView>
    );
}
