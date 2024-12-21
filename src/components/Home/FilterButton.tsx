import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { useThemeColor } from "@/src/hooks/useThemeColor";

export const FilterButton = ({
  item,
  sectionTitle,
  filterList,
  setFilterList,
}: {
  item: string;
  sectionTitle: string;
  filterList: string[];
  setFilterList: (value: string[]) => void;
}) => {
  const { color } = useThemeColor();

  const handleFilter = (item: string) => {
    setFilterList({ ...filterList, [sectionTitle]: item });
  };

  const isColor = sectionTitle === "color";
  const isSelected =
    filterList[sectionTitle as keyof typeof filterList] === item;

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[
        isColor ? styles.filterBtnColor : styles.filterBtn,
        {
          backgroundColor: isColor
            ? item
            : isSelected
            ? color.accent
            : color.catBg,
        },
        isColor && isSelected && { opacity: 1 },
      ]}
      onPress={() => handleFilter(item)}
    >
      <Text style={[styles.filter, { color: color.primaryText }]}>
        {isColor ? "" : item}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  filterBtn: {
    paddingTop: 4,
    paddingBottom: 6,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  filterBtnColor: {
    paddingVertical: 8,
    paddingHorizontal: 40,
    borderRadius: 30,
    opacity: 0.6,
  },
  filter: {
    fontFamily: "QuicksandMed",
    fontSize: 15,
    textTransform: "capitalize",
  },
});
