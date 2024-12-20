import {
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

import { useThemeColor } from "@/src/hooks/useThemeColor";
import { filters } from "@/assets/data/filters";

export default function FilterSheet({
  onClose,
  filterList,
  setFilterList,
}: {
  onClose: () => void;
  filterList: string[];
  setFilterList: (value: string[]) => void;
}): JSX.Element {
  const { color } = useThemeColor();

  const handleFilter = (filter: string) => {
    setFilterList([...filterList, filter]);

    if (filterList.includes(filter)) {
      setFilterList(filterList.filter((f) => f !== filter));
    }
  };

  return (
    <BottomSheet
      snapPoints={["70%"]}
      onClose={onClose}
      enableContentPanningGesture={false}
      enableOverDrag={false}
      enablePanDownToClose={true}
      handleStyle={{ backgroundColor: color.primaryBg, borderRadius: 16 }}
      backgroundStyle={{ backgroundColor: color.primaryBg }}
      handleIndicatorStyle={{ backgroundColor: color.disabled }}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          opacity={0.6}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      )}
    >
      <BottomSheetView style={styles.container}>
        <Text style={[styles.title, { color: color.primaryText }]}>
          Filters
        </Text>

        <View style={{ gap: 25 }}>
          {Object.entries(filters).map(
            ([sectionTitle, sectionItems], index) => (
              <View key={sectionTitle + index} style={{ gap: 10 }}>
                <Text style={[styles.subtitle, { color: color.primaryText }]}>
                  {sectionTitle}
                </Text>

                <View style={styles.filterBtnContainer}>
                  {sectionItems.map((item, index) => (
                    <TouchableOpacity
                      key={item + index}
                      activeOpacity={0.5}
                      style={[
                        styles.filterBtn,
                        {
                          backgroundColor: filterList.includes(item)
                            ? color.accent
                            : color.catBg,
                        },
                      ]}
                      onPress={() => handleFilter(item)}
                    >
                      <Text
                        style={[styles.filter, { color: color.primaryText }]}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )
          )}
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    gap: 30,
  },
  title: {
    fontFamily: "QuicksandBold",
    fontSize: 35,
  },
  subtitle: {
    fontFamily: "QuicksandSemi",
    fontSize: 20,
    textTransform: "capitalize",
  },
  filterBtnContainer: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
  },
  filterBtn: {
    paddingTop: 4,
    paddingBottom: 6,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  filter: {
    fontFamily: "QuicksandMed",
    fontSize: 15,
    textTransform: "capitalize",
  },
});
