import { StatusBar, View } from "react-native";
import { router, Stack, useSegments } from "expo-router";
import { useFonts } from "expo-font";
import { ClerkProvider, ClerkLoaded, useAuth } from "@clerk/clerk-expo";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import { tokenCache } from "@/src/lib/tokenCache";
import { useEffect } from "react";
import { useThemeColor } from "@/src/hooks/useThemeColor";

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

const MyDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: "#18181b",
  },
};

const MyLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#fff",
  },
};

function RootLayout(): JSX.Element {
  const { color, colorScheme } = useThemeColor();

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
    <ThemeProvider value={colorScheme === "dark" ? MyDarkTheme : MyLightTheme}>
      <View style={{ flex: 1, backgroundColor: color.primaryBg }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
        </Stack>
        <StatusBar
          backgroundColor={color.primaryBg}
          barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        />
      </View>
    </ThemeProvider>
  );
}
