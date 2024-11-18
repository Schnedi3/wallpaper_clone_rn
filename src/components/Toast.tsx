import { useEffect } from "react";
import { StyleSheet, Text, useColorScheme, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";

import Colors from "../constants/Colors";

interface IToastProps {
  type: "success" | "error";
  message: string;
  visible: boolean;
}

const toastColor = {
  success: "#6bcf6d",
  error: "#cf6b6b",
};

export default function Toast({ type, message, visible }: IToastProps) {
  const colorTheme = useColorScheme();
  const color = Colors[colorTheme ?? "light"];
  const YValue = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: YValue.value }],
    };
  });

  useEffect(() => {
    if (visible) {
      YValue.value = withTiming(-80, {
        duration: 500,
        easing: Easing.out(Easing.linear),
      });
      setTimeout(() => {
        YValue.value = withTiming(0, {
          duration: 500,
          easing: Easing.out(Easing.linear),
        });
      }, 2500);
    }
  }, [visible]);

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        animatedStyle,
        {
          backgroundColor: color.secondaryBg,
          borderColor:
            type === "success" ? toastColor.success : toastColor.error,
        },
      ]}
    >
      <View style={styles.toastInfo}>
        <AntDesign
          name={type === "success" ? "checkcircleo" : "closecircleo"}
          size={24}
          color={type === "success" ? toastColor.success : toastColor.error}
        />
        <Text style={[styles.toastMessage, { color: color.primaryText }]}>
          {message}
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toastContainer: {
    paddingHorizontal: 30,
    paddingVertical: 16,
    borderWidth: 1,
    borderRadius: 100,
    zIndex: 100,
  },
  toastInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
  },
  toastMessage: {
    fontSize: 15,
  },
});
