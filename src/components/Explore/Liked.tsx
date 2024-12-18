import {
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

import { useLikedStore } from "@/src/store/likedStore";
import WallImage from "./WallImage";
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
    <ScrollView
      style={{ backgroundColor: color.secondaryBg }}
      contentContainerStyle={styles.WallsContainer}
    >
      {liked.map((wall) => (
        <WallImage wall={wall} key={wall.id} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  WallsContainer: {
    minHeight: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 20,
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
