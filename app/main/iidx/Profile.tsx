import ThemedText from "@/components/themed/ThemedText";
import useIidxProfile from "@/hooks/queries/useIidxProfile";
import {View} from "react-native";
import useTheme from "@/hooks/useTheme";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import ProfileRow from "@/components/shared/ProfileRow";
import ProfileLayout from "@/components/shared/ProfileLayout";
import {formatArcadeId} from "@/services/game";

export default function Profile() {
    const query = useIidxProfile();
    const theme = useTheme();

    return (
        <ProfileLayout query={query}>
            {(data) => (
                <>
                    <ProfileRow
                        icon={<AntDesign name="user" size={24} color={theme.text}/>}
                        label={`DJ ${data?.dj_name}`}
                        value={<ThemedText className="font-mono">{formatArcadeId(data?.iidx_id)}</ThemedText>}
                    />
                    <ProfileRow
                        icon={<MaterialIcons name="numbers" size={24} color={theme.text}/>}
                        label="Play count"
                        value={
                            <View>
                                <ThemedText className="text-right">{data?.sp_play_count.toLocaleString()} SP</ThemedText>
                                <ThemedText className="text-right">{data?.dp_play_count.toLocaleString()} DP</ThemedText>
                            </View>
                        }
                    />
                    <ProfileRow
                        icon={<MaterialIcons name="star-outline" size={24} color={theme.text}/>}
                        label="Class"
                        value={
                            <View>
                                <ThemedText className="text-right">SP {data?.sp_class}</ThemedText>
                                <ThemedText className="text-right">DP {data?.dp_class}</ThemedText>
                            </View>
                        }
                    />
                    <ProfileRow
                        icon={<MaterialCommunityIcons name="gesture-tap-button" size={24} color={theme.text}/>}
                        label="Inputs"
                        value={
                            <View>
                                <ThemedText className="text-right">{data?.key_count.toLocaleString()} Keys</ThemedText>
                                <ThemedText className="text-right">{data?.scratch_count.toLocaleString()} Scratches</ThemedText>
                            </View>
                        }
                    />
                </>
            )}
        </ProfileLayout>
    )
}
