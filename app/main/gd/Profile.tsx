import useTheme from "@/hooks/useTheme";
import AntDesign from "@expo/vector-icons/AntDesign";
import useGdProfile from "@/hooks/queries/useGdProfile";
import ProfileRow from "@/components/shared/ProfileRow";
import ProfileLayout from "@/components/shared/ProfileLayout";

export default function Profile() {
    const query = useGdProfile();
    const theme = useTheme();

    return (
        <ProfileLayout query={query}>
            {(data) => (
                <ProfileRow
                    icon={<AntDesign name="user" size={24} color={theme.text}/>}
                    label={data.name}
                    value=""
                />
            )}
        </ProfileLayout>
    )
}
