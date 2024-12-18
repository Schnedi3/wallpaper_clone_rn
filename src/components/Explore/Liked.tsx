import { FlatList, StyleSheet, Text, useColorScheme, View } from "react-native";

import { useLikedStore } from "@/src/store/likedStore";
import LikedImage from "./LikedImage";
import { Colors } from "@/src/constants/Colors";

export default function Liked(): JSX.Element {
  const { liked } = useLikedStore();
  const colorTheme = useColorScheme();
  const color = Colors[colorTheme ?? "light"];

  if (liked.length === 0) {
    return (
      <View
        style={[styles.emptyContainer, { backgroundColor: color.secondaryBg }]}
      >
        <Text style={[styles.empty, { color: color.primaryText }]}>Liked</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={{ backgroundColor: color.secondaryBg }}
      contentContainerStyle={{ padding: 20, gap: 20 }}
      columnWrapperStyle={{ justifyContent: "space-between" }}
      data={liked}
      numColumns={2}
      renderItem={({ item: wall }) => <LikedImage wall={wall} />}
    />
  );
}

const styles = StyleSheet.create({
  WallsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 20,
    padding: 20,
  },
  emptyContainer: {
    minHeight: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  empty: {
    fontFamily: "QuicksandBold",
    fontSize: 55,
    opacity: 0.4,
  },
});
