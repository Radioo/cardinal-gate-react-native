import GameTabLayout from "@/components/shared/GameTabLayout";
import {Wrench, Drum, Disc, Hexagon} from "lucide-react-native";
import useUserData from "@/hooks/queries/useUserData";
import {Redirect} from "expo-router";

export default function Layout() {
    const {data} = useUserData();

    if (data && !data.developer) {
        return <Redirect href="/main/Home" />;
    }

    return (
        <GameTabLayout tabs={[
            {
                name: "General",
                icon: (color) => <Wrench size={24} color={color} />,
            },
            {
                name: "Gd",
                title: "GD",
                icon: (color) => <Drum size={24} color={color} />,
            },
            {
                name: "Iidx",
                title: "IIDX",
                icon: (color) => <Disc size={24} color={color} />,
            },
            {
                name: "Sdvx",
                title: "SDVX",
                icon: (color) => <Hexagon size={24} color={color} />,
            },
        ]} />
    )
}
