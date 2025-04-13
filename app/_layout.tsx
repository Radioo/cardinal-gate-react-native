import {ErrorBoundaryProps, Stack} from 'expo-router';
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {NotifierWrapper} from "react-native-notifier";
import {ThemeProvider} from "@react-navigation/core";
import {DarkTheme, DefaultTheme} from "@react-navigation/native";
import {useColorScheme} from "@/hooks/useColorScheme";
import {StatusBar} from "expo-status-bar";
import {KeyboardAvoidingView, Platform, View} from "react-native";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useReactQueryDevTools} from "@dev-plugins/react-query";
import ThemedCard from "@/components/ThemedCard";
import {ThemedText} from "@/components/ThemedText";
import {ThemedButton} from "@/components/ThemedButton";
import {useTheme} from "@/hooks/useTheme";

const queryClient = new QueryClient();

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
    const theme = useTheme();

    return (
        <View style={{ flex: 1, backgroundColor: theme.background }}>
            <ThemedCard style={{margin: 8, alignItems: 'center', justifyContent: 'center'}}>
                <ThemedText>{error.message}</ThemedText>
                <ThemedButton label="Retry" onPress={retry}/>
            </ThemedCard>
        </View>
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
                        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{flex: 1}}>
                            <Stack screenOptions={{headerShown: false}}></Stack>
                            <StatusBar style="auto"/>
                        </KeyboardAvoidingView>
                    </ThemeProvider>
                </NotifierWrapper>
            </GestureHandlerRootView>
        </QueryClientProvider>
    )
};
