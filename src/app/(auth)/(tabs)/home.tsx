import { useMemo, useState } from "react";
import { FlatList } from "react-native";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Walls } from "@/assets/data/Walls";
import WallList from "@/src/components/WallList";
import Toast from "@/src/components/Toast";
import { useWallStore } from "@/src/store/wallStore";
import { useThemeColor } from "@/src/hooks/useThemeColor";
import Header from "@/src/components/Home/Header";
import FilterSheet from "@/src/components/Home/FilterSheet";

export default function Home(): JSX.Element {
  const [search, setSearch] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [openBottomsheet, setOpenBottomsheet] = useState<boolean>(false);
  const [filterList, setFilterList] = useState<string[]>([]);
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
    <GestureHandlerRootView>
      {isDownloaded && <Toast />}

      <Stack.Screen
        options={{
          header: () => (
            <Header
              search={search}
              setSearch={setSearch}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              openBottomsheet={openBottomsheet}
              setOpenBottomsheet={setOpenBottomsheet}
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

      {openBottomsheet && (
        <FilterSheet
          onClose={() => setOpenBottomsheet(false)}
          filterList={filterList}
          setFilterList={setFilterList}
        />
      )}
    </GestureHandlerRootView>
  );
}
