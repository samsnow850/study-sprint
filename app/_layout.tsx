import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Platform, View, StyleSheet } from "react-native";
import { useTimerStore } from "@/store/timerStore";
import { themes } from "@/constants/colors";
import BottomNavBar from "@/components/BottomNavBar";
import DevUpdatesOverlay from "@/components/DevUpdatesOverlay";
import WelcomeOverlay from "@/components/WelcomeOverlay";

import { ErrorBoundary } from "./error-boundary";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) {
      console.error(error);
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ErrorBoundary>
      <RootLayoutNav />
    </ErrorBoundary>
  );
}

function RootLayoutNav() {
  const theme = useTimerStore(state => state.theme);
  const colors = themes[theme];
  
  return (
    <View style={styles.container}>
      <Stack
        screenOptions={{
          headerBackTitle: "Back",
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      >
        <Stack.Screen 
          name="index" 
          options={{ 
            title: "Study Sprint",
            headerShown: true,
          }} 
        />
        <Stack.Screen 
          name="timer" 
          options={{ 
            title: "Focus Timer",
            headerShown: true,
            gestureEnabled: false,
          }} 
        />
        <Stack.Screen 
          name="complete" 
          options={{ 
            title: "Time's Up!",
            headerShown: true,
            gestureEnabled: false,
          }} 
        />
        <Stack.Screen 
          name="break" 
          options={{ 
            title: "Break Time",
            headerShown: true,
            gestureEnabled: false,
          }} 
        />
        <Stack.Screen 
          name="break-complete" 
          options={{ 
            title: "Break Complete",
            headerShown: true,
            gestureEnabled: false,
          }} 
        />
        <Stack.Screen 
          name="tasks" 
          options={{ 
            title: "Task List",
            headerShown: true,
          }} 
        />
        <Stack.Screen 
          name="settings" 
          options={{ 
            title: "Settings",
            headerShown: true,
          }} 
        />
        <Stack.Screen 
          name="stats" 
          options={{ 
            title: "Statistics",
            headerShown: true,
          }} 
        />
      </Stack>
      
      <WelcomeOverlay />
      <DevUpdatesOverlay />
      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});