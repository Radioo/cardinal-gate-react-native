import useTheme from "@/hooks/useTheme";
import {User} from "lucide-react-native";
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
                    icon={<User size={24} color={theme.text}/>}
                    label={data.name}
                    value=""
                />
            )}
        </ProfileLayout>
    )
}
