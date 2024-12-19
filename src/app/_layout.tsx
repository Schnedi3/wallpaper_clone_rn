import { StatusBar, View } from "react-native";
import { router, Stack, usePathname, useSegments } from "expo-router";
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

  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const pathname = usePathname();

  useFonts({
    QuicksandBold: require("@/assets/fonts/Quicksand-Bold.ttf"),
    QuicksandMed: require("@/assets/fonts/Quicksand-Medium.ttf"),
    QuicksandSemi: require("@/assets/fonts/Quicksand-SemiBold.ttf"),
  });

  useEffect(() => {
    if (!isLoaded) return;
    const inAuthGroup = segments[0] === "(auth)";

    if (isSignedIn && !inAuthGroup) {
      router.replace("/(auth)/(tabs)/home");
    } else if (!isSignedIn && pathname !== "/") {
      router.replace("/");
    }
  }, [isLoaded, isSignedIn]);

  return (
    <ThemeProvider value={colorScheme === "dark" ? MyDarkTheme : MyLightTheme}>
      <View style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
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
