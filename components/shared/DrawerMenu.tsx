import {createContext, ReactNode, useContext, useMemo, useRef} from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import ReanimatedDrawerLayout, {
    DrawerLayoutMethods,
    DrawerPosition,
    DrawerType,
} from "react-native-gesture-handler/ReanimatedDrawerLayout";
import {router, usePathname} from "expo-router";
import type {Href} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import {Bug, Disc, Drum, Hexagon, House, LogOut, Menu, Settings} from "lucide-react-native";
import useTheme from "@/hooks/useTheme";
import useUserData from "@/hooks/queries/useUserData";

type Item = {
    href: Href;
    matchPrefix: string;
    title: string;
    icon: (color: string) => ReactNode;
    visible?: boolean;
};

type DrawerActions = {
    openDrawer: () => void;
    closeDrawer: () => void;
};

const DrawerActionsContext = createContext<DrawerActions | null>(null);

export function useDrawerActions(): DrawerActions {
    const ctx = useContext(DrawerActionsContext);
    if (!ctx) throw new Error("useDrawerActions must be used within DrawerMenu");
    return ctx;
}

export function HamburgerButton() {
    const {openDrawer} = useDrawerActions();
    const theme = useTheme();
    return (
        <Pressable onPress={openDrawer} hitSlop={12} style={styles.hamburger}>
            <Menu size={24} color={theme.text}/>
        </Pressable>
    );
}

function DrawerContent({onNavigate}: {onNavigate: (href: Href) => void}) {
    const {data} = useUserData();
    const theme = useTheme();
    const pathname = usePathname();

    const items: Item[] = [
        {href: "/main/Home", matchPrefix: "/main/Home", title: "Home", icon: (c) => <House size={24} color={c}/>},
        {href: "/main/iidx/Profile", matchPrefix: "/main/iidx", title: "beatmania IIDX", icon: (c) => <Disc size={24} color={c}/>, visible: !!data?.profiles.iidx},
        {href: "/main/sdvx/Profile", matchPrefix: "/main/sdvx", title: "SOUND VOLTEX", icon: (c) => <Hexagon size={24} color={c}/>, visible: !!data?.profiles.sdvx},
        {href: "/main/gd/Profile", matchPrefix: "/main/gd", title: "GITADORA", icon: (c) => <Drum size={24} color={c}/>, visible: !!data?.profiles.gd},
        {href: "/main/settings", matchPrefix: "/main/settings", title: "Settings", icon: (c) => <Settings size={24} color={c}/>},
        {href: "/main/debug/General", matchPrefix: "/main/debug", title: "Debug", icon: (c) => <Bug size={24} color={c}/>, visible: !!data?.developer},
        {href: "/main/Logout", matchPrefix: "/main/Logout", title: "Logout", icon: (c) => <LogOut size={24} color={c}/>},
    ];

    return (
        <SafeAreaView style={[styles.drawerRoot, {backgroundColor: theme.background}]}>
            <View style={styles.drawerList}>
                {items.filter(i => i.visible !== false).map(item => {
                    const active = pathname === item.matchPrefix || pathname.startsWith(item.matchPrefix + "/");
                    const color = active ? theme.primary : theme.text;
                    return (
                        <Pressable
                            key={item.matchPrefix}
                            onPress={() => onNavigate(item.href)}
                            android_ripple={{color: "rgba(127,127,127,0.15)"}}
                            style={styles.drawerItem}
                        >
                            <View style={styles.drawerItemIcon}>{item.icon(color)}</View>
                            <Text style={[styles.drawerItemText, {color, fontWeight: active ? "600" : "400"}]}>
                                {item.title}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>
        </SafeAreaView>
    );
}

export default function DrawerMenu({children}: {children: ReactNode}) {
    const ref = useRef<DrawerLayoutMethods>(null);
    const theme = useTheme();

    const actions = useMemo<DrawerActions>(() => ({
        openDrawer: () => ref.current?.openDrawer(),
        closeDrawer: () => ref.current?.closeDrawer(),
    }), []);

    const handleNavigate = (href: Href) => {
        actions.closeDrawer();
        router.replace(href);
    };

    return (
        <DrawerActionsContext.Provider value={actions}>
            <ReanimatedDrawerLayout
                ref={ref}
                renderNavigationView={() => <DrawerContent onNavigate={handleNavigate}/>}
                drawerPosition={DrawerPosition.LEFT}
                drawerType={DrawerType.FRONT}
                drawerWidth={280}
                drawerBackgroundColor={theme.background}
                edgeWidth={40}
            >
                {children}
            </ReanimatedDrawerLayout>
        </DrawerActionsContext.Provider>
    );
}

const styles = StyleSheet.create({
    hamburger: {
        paddingHorizontal: 12,
    },
    drawerRoot: {
        flex: 1,
    },
    drawerList: {
        paddingVertical: 8,
    },
    drawerItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 14,
    },
    drawerItemIcon: {
        width: 24,
        height: 24,
        marginRight: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    drawerItemText: {
        fontSize: 16,
    },
});
