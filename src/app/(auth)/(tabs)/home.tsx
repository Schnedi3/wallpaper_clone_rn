import { FlatList, StyleSheet, View } from "react-native";

import { Walls } from "@/assets/data/Walls";
import WallList from "@/src/components/WallList";
import Toast from "@/src/components/Toast";
import { useWallStore } from "@/src/store/wallStore";
import { useThemeColor } from "@/src/hooks/useThemeColor";
import { Stack } from "expo-router";

import Header from "@/src/components/Home/Header";

export default function Home(): JSX.Element {
  const { isDownloaded } = useWallStore();
  const { color } = useThemeColor();

  return (
    <>
      {isDownloaded && (
        <View style={styles.toastContainer}>
          <Toast type="success" message="Image downloaded successfully!" />
        </View>
      )}

      <Stack.Screen options={{ header: () => <Header /> }} />

      <FlatList
        style={{ backgroundColor: color.secondaryBg }}
        contentContainerStyle={{ padding: 20, gap: 20 }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        data={Walls}
        numColumns={2}
        renderItem={({ item: wall }) => <WallList wall={wall} />}
      />
    </>
  );
}

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -60,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
});
