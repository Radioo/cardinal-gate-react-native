import {Drawer} from "expo-router/drawer";
import {useUserData} from "@/hooks/useUserData";
import {useTheme} from "@/hooks/useTheme";
import type {StyleProp, ViewStyle} from "react-native";
import {Entypo, FontAwesome6, Ionicons} from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Layout() {
    const theme = useTheme();
    const {data} = useUserData();

    const drawerItemStyle: StyleProp<ViewStyle> = {
        borderRadius: 0,
    }

    return (
        <Drawer screenOptions={{
            drawerActiveTintColor: theme.primary,
            drawerItemStyle
        }}>
            <Drawer.Screen name="Home" options={{
                drawerIcon: ({color}) => <Entypo name="home" size={24} color={color} />
            }}/>
            <Drawer.Screen name="iidx" options={{
                title: 'beatmania IIDX',
                drawerItemStyle: {...drawerItemStyle, display: data?.profiles.iidx ? 'flex' : 'none'},
                drawerIcon: ({color}) => <Ionicons name="disc" size={24} color={color} />
            }}/>
            <Drawer.Screen name="gd" options={{
                title: "GITADORA",
                drawerItemStyle: {...drawerItemStyle, display: data?.profiles.gd ? 'flex' : 'none'},
                drawerIcon: ({color}) => <FontAwesome6 name="drum" size={24} color={color} />
            }}/>
            <Drawer.Screen name="debug" options={{
                title: "Debug",
                drawerItemStyle: {...drawerItemStyle},
                drawerIcon: ({color}) => <Entypo name="bug" size={24} color={color} />
            }}/>
            <Drawer.Screen name="Logout" options={{
                drawerIcon: ({color}) => <MaterialIcons name="logout" size={24} color={color} />
            }}/>
        </Drawer>
    )
}
