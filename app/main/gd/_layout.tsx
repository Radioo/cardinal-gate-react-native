import {Tabs} from "expo-router";
import {useTheme} from "@/hooks/useTheme";
import AntDesign from "@expo/vector-icons/AntDesign";
import {Entypo} from "@expo/vector-icons";

export default function Layout() {
    const theme = useTheme();

    return (
        <Tabs screenOptions={{headerShown: false, tabBarActiveTintColor: theme.primary}}>
            <Tabs.Screen name="Profile" options={{
                tabBarIcon: ({color}) => <AntDesign name="user" size={24} color={color} />
            }}/>
            <Tabs.Screen name="Skill" options={{
                tabBarIcon: ({color}) => <Entypo name="list" size={24} color={color} />
            }}/>
        </Tabs>
    )
}
