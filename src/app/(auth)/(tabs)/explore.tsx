import { StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Liked from "@/src/components/Explore/Liked";
import Suggested from "@/src/components/Explore/Suggested";
import { useThemeColor } from "@/src/hooks/useThemeColor";

const Tab = createMaterialTopTabNavigator();

export default function Explore(): JSX.Element {
  const { color } = useThemeColor();

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
