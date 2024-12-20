import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";

import { useWallStore } from "@/src/store/wallStore";
import { useThemeColor } from "@/src/hooks/useThemeColor";

export default function Toast(): JSX.Element {
  const { toastVisible } = useWallStore();
  const { color } = useThemeColor();
  const YValue = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: YValue.value }],
    };
  });

  useEffect(() => {
    if (toastVisible) {
      YValue.value = withTiming(-100, {
        duration: 300,
        easing: Easing.out(Easing.linear),
      });
    } else {
      YValue.value = withTiming(0, {
        duration: 300,
        easing: Easing.out(Easing.linear),
      });
    }
  }, [toastVisible]);

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        animatedStyle,
        {
          backgroundColor: color.primaryBg,
          borderColor: color.border,
        },
      ]}
    >
      <View style={styles.toastInfo}>
        <AntDesign name="checkcircleo" size={24} color="#6bcf6d" />
        <Text style={[styles.toastMessage, { color: color.primaryText }]}>
          Image downloaded successfully!
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    bottom: -60,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
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
    fontFamily: "QuicksandMed",
    fontSize: 15,
  },
});
