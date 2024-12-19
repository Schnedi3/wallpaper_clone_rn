import { useEffect } from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { tabBarIcons } from "@/src/constants/tabBarIcons";
import { useThemeColor } from "@/src/hooks/useThemeColor";

interface ITabBarButtonProps {
  onPress: () => void;
  isFocused: boolean;
  label: string;
  routeName: "home" | "explore" | "profile";
  props: any;
}

export default function TabBarButton({
  isFocused,
  label,
  routeName,
  ...props
}: ITabBarButtonProps): JSX.Element {
  const scale = useSharedValue(0);
  const { color } = useThemeColor();

  useEffect(() => {
    scale.value = withSpring(
      typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused,
      { duration: 350 }
    );
  }, [scale, isFocused]);

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.5]);
    const top = interpolate(scale.value, [0, 1], [0, 10]);

    return {
      transform: [{ scale: scaleValue }],
      top,
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);

    return {
      opacity,
    };
  });

  return (
    <Pressable style={styles.tabBarButton} {...props}>
      <Animated.View style={[animatedIconStyle]}>
        {tabBarIcons[routeName]({
          color: isFocused ? color.accent : color.disabled,
          size: 26,
        })}
      </Animated.View>

      <Animated.Text
        style={[
          styles.tabBarButtonText,
          {
            color: isFocused ? color.accent : color.disabled,
          },
          animatedTextStyle,
        ]}
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tabBarButton: {
    flex: 1,
    alignItems: "center",
    gap: 5,
  },
  tabBarButtonText: {
    fontFamily: "QuicksandMed",
    fontSize: 11,
  },
});
