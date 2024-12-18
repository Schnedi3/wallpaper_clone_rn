import {
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

import { Colors } from "@/src/constants/Colors";
import { Walls } from "@/assets/data/Walls";
import SuggestedImage from "./SuggestedImage";

export default function Suggested(): JSX.Element {
  const colorTheme = useColorScheme();
  const color = Colors[colorTheme ?? "light"];

  const shuffledWalls = [...Walls].sort(() => 0.5 - Math.random());
  const Suggested = shuffledWalls.slice(0, 6);

  if (Suggested.length === 0) {
    return (
      <View
        style={[styles.emptyContainer, { backgroundColor: color.secondaryBg }]}
      >
        <Text style={[styles.title, { color: color.primaryText }]}>
          Suggested
        </Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={[styles.container, { backgroundColor: color.secondaryBg }]}>
        {Suggested.map((wall) => (
          <SuggestedImage key={wall.id} wall={wall} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 20,
  },
  // empty
  emptyContainer: {
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
