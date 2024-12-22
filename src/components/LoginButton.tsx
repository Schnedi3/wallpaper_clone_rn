import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";

import { useThemeColor } from "@/src/hooks/useThemeColor";
import { Colors } from "@/src/constants/Colors";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

export const LoginButton = ({
  onPress,
  iconName,
  buttonText,
}: {
  onPress: () => void;
  iconName: keyof typeof Ionicons.glyphMap;
  buttonText: string;
}): JSX.Element => {
  const { color } = useThemeColor();

  return (
    <AnimatedTouchableOpacity
      activeOpacity={0.85}
      style={styles.LoginButton}
      onPress={onPress}
      entering={FadeInDown.springify().delay(400)}
    >
      <View style={styles.continue}>
        <Ionicons name={iconName} style={styles.logoIcon} />
        <Text style={styles.LoginButtonText}>{buttonText}</Text>
        <FontAwesome6
          name="arrow-right-long"
          style={{ fontSize: 20, color: color.accent }}
        />
      </View>
    </AnimatedTouchableOpacity>
  );
};

const styles = StyleSheet.create({
  LoginButton: {
    width: "80%",
    marginHorizontal: "10%",
    paddingVertical: 20,
    paddingHorizontal: 30,
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: Colors.darkBg,
  },
  continue: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoIcon: {
    fontSize: 24,
    color: Colors.LightText,
  },
  LoginButtonText: {
    fontFamily: "QuicksandSemi",
    fontSize: 17,
    color: Colors.LightText,
  },
});
