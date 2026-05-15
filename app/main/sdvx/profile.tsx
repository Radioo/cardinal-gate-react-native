import {Text} from "@/components/ui/text";
import useSdvxProfile from "@/hooks/queries/useSdvxProfile";
import useTheme from "@/hooks/useTheme";
import {User, Star, Hexagon} from "lucide-react-native";
import ProfileRow from "@/components/shared/ProfileRow";
import ProfileLayout from "@/components/shared/ProfileLayout";
import CardGrid from "@/components/shared/CardGrid";
import {formatArcadeId} from "@/services/game";

export default function Profile() {
    const query = useSdvxProfile();
    const theme = useTheme();

    return (
        <ProfileLayout query={query}>
            {(data) => (
                <CardGrid>
                    <ProfileRow
                        icon={<User size={24} color={theme.text}/>}
                        label={data.name}
                        value={<Text className="text-base leading-6 font-mono">{formatArcadeId(data.id)}</Text>}
                    />
                    <ProfileRow
                        icon={<Star size={24} color={theme.text}/>}
                        label="Skill Level"
                        value={data.skill_level}
                    />
                    {data.volforce !== null && (
                        <ProfileRow
                            icon={<Hexagon size={24} color={theme.text}/>}
                            label="VOLFORCE"
                            value={`${data.volforce.formattedValue} ${data.volforce.name}`}
                        />
                    )}
                </CardGrid>
            )}
        </ProfileLayout>
    )
}
