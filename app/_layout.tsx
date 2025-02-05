import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import {Notifier, NotifierWrapper} from "react-native-notifier";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {Drawer} from "expo-router/drawer";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  console.log('colorScheme:', colorScheme);
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hide();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
      <GestureHandlerRootView>
        <NotifierWrapper>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Drawer>
              <Drawer.Screen
                  name="home" // This is the name of the page and must match the url from root
                  options={{
                    drawerLabel: 'Home',
                    title: 'overview',
                  }}
              />
            </Drawer>
            <StatusBar style="auto" />
          </ThemeProvider>
        </NotifierWrapper>
      </GestureHandlerRootView>

  );
}
