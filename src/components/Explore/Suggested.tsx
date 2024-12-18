import { FlatList, StyleSheet, Text, useColorScheme, View } from "react-native";

import { Colors } from "@/src/constants/Colors";
import { Walls } from "@/assets/data/Walls";
import WallList from "@/src/components/Home/WallList";

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
    <FlatList
      style={[styles.container, { backgroundColor: color.secondaryBg }]}
      contentContainerStyle={{ padding: 20, gap: 20 }}
      columnWrapperStyle={{ justifyContent: "space-between" }}
      data={Suggested}
      numColumns={2}
      renderItem={({ item: wall }) => <WallList wall={wall} />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
