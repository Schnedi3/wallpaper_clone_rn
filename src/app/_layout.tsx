import { StatusBar, StyleSheet, useColorScheme, View } from "react-native";
import { router, Stack, useSegments } from "expo-router";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { ClerkProvider, ClerkLoaded, useAuth } from "@clerk/clerk-expo";

import { tokenCache } from "@/src/lib/tokenCache";
import { Colors } from "@/src/constants/Colors";
import { useEffect } from "react";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string;

export default function InitialLayout(): JSX.Element {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache()}>
      <ClerkLoaded>
        <RootLayout />
      </ClerkLoaded>
    </ClerkProvider>
  );
}

function RootLayout(): JSX.Element {
  const colorTheme = useColorScheme();
  const color = Colors[colorTheme ?? "light"];

  const { isSignedIn } = useAuth();
  const segments = useSegments();

  useFonts({
    QuicksandBold: require("@/assets/fonts/Quicksand-Bold.ttf"),
    QuicksandMed: require("@/assets/fonts/Quicksand-Medium.ttf"),
    QuicksandSemi: require("@/assets/fonts/Quicksand-SemiBold.ttf"),
  });

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (isSignedIn && !inAuthGroup) {
      router.replace("/(auth)/(tabs)");
    } else if (!isSignedIn && inAuthGroup) {
      router.replace("/");
    }
  }, []);

  return (
    <ThemeProvider value={colorTheme === "dark" ? DarkTheme : DefaultTheme}>
      <View style={styles.container}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
        </Stack>
        <StatusBar
          backgroundColor={color.secondaryBg}
          barStyle={colorTheme === "dark" ? "light-content" : "dark-content"}
        />
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
