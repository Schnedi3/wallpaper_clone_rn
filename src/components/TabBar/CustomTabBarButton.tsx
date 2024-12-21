import { useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";

import { useThemeColor } from "@/src/hooks/useThemeColor";

interface ITabBarButtonProps {
  onPress: () => void;
  isFocused: boolean;
  label: string;
  routeName: string;
}

export default function CustomTabBarButton({
  onPress,
  isFocused,
  label,
  routeName,
}: ITabBarButtonProps): JSX.Element {
  const scale = useSharedValue(0);
  const { color } = useThemeColor();

  const tabBarIcons = {
    home: (props: any) => <AntDesign name="home" {...props} />,
    explore: (props: any) => <AntDesign name="find" {...props} />,
    profile: (props: any) => <AntDesign name="user" {...props} />,
  };

  useEffect(() => {
    scale.value = withSpring(isFocused ? 1 : 0, { duration: 200 });
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
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.tabBarButton}
      onPress={onPress}
    >
      <Animated.View style={[animatedIconStyle]}>
        {tabBarIcons[routeName as keyof typeof tabBarIcons]({
          color: isFocused ? color.accent : color.disabled,
          size: 26,
        })}
      </Animated.View>

      <Animated.Text
        style={[
          styles.tabBarButtonText,
          animatedTextStyle,
          { color: color.disabled },
        ]}
      >
        {label}
      </Animated.Text>
    </TouchableOpacity>
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
