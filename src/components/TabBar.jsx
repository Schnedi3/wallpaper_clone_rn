import { StyleSheet, View } from "react-native";

import { lightColors } from "@/src/constants/Colors";
import TabBarButton from "./TabBarButton";

export default function TabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <TabBarButton
            key={index}
            onPress={onPress}
            isFocused={isFocused}
            label={label}
            routeName={route.name}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    paddingVertical: 14,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
    backgroundColor: lightColors.secondaryBg,
  },
});
