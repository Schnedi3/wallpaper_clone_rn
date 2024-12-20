import { useMemo, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Stack } from "expo-router";

import { Walls } from "@/assets/data/Walls";
import WallList from "@/src/components/WallList";
import Toast from "@/src/components/Toast";
import { useWallStore } from "@/src/store/wallStore";
import { useThemeColor } from "@/src/hooks/useThemeColor";
import Header from "@/src/components/Home/Header";

export default function Home(): JSX.Element {
  const [search, setSearch] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { isDownloaded } = useWallStore();
  const { color } = useThemeColor();

  const filteredWalls = useMemo(() => {
    let filtered = Walls;

    if (selectedCategory) {
      filtered = Walls.filter((wall) => wall.category === selectedCategory);
    }

    if (search) {
      filtered = filtered.filter((wall) =>
        wall.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    return filtered;
  }, [selectedCategory, Walls, search]);

  return (
    <>
      {isDownloaded && (
        <View style={styles.toastContainer}>
          <Toast type="success" message="Image downloaded successfully!" />
        </View>
      )}

      <Stack.Screen
        options={{
          header: () => (
            <Header
              search={search}
              setSearch={setSearch}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          ),
        }}
      />

      <FlatList
        style={{ backgroundColor: color.secondaryBg }}
        contentContainerStyle={{ padding: 20, gap: 20 }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        data={filteredWalls.length > 0 ? filteredWalls : Walls}
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
