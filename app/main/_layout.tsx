import {Drawer} from "expo-router/drawer";
import {useUserData} from "@/hooks/useUserData";

export default function() {
    const {data} = useUserData();

    return (
        <Drawer>
            <Drawer.Screen name="Home"/>
            <Drawer.Screen name="gd" options={{title: "GITADORA", drawerItemStyle: {display: data?.profiles.gd ? 'flex' : 'none'}}}/>
            <Drawer.Screen name="Logout"/>
        </Drawer>
    )
}
