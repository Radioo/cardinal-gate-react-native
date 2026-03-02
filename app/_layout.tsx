import {ErrorBoundaryProps, Stack} from 'expo-router';
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {NotifierWrapper} from "react-native-notifier";
import {ThemeProvider} from "@react-navigation/core";
import {DarkTheme, DefaultTheme} from "@react-navigation/native";
import {useColorScheme} from "@/hooks/useColorScheme";
import {StatusBar} from "expo-status-bar";
import {KeyboardAvoidingView, Platform, StyleSheet} from "react-native";
import {QueryClientProvider} from "@tanstack/react-query";
import {useReactQueryDevTools} from "@dev-plugins/react-query";
import ErrorScreen from "@/components/shared/ErrorScreen";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {queryClient} from "@/services/query-client";

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
    return (
        <SafeAreaProvider>
            <ErrorScreen error={error} onRetry={retry}/>
        </SafeAreaProvider>
    );
}

export default function Layout() {
    useReactQueryDevTools(queryClient);
    const colorScheme = useColorScheme();

    return (
        <QueryClientProvider client={queryClient}>
            <GestureHandlerRootView>
                <NotifierWrapper>
                    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex1}>
                            <Stack screenOptions={{headerShown: false}}></Stack>
                            <StatusBar style="auto"/>
                        </KeyboardAvoidingView>
                    </ThemeProvider>
                </NotifierWrapper>
            </GestureHandlerRootView>
        </QueryClientProvider>
    )
}

const styles = StyleSheet.create({
    flex1: {flex: 1},
});
