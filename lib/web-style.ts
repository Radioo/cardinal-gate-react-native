import {Platform, ViewStyle, TextStyle} from "react-native";

/**
 * Web-only CSS properties that React Native's ViewStyle type doesn't include.
 * Use {@link webStyle} to spread them safely — they become `{}` on native.
 */
type WebOnlyStyle = {
    cursor?: 'pointer' | 'default' | 'text' | 'wait' | 'help';
};

export function webStyle(style: WebOnlyStyle): ViewStyle {
    if (Platform.OS !== 'web') return {};
    return style as ViewStyle;
}

/**
 * Web-only Text style properties (background-clip text gradients).
 * Spread on web only; ignored on native.
 */
export type WebTextStyle = TextStyle & {
    backgroundImage?: string;
    WebkitBackgroundClip?: 'text' | 'border-box' | 'padding-box' | 'content-box';
    WebkitTextFillColor?: string;
};

export function webTextStyle(style: WebTextStyle): TextStyle {
    if (Platform.OS !== 'web') return {};
    return style as TextStyle;
}
