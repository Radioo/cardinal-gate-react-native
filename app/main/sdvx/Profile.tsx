import ThemedText from "@/components/themed/ThemedText";
import useSdvxProfile from "@/hooks/queries/useSdvxProfile";
import {StyleSheet} from "react-native";
import useTheme from "@/hooks/useTheme";
import AntDesign from "@expo/vector-icons/AntDesign";
import {Feather} from "@expo/vector-icons";
import ProfileRow from "@/components/shared/ProfileRow";
import ProfileLayout from "@/components/shared/ProfileLayout";
import {formatArcadeId} from "@/services/game";

export default function Profile() {
    const query = useSdvxProfile();
    const theme = useTheme();

    return (
        <ProfileLayout query={query}>
            {(data) => (
                <>
                    <ProfileRow
                        icon={<AntDesign name="user" size={24} color={theme.text}/>}
                        label={data.name}
                        value={<ThemedText style={styles.monospace}>{formatArcadeId(data.id)}</ThemedText>}
                    />
                    <ProfileRow
                        icon={<AntDesign name="staro" size={24} color={theme.text}/>}
                        label="Skill Level"
                        value={data.skill_level}
                    />
                    {data.volforce !== null && (
                        <ProfileRow
                            icon={<Feather name="hexagon" size={24} color={theme.text}/>}
                            label="VOLFORCE"
                            value={`${data.volforce.formattedValue} ${data.volforce.name}`}
                        />
                    )}
                </>
            )}
        </ProfileLayout>
    )
}

const styles = StyleSheet.create({
    monospace: {fontFamily: 'monospace'},
});
