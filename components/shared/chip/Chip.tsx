import {Fragment} from "react";
import {StyleProp, Text, View, ViewStyle} from "react-native";

type ChipSegment = {
    text: string;
    background: string;
    textColor: string;
    /** 'label' = bold 10px (chip body). 'mono' = mono bold 12px (level/accent). 'stamp' = mono semibold 10px (play-style stamp). 'gd' = white 14px (no letter-spacing). */
    textStyle?: 'label' | 'mono' | 'stamp' | 'gd';
    paddingHorizontal?: number;
};

type ChipProps = {
    height: number;
    border: string;
    /** Outer border thickness in px. Defaults to 1. */
    borderWidth?: number;
    /** Whether to render a 1px divider between segments. Defaults to true. */
    showDividers?: boolean;
    segments: ChipSegment[];
    style?: StyleProp<ViewStyle>;
};

const TEXT_CLASS: Record<NonNullable<ChipSegment['textStyle']>, string> = {
    label: 'font-bold text-[10px]',
    mono: 'font-mono font-bold text-[12px]',
    stamp: 'font-mono font-semibold text-[10px]',
    gd: 'text-white text-[14px]',
};

const TEXT_STYLE: Record<NonNullable<ChipSegment['textStyle']>, {letterSpacing: number; lineHeight: number}> = {
    label: {letterSpacing: 1.6, lineHeight: 12},
    mono: {letterSpacing: 0.3, lineHeight: 12},
    stamp: {letterSpacing: 1.4, lineHeight: 12},
    gd: {letterSpacing: 0, lineHeight: 18},
};

/**
 * Tinted-section chip used by game-specific difficulty and clear-type indicators.
 * Each segment is rendered with the supplied background; segments are separated
 * by an optional 1px divider in the chip's border color.
 */
export default function Chip({height, border, borderWidth = 1, showDividers = true, segments, style}: ChipProps) {
    return (
        <View
            style={[
                {
                    flexDirection: 'row',
                    alignSelf: 'flex-start',
                    flexShrink: 0,
                    alignItems: 'center',
                    minHeight: height,
                    borderWidth,
                    borderColor: border,
                    overflow: 'hidden',
                },
                style,
            ]}
        >
            {segments.map((segment, index) => {
                const variant = segment.textStyle ?? 'label';
                return (
                    <Fragment key={index}>
                        {showDividers && index > 0 && <View style={{width: 1, backgroundColor: border}}/>}
                        <View
                            style={{
                                justifyContent: 'center',
                                paddingHorizontal: segment.paddingHorizontal ?? 8,
                                backgroundColor: segment.background,
                            }}
                        >
                            <Text
                                className={TEXT_CLASS[variant]}
                                style={{color: segment.textColor, ...TEXT_STYLE[variant]}}
                                numberOfLines={1}
                            >
                                {segment.text}
                            </Text>
                        </View>
                    </Fragment>
                );
            })}
        </View>
    );
}
