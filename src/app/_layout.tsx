import { useEffect } from "react";
import { StatusBar, View } from "react-native";
import { router, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { ClerkProvider, ClerkLoaded, useAuth } from "@clerk/clerk-expo";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import { tokenCache } from "@/src/lib/tokenCache";
import { useThemeColor } from "@/src/hooks/useThemeColor";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string;

export default function RootLayout(): JSX.Element {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache()}>
      <ClerkLoaded>
        <InitialLayout />
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

function InitialLayout(): JSX.Element {
  const { color, colorScheme } = useThemeColor();

  const { isSignedIn } = useAuth();

  useFonts({
    QuicksandBold: require("@/assets/fonts/Quicksand-Bold.ttf"),
    QuicksandMed: require("@/assets/fonts/Quicksand-Medium.ttf"),
    QuicksandSemi: require("@/assets/fonts/Quicksand-SemiBold.ttf"),
  });

  useEffect(() => {
    if (isSignedIn) {
      router.replace("/(auth)/(tabs)/home");
    } else {
      router.replace("/login");
    }
  }, [isSignedIn]);

  return (
    <ThemeProvider value={colorScheme === "dark" ? MyDarkTheme : MyLightTheme}>
      <View style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="login" />
          <Stack.Screen name="(auth)" />
        </Stack>
      </View>
      <StatusBar
        backgroundColor={color.primaryBg}
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />
    </ThemeProvider>
  );
}
