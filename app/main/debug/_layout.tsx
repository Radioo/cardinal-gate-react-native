import GameTabLayout from "@/components/shared/GameTabLayout";
import {FontAwesome6, Ionicons} from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Layout() {
    return (
        <GameTabLayout tabs={[
            {
                name: "General",
                icon: (color) => <MaterialIcons name="miscellaneous-services" size={24} color={color} />,
            },
            {
                name: "Gd",
                title: "GD",
                icon: (color) => <FontAwesome6 name="drum" size={24} color={color} />,
            },
            {
                name: "Iidx",
                title: "IIDX",
                icon: (color) => <Ionicons name="disc" size={24} color={color} />,
            },
            {
                name: "Sdvx",
                title: "SDVX",
                icon: (color) => <MaterialIcons name="hexagon" size={24} color={color} />,
            },
        ]} />
    )
}
