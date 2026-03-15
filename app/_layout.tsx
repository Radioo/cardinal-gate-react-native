import '../global.css';

import {ErrorBoundaryProps, router, Stack} from 'expo-router';
import {GestureHandlerRootView} from "react-native-gesture-handler";
import Toaster from "@/components/shared/Toaster";
import {ThemeProvider} from "@react-navigation/native";
import {StatusBar} from "expo-status-bar";
import {KeyboardAvoidingView, Platform, View} from "react-native";
import {useColorScheme as useSystemColorScheme} from "@/hooks/useColorScheme";
import {QueryClientProvider} from "@tanstack/react-query";
import {useReactQueryDevTools} from "@dev-plugins/react-query";
import ErrorScreen from "@/components/shared/ErrorScreen";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {queryClient} from "@/services/query-client";
import {getNavTheme} from "@/lib/theme";
import {useColorScheme} from "nativewind";
import {useThemeStore} from "@/store/theme";
import {useToastStore} from "@/store/toast";
import {useEffect, useLayoutEffect, useMemo} from "react";
import usePrimaryColorVars from "@/hooks/usePrimaryColorVars";
import {PortalHost} from "@rn-primitives/portal";
import GradientBackground from "@/components/shared/GradientBackground";
import {registerToastHandler} from "@/lib/notifications";
import {setOnUnauthorized} from "@/services/api";

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
    return (
        <SafeAreaProvider>
            <ErrorScreen error={error} onRetry={retry}/>
        </SafeAreaProvider>
    );
}

export default function Layout() {
    useReactQueryDevTools(queryClient);
    const systemColorScheme = useSystemColorScheme();
    const {setColorScheme} = useColorScheme();
    const {primaryColor} = useThemeStore();
    const isDark = systemColorScheme === 'dark';
    const dynamicVars = usePrimaryColorVars();

    useLayoutEffect(() => {
        setColorScheme(systemColorScheme === 'dark' ? 'dark' : 'light');
    }, [systemColorScheme, setColorScheme]);

    useEffect(() => {
        registerToastHandler(useToastStore.getState().addToast);
        setOnUnauthorized(() => router.replace('/login'));
    }, []);

    useEffect(() => {
        if (Platform.OS === 'web') {
            document.getElementById('loader')?.remove();
        }
    }, []);

    const navTheme = useMemo(() => getNavTheme(primaryColor, isDark), [primaryColor, isDark]);

    return (
        <QueryClientProvider client={queryClient}>
            <GestureHandlerRootView style={{flex: 1}}>
                <View style={[{flex: 1, backgroundColor: isDark ? '#151718' : '#fff'}, dynamicVars]}>
                    <GradientBackground />
                    <ThemeProvider value={navTheme}>
                        <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
                            <Stack screenOptions={{headerShown: false}}></Stack>
                            <StatusBar style="auto"/>
                        </KeyboardAvoidingView>
                    </ThemeProvider>
                    <Toaster />
                    <PortalHost />
                </View>
            </GestureHandlerRootView>
        </QueryClientProvider>
    )
}

