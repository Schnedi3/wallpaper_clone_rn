import React from "react";
import { Text, View } from "react-native";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { lightColors } from "../../constants/Colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 70,
        },
      }}
    >
      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <Ionicons
                size={25}
                name="search"
                color={focused ? lightColors.accent : lightColors.disabled}
              />
              <Text
                style={{
                  color: focused ? lightColors.accent : lightColors.disabled,
                  fontSize: 11,
                  marginTop: 3,
                }}
              >
                Explore
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 80,
                height: 80,
                marginBottom: 25,
                borderRadius: 100,
                backgroundColor: lightColors.accent,
              }}
            >
              <Ionicons
                size={30}
                name={focused ? "home" : "home-outline"}
                color={lightColors.invertedText}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <Ionicons
                size={25}
                name={focused ? "person" : "person-outline"}
                color={focused ? lightColors.accent : lightColors.disabled}
              />
              <Text
                style={{
                  color: focused ? lightColors.accent : lightColors.disabled,
                  fontSize: 11,
                  marginTop: 3,
                }}
              >
                Account
              </Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
