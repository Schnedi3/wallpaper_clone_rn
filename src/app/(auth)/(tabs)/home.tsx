import { useMemo, useState } from "react";
import { FlatList, View } from "react-native";
import { Stack } from "expo-router";

import { walls } from "@/assets/data/walls";
import WallList from "@/src/components/WallList";
import Toast from "@/src/components/Toast";
import { useWallStore } from "@/src/store/wallStore";
import { useThemeColor } from "@/src/hooks/useThemeColor";
import Header from "@/src/components/Home/Header";
import { FilterModal } from "@/src/components/Home/FilterModal";

export default function Home(): JSX.Element {
  const [search, setSearch] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [filterList, setFilterList] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { isDownloaded } = useWallStore();
  const { color } = useThemeColor();

  const filteredWalls = useMemo(() => {
    let filtered = walls;

    if (selectedCategory) {
      filtered = walls.filter((wall) => wall.category === selectedCategory);
    }

    if (search) {
      filtered = filtered.filter((wall) =>
        wall.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    return filtered;
  }, [selectedCategory, walls, search]);

  return (
    <View>
      {isDownloaded && <Toast />}

      <FilterModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        filterList={filterList}
        setFilterList={setFilterList}
      />

      <Stack.Screen
        options={{
          header: () => (
            <Header
              search={search}
              setSearch={setSearch}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              setModalVisible={setModalVisible}
            />
          ),
        }}
      />

      <FlatList
        style={{ minHeight: "100%", backgroundColor: color.secondaryBg }}
        contentContainerStyle={{ padding: 20, gap: 20 }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        data={filteredWalls.length > 0 ? filteredWalls : walls}
        numColumns={2}
        renderItem={({ item: wall }) => <WallList wall={wall} />}
      />
    </View>
  );
}
