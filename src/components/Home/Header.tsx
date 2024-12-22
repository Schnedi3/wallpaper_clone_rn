import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useThemeColor } from "@/src/hooks/useThemeColor";
import { walls } from "@/assets/data/walls";

export default function Header({
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
  setModalVisible,
}: {
  search: string;
  setSearch: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  setModalVisible: (value: boolean) => void;
}): JSX.Element {
  const { color } = useThemeColor();

  const categories = walls.map((wall) => wall.category);
  const uniqueCategories = [...new Set(categories)];

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: color.primaryBg, borderBottomColor: color.border },
      ]}
    >
      <View style={{ gap: 20 }}>
        <View
          style={{
            paddingHorizontal: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 20,
          }}
        >
          <View
            style={[styles.searchContainer, { borderColor: color.disabled }]}
          >
            <Ionicons
              name="search-outline"
              style={{ fontSize: 24, color: color.primaryText }}
            />
            <TextInput
              style={[styles.searchInput, { color: color.primaryText }]}
              placeholder="Search for a wall..."
              placeholderTextColor={color.secondaryText}
              value={search}
              onChangeText={(search) => setSearch(search)}
            />
            {search && (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => setSearch("")}
              >
                <Ionicons
                  name="close"
                  style={{ fontSize: 24, color: color.primaryText }}
                />
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            activeOpacity={0.5}
            style={[styles.filterBtn, { borderColor: color.disabled }]}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons
              name="filter-outline"
              style={{ fontSize: 24, color: color.primaryText }}
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 10, paddingHorizontal: 20 }}
        >
          {uniqueCategories.map((category) => (
            <TouchableOpacity
              activeOpacity={0.5}
              key={category}
              style={[
                styles.categotyBtn,
                {
                  backgroundColor:
                    selectedCategory === category ? color.accent : color.catBg,
                },
              ]}
              onPress={() =>
                setSelectedCategory(
                  selectedCategory === category ? "" : category
                )
              }
            >
              <Text style={[styles.categoryText, { color: color.primaryText }]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    height: 150,
    borderBottomWidth: 1,
  },
  searchContainer: {
    flex: 1,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    borderWidth: 1,
    borderRadius: 30,
  },
  searchInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
    fontFamily: "QuicksandMed",
    fontSize: 16,
  },
  filterBtn: {
    width: 50,
    height: 50,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 30,
  },
  categotyBtn: {
    paddingTop: 4,
    paddingBottom: 9,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  categoryText: {
    fontFamily: "QuicksandMed",
    fontSize: 16,
  },
});
