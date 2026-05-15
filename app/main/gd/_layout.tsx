import GameTabLayout from "@/components/shared/layout/GameTabLayout";
import {User, List} from "lucide-react-native";

export default function Layout() {
    return (
        <GameTabLayout tabs={[
            {
                name: "profile",
                title: "Profile",
                icon: (color) => <User size={24} color={color} />,
            },
            {
                name: "skill",
                title: "Skill",
                icon: (color) => <List size={24} color={color} />,
            },
        ]} />
    );
}
