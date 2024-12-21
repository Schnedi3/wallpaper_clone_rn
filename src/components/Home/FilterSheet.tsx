import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

import { useThemeColor } from "@/src/hooks/useThemeColor";
import { filters } from "@/assets/data/filters";
import { FilterButton } from "./FilterButton";

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

  return (
    <BottomSheet
      snapPoints={["86%"]}
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
                    <FilterButton
                      key={index}
                      item={item}
                      sectionTitle={sectionTitle}
                      filterList={filterList}
                      setFilterList={setFilterList}
                    />
                  ))}
                </View>
              </View>
            )
          )}
        </View>

        <View style={{ marginTop: 25, flexDirection: "row", gap: 20 }}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={[styles.footerButton, { backgroundColor: color.disabled }]}
            onPress={() => setFilterList([])}
            disabled={filterList.length === 0}
          >
            <Text
              style={[styles.footerButtonText, { color: color.primaryText }]}
            >
              Reset
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={[styles.footerButton, { backgroundColor: color.accent }]}
            disabled={filterList.length === 0}
          >
            <Text
              style={[styles.footerButtonText, { color: color.primaryText }]}
            >
              Apply
            </Text>
          </TouchableOpacity>
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
  footerButton: {
    flex: 1,
    paddingTop: 14,
    paddingBottom: 18,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
  },
  footerButtonText: {
    fontFamily: "QuicksandMed",
    fontSize: 18,
    textAlign: "center",
  },
});
