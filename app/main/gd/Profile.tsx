import {useEffect, useState} from "react";
import {GdProfileResponse} from "@/types/gd-profile-response";
import {useTheme} from "@/hooks/useTheme";
import fetchApi from "@/services/api";
import FullScreenLoader from "@/components/FullScreenLoader";
import ThemedCard from "@/components/ThemedCard";
import {View} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import {ThemedText} from "@/components/ThemedText";
import {useGdStore} from "@/store/gd";

export default function Profile() {
    const [loading, setLoading] = useState(true);
    const {profileData, setProfileData} = useGdStore();
    const theme = useTheme();

    useEffect(() => {
        fetchApi<GdProfileResponse>('/gd/profile').then(data => {
            console.log('data', data);
            setProfileData(data);
            setLoading(false);
        })
    }, [setProfileData])

    if(loading) {
        return <FullScreenLoader></FullScreenLoader>
    }

    return (
        <ThemedCard style={{margin: 10}}>
            <View style={{flexDirection: 'row', alignContent: 'center', gap: 5}}>
                <AntDesign name="user" size={24} color={theme.text} />
                <ThemedText>{profileData?.name}</ThemedText>
            </View>
        </ThemedCard>
    )
}
