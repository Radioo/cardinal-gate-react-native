import {ThemedText} from "@/components/ThemedText";
import useSdvxProfile from "@/hooks/queries/useSdvxProfile";
import FullScreenLoader from "@/components/FullScreenLoader";
import ErrorScreen from "@/components/ErrorScreen";
import {ScrollView, StyleSheet} from "react-native";
import ThemedCard from "@/components/ThemedCard";
import {useTheme} from "@/hooks/useTheme";
import AntDesign from "@expo/vector-icons/AntDesign";
import {Feather} from "@expo/vector-icons";

export default function Profile() {
    const theme = useTheme();
    const profileQuery = useSdvxProfile();

    if(profileQuery.isPending) {
        return <FullScreenLoader/>
    }

    if(profileQuery.isError) {
        return <ErrorScreen error={profileQuery.error} onRetry={profileQuery.refetch}/>
    }

    return (
        <ScrollView>
            <ThemedCard style={styles.card}>
                <AntDesign name="user" size={24} color={theme.text}/>
                <ThemedText style={{marginRight: 'auto'}}>{profileQuery.data.name}</ThemedText>
                <ThemedText style={{fontFamily: 'monospace'}}>
                    {profileQuery.data.id.toString().slice(0, 4)}-{profileQuery.data.id.toString().slice(4, 8)}
                </ThemedText>
            </ThemedCard>
            <ThemedCard style={styles.card}>
                <AntDesign name="staro" size={24} color={theme.text} />
                <ThemedText style={{marginRight: 'auto'}}>Skill Level</ThemedText>
                <ThemedText>{profileQuery.data.skill_level}</ThemedText>
            </ThemedCard>
            {profileQuery.data.volforce === null ? null : (
                <ThemedCard style={styles.card}>
                    <Feather name="hexagon" size={24} color={theme.text} />
                    <ThemedText style={{marginRight: 'auto'}}>VOLFORCE</ThemedText>
                    <ThemedText>{profileQuery.data.volforce.formattedValue} {profileQuery.data.volforce.name}</ThemedText>
                </ThemedCard>
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        margin: 5,
    },
})
