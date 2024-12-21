import { Tabs } from "expo-router";

import CustomTabBar from "@/src/components/TabBar/CustomTabBar";

export default function Layout(): JSX.Element {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false, animation: "shift" }}
    >
      <Tabs.Screen name="home" options={{ title: "Home", headerShown: true }} />
      <Tabs.Screen name="explore" options={{ title: "Explore" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
