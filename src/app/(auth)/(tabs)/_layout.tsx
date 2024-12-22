import { Pressable } from "react-native";
import { Tabs } from "expo-router";

import { useThemeColor } from "@/src/hooks/useThemeColor";
import { CustomTabBarIcon } from "@/src/components/CustomTabBarIcon";

export default function TabLayout(): JSX.Element {
  const { color } = useThemeColor();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        animation: "shift",
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 80,
          backgroundColor: color.primaryBg,
          paddingTop: 23,
          borderTopWidth: 1,
          borderTopColor: color.border,
        },
        tabBarShowLabel: false,
        tabBarButton: (props) => {
          return <Pressable {...props} android_ripple={null} />;
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: true,
          tabBarIcon: ({ focused }) => {
            return (
              <CustomTabBarIcon
                focused={focused}
                label="Home"
                iconName="home"
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ focused }) => {
            return (
              <CustomTabBarIcon
                focused={focused}
                label="Explore"
                iconName="find"
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => {
            return (
              <CustomTabBarIcon
                focused={focused}
                label="Profile"
                iconName="user"
              />
            );
          },
        }}
      />
    </Tabs>
  );
}
