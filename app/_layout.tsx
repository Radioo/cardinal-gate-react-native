import { Stack } from 'expo-router';
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {NotifierWrapper} from "react-native-notifier";
import {ThemeProvider} from "@react-navigation/core";
import {DarkTheme, DefaultTheme} from "@react-navigation/native";
import {useColorScheme} from "@/hooks/useColorScheme";
import {StatusBar} from "expo-status-bar";
import {KeyboardAvoidingView, Platform} from "react-native";

export default function() {
    const colorScheme = useColorScheme();

    return (
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
    )
};
