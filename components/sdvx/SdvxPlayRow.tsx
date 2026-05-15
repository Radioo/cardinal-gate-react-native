import {SdvxPlay} from "@/types/sdvx-play";
import {Text} from "@/components/ui/text";
import {View} from "react-native";
import useTheme from "@/hooks/useTheme";
import SdvxDifficultyItem from "@/components/sdvx/SdvxDifficultyItem";
import SdvxClearTypeItem from "@/components/sdvx/SdvxClearTypeItem";
import StatCell from "@/components/shared/chip/StatCell";
import PlayRowShell from "@/components/shared/layout/PlayRowShell";
import {hexToRgba} from "@/lib/color-utils";

type SdvxPlayRowProps = {
    play: SdvxPlay;
}

const STAT_VALUE_LG_STYLE = {letterSpacing: 0.5, lineHeight: 22} as const;

export default function SdvxPlayRow({play}: SdvxPlayRowProps) {
    const theme = useTheme();
    const mutedText = hexToRgba(theme.text, 0.55);
    const exScore = play.ex_score;
    const hasExScore = exScore !== null && exScore > 0;

    return (
        <PlayRowShell
            title={play.title}
            artist={play.artist}
            difficultyChip={<SdvxDifficultyItem difficulty={play.difficulty} level={play.level}/>}
        >
            <View className="flex-row items-start">
                <StatCell label="GRADE">
                    <Text
                        className="font-extrabold text-[26px]"
                        style={{
                            color: theme.primary,
                            letterSpacing: 1.5,
                            lineHeight: 28,
                        }}
                        numberOfLines={1}
                    >
                        {play.grade}
                    </Text>
                </StatCell>

                <StatCell label="SCORE">
                    <View className="items-center">
                        <Text
                            className="font-mono font-bold text-[20px]"
                            style={STAT_VALUE_LG_STYLE}
                            numberOfLines={1}
                        >
                            {play.score.toLocaleString()}
                        </Text>
                        {hasExScore ? (
                            <Text
                                className="font-mono text-[10px] mt-0.5"
                                style={{color: mutedText, letterSpacing: 0.3}}
                                numberOfLines={1}
                            >
                                {exScore.toLocaleString()} EX
                            </Text>
                        ) : null}
                    </View>
                </StatCell>

                <StatCell label="CLEAR LAMP">
                    <SdvxClearTypeItem clearType={play.clear_type}/>
                </StatCell>
            </View>
        </PlayRowShell>
    );
}
