import { StyleSheet, View } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

import CustomTabBarButton from "./CustomTabBarButton";
import { useThemeColor } from "@/src/hooks/useThemeColor";

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps): JSX.Element {
  const { color } = useThemeColor();

  return (
    <View
      style={[
        styles.tabBar,
        { backgroundColor: color.primaryBg, borderTopColor: color.border },
      ]}
    >
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
          <CustomTabBarButton
            key={index}
            onPress={onPress}
            isFocused={isFocused}
            label={label as string}
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
    borderTopWidth: 1,
  },
});
