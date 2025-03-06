import {useTheme} from "@/hooks/useTheme";
import {Tabs} from "expo-router";
import {tabBarLabelStyle} from "@/constants/Styles";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Layout() {
    const theme = useTheme();

    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: theme.primary,
            tabBarLabelStyle: tabBarLabelStyle(),
        }}>
            <Tabs.Screen name="Profile" options={{
                tabBarIcon: ({color}) => <AntDesign name="user" size={24} color={color} />
            }}/>
        </Tabs>
    )
}
