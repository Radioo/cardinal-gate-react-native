import {Drawer} from "expo-router/drawer";
import useUserData from "@/hooks/queries/useUserData";
import {useThemeStore} from "@/store/theme";
import {StyleProp, ViewStyle} from "react-native";
import {Entypo, FontAwesome6, Ionicons} from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Layout() {
    const {primaryColor} = useThemeStore();
    const {data} = useUserData();

    const drawerItemStyle: StyleProp<ViewStyle> = {
        borderRadius: 0,
    }

    return (
            <Drawer screenOptions={() => ({
                drawerActiveTintColor: primaryColor,
                drawerItemStyle,
                swipeEdgeWidth: 500,
            })}
            >
                <Drawer.Screen name="Home" options={{
                    drawerIcon: ({color}) => <Entypo name="home" size={24} color={color} />
                }}/>
                <Drawer.Screen name="iidx" options={{
                    title: 'beatmania IIDX',
                    drawerItemStyle: {...drawerItemStyle, display: data?.profiles.iidx ? 'flex' : 'none'},
                    drawerIcon: ({color}) => <Ionicons name="disc" size={24} color={color} />
                }}/>
                <Drawer.Screen name="sdvx" options={{
                    title: 'SOUND VOLTEX',
                    drawerItemStyle: {...drawerItemStyle, display: data?.profiles.sdvx ? 'flex' : 'none'},
                    drawerIcon: ({color}) => <MaterialIcons name="hexagon" size={24} color={color} />
                }}/>
                <Drawer.Screen name="gd" options={{
                    title: "GITADORA",
                    drawerItemStyle: {...drawerItemStyle, display: data?.profiles.gd ? 'flex' : 'none'},
                    drawerIcon: ({color}) => <FontAwesome6 name="drum" size={24} color={color} />
                }}/>
                <Drawer.Screen name="settings" options={{
                    title: "Settings",
                    drawerItemStyle: {...drawerItemStyle},
                    drawerIcon: ({color}) => <Ionicons name="settings-sharp" size={24} color={color} />
                }}/>
                <Drawer.Screen name="debug" options={{
                    title: "Debug",
                    drawerItemStyle: {...drawerItemStyle, display: data?.developer ? 'flex' : 'none'},
                    drawerIcon: ({color}) => <Entypo name="bug" size={24} color={color} />
                }}/>
                <Drawer.Screen name="Logout" options={{
                    drawerIcon: ({color}) => <MaterialIcons name="logout" size={24} color={color} />
                }}/>
            </Drawer>
    )
}
