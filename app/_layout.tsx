import { Stack } from 'expo-router';
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {NotifierWrapper} from "react-native-notifier";
import {ThemeProvider} from "@react-navigation/core";
import {DarkTheme, DefaultTheme} from "@react-navigation/native";
import {useColorScheme} from "@/hooks/useColorScheme";
import {StatusBar} from "expo-status-bar";

export default function() {
    const colorScheme = useColorScheme();

    return (
        <GestureHandlerRootView>
            <NotifierWrapper>
                <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                    <Stack screenOptions={{headerShown: false}}></Stack>
                    <StatusBar style="auto"/>
                </ThemeProvider>
            </NotifierWrapper>
        </GestureHandlerRootView>
    )
};
