import 'react-native-gesture-handler'; 
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { store } from '@/state/store';
import StripeProviderWrapper from '@/components/StripeProviderWrapper';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    sorabold: require('../assets/fonts/Sora-Bold.ttf'),
    soraregular: require('../assets/fonts/Sora-Regular.ttf'),
    sorasemibold: require('../assets/fonts/Sora-SemiBold.ttf'),
    soraextrabold: require('../assets/fonts/Sora-ExtraBold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <StripeProviderWrapper>
        <GestureHandlerRootView>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack initialRouteName='(home)' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(home)"/>
            <Stack.Screen name="(auth)"/>
            <Stack.Screen name="(order)"/>
            <Stack.Screen name="(profile)"/>
            <Stack.Screen name="(admin)"/>
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
        </GestureHandlerRootView>
      </StripeProviderWrapper>
    </Provider>
  );
}
