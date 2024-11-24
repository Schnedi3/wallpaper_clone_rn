import { StyleSheet, useColorScheme } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Liked from "@/src/components/Explore/Liked";
import Suggested from "@/src/components/Explore/Suggested";
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
      <Tab.Screen name="liked" component={Liked} />
      <Tab.Screen name="suggested" component={Suggested} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
