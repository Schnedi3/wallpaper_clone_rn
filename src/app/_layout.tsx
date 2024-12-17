import { StatusBar, StyleSheet, useColorScheme, View } from "react-native";
import { Stack } from "expo-router";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";

import { Colors } from "@/src/constants/Colors";

export default function RootLayout(): JSX.Element {
  const colorTheme = useColorScheme();
  const color = Colors[colorTheme ?? "light"];

  useFonts({
    QuicksandBold: require("@/assets/fonts/Quicksand-Bold.ttf"),
    QuicksandMed: require("@/assets/fonts/Quicksand-Medium.ttf"),
    QuicksandSemi: require("@/assets/fonts/Quicksand-SemiBold.ttf"),
  });

  return (
    <ThemeProvider value={colorTheme === "dark" ? DarkTheme : DefaultTheme}>
      <View style={styles.container}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
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
