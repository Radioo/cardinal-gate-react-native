import GameTabLayout from "@/components/shared/layout/GameTabLayout";
import {Wrench, Drum, Disc, Hexagon} from "lucide-react-native";
import useUserData from "@/hooks/queries/useUserData";
import {Redirect} from "expo-router";

export default function Layout() {
    const {data} = useUserData();

    if (data && !data.developer) {
        return <Redirect href="/main/home" />;
    }

    return (
        <GameTabLayout tabs={[
            {
                name: "general",
                title: "General",
                icon: (color) => <Wrench size={24} color={color} />,
            },
            {
                name: "gd",
                title: "GD",
                icon: (color) => <Drum size={24} color={color} />,
            },
            {
                name: "iidx",
                title: "IIDX",
                icon: (color) => <Disc size={24} color={color} />,
            },
            {
                name: "sdvx",
                title: "SDVX",
                icon: (color) => <Hexagon size={24} color={color} />,
            },
        ]} />
    )
}
