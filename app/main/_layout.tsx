import {Stack} from "expo-router";
import DrawerMenu, {HamburgerButton} from "@/components/shared/DrawerMenu";

export default function Layout() {
    return (
        <DrawerMenu>
            <Stack screenOptions={{
                animation: "none",
                headerBackVisible: false,
                headerLeft: () => <HamburgerButton/>,
            }}>
                <Stack.Screen name="Home" options={{title: "Home"}}/>
                <Stack.Screen name="iidx" options={{title: "beatmania IIDX"}}/>
                <Stack.Screen name="sdvx" options={{title: "SOUND VOLTEX"}}/>
                <Stack.Screen name="gd" options={{title: "GITADORA"}}/>
                <Stack.Screen name="settings" options={{title: "Settings"}}/>
                <Stack.Screen name="debug" options={{title: "Debug"}}/>
                <Stack.Screen name="Logout" options={{title: "Logout"}}/>
            </Stack>
        </DrawerMenu>
    );
}
