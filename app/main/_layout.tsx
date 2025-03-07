import {Drawer} from "expo-router/drawer";
import {useUserData} from "@/hooks/useUserData";
import {useTheme} from "@/hooks/useTheme";
import {StyleProp, ViewStyle} from "react-native";
import {Entypo, Feather, FontAwesome6, Ionicons} from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {GestureHandlerRootView} from "react-native-gesture-handler";

export default function Layout() {
    const theme = useTheme();
    const {data} = useUserData();

    const drawerItemStyle: StyleProp<ViewStyle> = {
        borderRadius: 0,
    }

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <Drawer screenOptions={({navigation}) => ({
                drawerActiveTintColor: theme.primary,
                drawerContentStyle: {
                    backgroundColor: theme.background
                },
                drawerItemStyle,
                swipeEdgeWidth: 500,
                headerLeft: () => <Feather name="menu" style={{padding: 10}} size={24} color={theme.text} onPress={navigation.toggleDrawer}/>,
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
                    drawerItemStyle: {...drawerItemStyle},
                    drawerIcon: ({color}) => <Entypo name="bug" size={24} color={color} />
                }}/>
                <Drawer.Screen name="Logout" options={{
                    drawerIcon: ({color}) => <MaterialIcons name="logout" size={24} color={color} />
                }}/>
            </Drawer>
        </GestureHandlerRootView>
    )
}
