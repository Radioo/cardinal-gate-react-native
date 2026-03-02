import GameTabLayout from "@/components/shared/GameTabLayout";
import AntDesign from "@expo/vector-icons/AntDesign";
import {Entypo} from "@expo/vector-icons";

export default function Layout() {
    return (
        <GameTabLayout tabs={[
            {
                name: "Profile",
                icon: (color) => <AntDesign name="user" size={24} color={color} />,
            },
            {
                name: "Skill",
                icon: (color) => <Entypo name="list" size={24} color={color} />,
            },
        ]} />
    );
}
