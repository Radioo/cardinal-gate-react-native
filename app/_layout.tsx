import '../global.css';

import {ErrorBoundaryProps, Stack} from 'expo-router';
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {Toaster} from "@/components/shared/Toaster";
import {ThemeProvider} from "@react-navigation/native";
import {StatusBar} from "expo-status-bar";
import {KeyboardAvoidingView, Platform, View, useColorScheme as useSystemColorScheme} from "react-native";
import {QueryClientProvider} from "@tanstack/react-query";
import {useReactQueryDevTools} from "@dev-plugins/react-query";
import ErrorScreen from "@/components/shared/ErrorScreen";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {queryClient} from "@/services/query-client";
import {getNavTheme} from "@/lib/theme";
import {useColorScheme, vars} from "nativewind";
import {useThemeStore} from "@/store/theme";
import {buildPrimaryColorVars} from "@/lib/color-utils";
import {useEffect, useLayoutEffect, useMemo} from "react";
import {PortalHost} from "@rn-primitives/portal";

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

    useLayoutEffect(() => {
        setColorScheme(systemColorScheme === 'dark' ? 'dark' : 'light');
    }, [systemColorScheme, setColorScheme]);

    useEffect(() => {
        if (Platform.OS === 'web') {
            document.getElementById('loader')?.remove();
        }
    }, []);

    const dynamicVars = useMemo(
        () => vars(buildPrimaryColorVars(primaryColor, isDark)),
        [primaryColor, isDark],
    );

    const navTheme = useMemo(() => getNavTheme(primaryColor, isDark), [primaryColor, isDark]);

    return (
        <QueryClientProvider client={queryClient}>
            <GestureHandlerRootView style={{flex: 1}}>
                <View style={[{flex: 1}, dynamicVars]}>
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

