import {
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

import { useLikedStore } from "@/src/store/likedStore";
import WallImage from "./WallImage";
import Colors from "@/src/constants/Colors";

export default function Liked() {
  const { liked } = useLikedStore();
  const colorTheme = useColorScheme();
  const color = Colors[colorTheme ?? "light"];

  return (
    <ScrollView>
      {liked.length > 0 ? (
        <View
          style={[styles.WallsContainer, { backgroundColor: color.primaryBg }]}
        >
          {liked.map((wall) => (
            <WallImage wall={wall} key={wall.id} />
          ))}
        </View>
      ) : (
        <View
          style={[styles.emptyContainer, { backgroundColor: color.primaryBg }]}
        >
          <Text style={[styles.empty, { color: color.primaryText }]}>
            Liked
          </Text>
        </View>
      )}
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
    fontSize: 60,
    fontWeight: "bold",
    opacity: 0.4,
  },
});
