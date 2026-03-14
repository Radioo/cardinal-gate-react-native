import {Text} from "@/components/ui/text";
import useIidxProfile from "@/hooks/queries/useIidxProfile";
import {View} from "react-native";
import useTheme from "@/hooks/useTheme";
import {User, Hash, Star, MousePointerClick} from "lucide-react-native";
import ProfileRow from "@/components/shared/ProfileRow";
import ProfileLayout from "@/components/shared/ProfileLayout";
import CardGrid from "@/components/shared/CardGrid";
import {formatArcadeId} from "@/services/game";

export default function Profile() {
    const query = useIidxProfile();
    const theme = useTheme();

    return (
        <ProfileLayout query={query}>
            {(data) => (
                <CardGrid>
                    <ProfileRow
                        icon={<User size={24} color={theme.text}/>}
                        label={`DJ ${data.dj_name}`}
                        value={<Text className="text-base leading-6 font-mono">{formatArcadeId(data.iidx_id)}</Text>}
                    />
                    <ProfileRow
                        icon={<Hash size={24} color={theme.text}/>}
                        label="Play count"
                        value={
                            <View>
                                <Text className="text-base leading-6 text-right">{data.sp_play_count.toLocaleString()} SP</Text>
                                <Text className="text-base leading-6 text-right">{data.dp_play_count.toLocaleString()} DP</Text>
                            </View>
                        }
                    />
                    <ProfileRow
                        icon={<Star size={24} color={theme.text}/>}
                        label="Class"
                        value={
                            <View>
                                <Text className="text-base leading-6 text-right">SP {data.sp_class}</Text>
                                <Text className="text-base leading-6 text-right">DP {data.dp_class}</Text>
                            </View>
                        }
                    />
                    <ProfileRow
                        icon={<MousePointerClick size={24} color={theme.text}/>}
                        label="Inputs"
                        value={
                            <View>
                                <Text className="text-base leading-6 text-right">{data.key_count.toLocaleString()} Keys</Text>
                                <Text className="text-base leading-6 text-right">{data.scratch_count.toLocaleString()} Scratches</Text>
                            </View>
                        }
                    />
                </CardGrid>
            )}
        </ProfileLayout>
    )
}
