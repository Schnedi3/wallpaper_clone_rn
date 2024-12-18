import { StyleSheet, Text, useColorScheme, View } from "react-native";

import { Colors } from "@/src/constants/Colors";

export default function Suggested(): JSX.Element {
  const colorTheme = useColorScheme();
  const color = Colors[colorTheme ?? "light"];

  return (
    <View style={[styles.container, { backgroundColor: color.secondaryBg }]}>
      <Text style={[styles.title, { color: color.primaryText }]}>
        Suggested
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "QuicksandBold",
    fontSize: 55,
    opacity: 0.4,
  },
});
