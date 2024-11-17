import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Colors from "@/src/constants/Colors";

const Tab = createMaterialTopTabNavigator();

export default function Explore() {
  const colorTheme = useColorScheme();
  const color = Colors[colorTheme ?? "light"];

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: color.secondaryBg,
        },
        tabBarActiveTintColor: color.accent,
        tabBarInactiveTintColor: color.disabled,
        tabBarIndicatorStyle: {
          backgroundColor: color.accent,
        },
      }}
    >
      <Tab.Screen name="suggested" component={SuggestedScreen} />
      <Tab.Screen name="liked" component={LikedScreen} />
      <Tab.Screen name="library" component={LibraryScreen} />
    </Tab.Navigator>
  );
}
function SuggestedScreen() {
  const colorTheme = useColorScheme();
  const color = Colors[colorTheme ?? "light"];

  return (
    <View style={[styles.container, { backgroundColor: color.primaryBg }]}>
      <Text style={[styles.title, { color: color.primaryText }]}>
        Suggested
      </Text>
    </View>
  );
}

function LikedScreen() {
  const colorTheme = useColorScheme();
  const color = Colors[colorTheme ?? "light"];

  return (
    <View style={[styles.container, { backgroundColor: color.primaryBg }]}>
      <Text style={[styles.title, { color: color.primaryText }]}>Liked</Text>
    </View>
  );
}

function LibraryScreen() {
  const colorTheme = useColorScheme();
  const color = Colors[colorTheme ?? "light"];

  return (
    <View style={[styles.container, { backgroundColor: color.primaryBg }]}>
      <Text style={[styles.title, { color: color.primaryText }]}>Library</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 60,
    fontWeight: "bold",
    opacity: 0.4,
  },
});
