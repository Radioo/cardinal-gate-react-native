import {Drawer} from "expo-router/drawer";
import useUserData from "@/hooks/queries/useUserData";
import {useThemeStore} from "@/store/theme";
import {StyleProp, ViewStyle} from "react-native";
import {House, Disc, Hexagon, Drum, Settings, Bug, LogOut} from "lucide-react-native";

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
                    drawerIcon: ({color}) => <House size={24} color={color} />
                }}/>
                <Drawer.Screen name="iidx" options={{
                    title: 'beatmania IIDX',
                    drawerItemStyle: {...drawerItemStyle, display: data?.profiles.iidx ? 'flex' : 'none'},
                    drawerIcon: ({color}) => <Disc size={24} color={color} />
                }}/>
                <Drawer.Screen name="sdvx" options={{
                    title: 'SOUND VOLTEX',
                    drawerItemStyle: {...drawerItemStyle, display: data?.profiles.sdvx ? 'flex' : 'none'},
                    drawerIcon: ({color}) => <Hexagon size={24} color={color} />
                }}/>
                <Drawer.Screen name="gd" options={{
                    title: "GITADORA",
                    drawerItemStyle: {...drawerItemStyle, display: data?.profiles.gd ? 'flex' : 'none'},
                    drawerIcon: ({color}) => <Drum size={24} color={color} />
                }}/>
                <Drawer.Screen name="settings" options={{
                    title: "Settings",
                    drawerItemStyle: {...drawerItemStyle},
                    drawerIcon: ({color}) => <Settings size={24} color={color} />
                }}/>
                <Drawer.Screen name="debug" options={{
                    title: "Debug",
                    drawerItemStyle: {...drawerItemStyle, display: data?.developer ? 'flex' : 'none'},
                    drawerIcon: ({color}) => <Bug size={24} color={color} />
                }}/>
                <Drawer.Screen name="Logout" options={{
                    drawerIcon: ({color}) => <LogOut size={24} color={color} />
                }}/>
            </Drawer>
    )
}
