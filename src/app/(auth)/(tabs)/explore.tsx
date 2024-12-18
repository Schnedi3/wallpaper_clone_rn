import { StyleSheet, useColorScheme } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Liked from "@/src/components/Explore/Liked";
import Suggested from "@/src/components/Explore/Suggested";
import { Colors } from "@/src/constants/Colors";

const Tab = createMaterialTopTabNavigator();

export default function Explore(): JSX.Element {
  const colorTheme = useColorScheme();
  const color = Colors[colorTheme ?? "light"];

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: color.primaryBg,
        },
        tabBarActiveTintColor: color.accent,
        tabBarInactiveTintColor: color.disabled,
        tabBarIndicatorStyle: {
          backgroundColor: color.accent,
        },
      }}
    >
      <Tab.Screen
        name="liked"
        options={{
          title: "Liked",
          tabBarLabelStyle: { fontFamily: "QuicksandSemi" },
        }}
        component={Liked}
      />
      <Tab.Screen
        name="suggested"
        options={{
          title: "Suggested",
          tabBarLabelStyle: { fontFamily: "QuicksandSemi" },
        }}
        component={Suggested}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
