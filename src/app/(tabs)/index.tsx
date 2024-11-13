import { StyleSheet, Text, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";

import { lightColors } from "@/src/constants/Colors";

const Tab = createMaterialTopTabNavigator();

export default function Home() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: lightColors.accent,
          tabBarInactiveTintColor: lightColors.disabled,
          tabBarIndicatorStyle: { backgroundColor: lightColors.accent },
        }}
      >
        <Tab.Screen name="suggested" component={SuggestedScreen} />
        <Tab.Screen name="liked" component={LikedScreen} />
        <Tab.Screen name="library" component={LibraryScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
function SuggestedScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Suggested</Text>
    </View>
  );
}
function LikedScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liked</Text>
    </View>
  );
}
function LibraryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Library</Text>
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
