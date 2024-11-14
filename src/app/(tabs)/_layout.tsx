import React from "react";
import { Tabs } from "expo-router";
import { NavigationContainer } from "@react-navigation/native";

import TabBar from "../components/TabBar";

export default function TabLayout() {
  return (
    <NavigationContainer>
      <Tabs
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{ headerShown: false }}
      >
        <Tabs.Screen name="explore" options={{ title: "Explore" }} />
        <Tabs.Screen name="index" options={{ title: "Home" }} />
        <Tabs.Screen name="account" options={{ title: "Account" }} />
      </Tabs>
    </NavigationContainer>
  );
}
