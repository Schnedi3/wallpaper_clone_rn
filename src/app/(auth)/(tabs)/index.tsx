import { FlatList, StyleSheet, useColorScheme, View } from "react-native";

import { Walls } from "@/assets/data/Walls";
import { Colors } from "@/src/constants/Colors";
import WallList from "@/src/components/WallList";
import Toast from "@/src/components/Toast";
import { useWallStore } from "@/src/store/wallStore";

const IMG_HEIGHT = 300;

export default function Home(): JSX.Element {
  const { isDownloaded } = useWallStore();
  const colorTheme = useColorScheme();
  const color = Colors[colorTheme ?? "light"];

  return (
    <>
      {isDownloaded && (
        <View style={styles.toastContainer}>
          <Toast type="success" message="Image downloaded successfully!" />
        </View>
      )}

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
