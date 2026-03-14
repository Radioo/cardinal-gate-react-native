import GameTabLayout from "@/components/shared/GameTabLayout";
import {User, List} from "lucide-react-native";

export default function Layout() {
    return (
        <GameTabLayout tabs={[
            {
                name: "Profile",
                icon: (color) => <User size={24} color={color} />,
            },
            {
                name: "Skill",
                icon: (color) => <List size={24} color={color} />,
            },
        ]} />
    );
}
