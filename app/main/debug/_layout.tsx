import {useTheme} from "@/hooks/useTheme";
import {Tabs} from "expo-router";
import {tabBarLabelStyle} from "@/constants/Styles";
import {FontAwesome6, Ionicons} from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Layout() {
    const theme = useTheme();

    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: theme.primary,
            tabBarLabelStyle: tabBarLabelStyle(),
        }}>
            <Tabs.Screen name="General" options={{
                title: "General",
                tabBarIcon: ({color}) => <MaterialIcons name="miscellaneous-services" size={24} color={color} />
            }}/>
            <Tabs.Screen name="Gd" options={{
                title: "GD",
                tabBarIcon: ({color}) => <FontAwesome6 name="drum" size={24} color={color} />
            }}/>
            <Tabs.Screen name="Iidx" options={{
                title: "IIDX",
                tabBarIcon: ({color}) => <Ionicons name="disc" size={24} color={color} />
            }}/>
            <Tabs.Screen name="Sdvx" options={{
                title: "SDVX",
                tabBarIcon: ({color}) => <MaterialIcons name="hexagon" size={24} color={color} />
            }}/>
        </Tabs>
    )
}
