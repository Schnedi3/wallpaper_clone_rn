import { Modal, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useThemeColor } from "@/src/hooks/useThemeColor";
import { filters } from "@/assets/data/filters";
import { FilterButton } from "./FilterButton";

export const FilterModal = ({
  modalVisible,
  setModalVisible,
  filterList,
  setFilterList,
}: {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  filterList: string[];
  setFilterList: (value: string[]) => void;
}) => {
  const { color } = useThemeColor();

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity
          style={[styles.modalClose, { backgroundColor: color.catBg }]}
          onPress={() => setModalVisible(false)}
        >
          <Ionicons
            name="close"
            size={24}
            color={color.primaryText}
          />
        </TouchableOpacity>

        <View style={styles.centeredView}>
          <View
            style={[styles.container, { backgroundColor: color.primaryBg }]}
          >
            <View style={styles.filtersContainer}>
              {Object.entries(filters).map(
                ([sectionTitle, sectionItems], index) => (
                  <View key={sectionTitle + index} style={{ gap: 10 }}>
                    <Text
                      style={[styles.subtitle, { color: color.primaryText }]}
                    >
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

            <View style={styles.footerContainer}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={[
                  styles.footerButton,
                  {
                    backgroundColor: color.catBg,
                    borderBottomLeftRadius: 20,
                  },
                ]}
                onPress={() => setFilterList([])}
                disabled={filterList.length === 0}
              >
                <Text
                  style={[
                    styles.footerButtonText,
                    { color: color.primaryText },
                  ]}
                >
                  Reset
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                style={[
                  styles.footerButton,
                  {
                    backgroundColor: color.accent,
                    borderBottomRightRadius: 20,
                  },
                ]}
                disabled={filterList.length === 0}
              >
                <Text
                  style={[
                    styles.footerButtonText,
                    { color: color.primaryText },
                  ]}
                >
                  Apply
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalClose: {
    position: "absolute",
    top: 248,
    right: 30,
    padding: 8,
    borderTopRightRadius: 20,
    zIndex: 100,
  },
  container: {
    marginHorizontal: 30,
    paddingTop: 20,
    gap: 30,
    borderRadius: 20,
  },
  subtitle: {
    fontFamily: "QuicksandBold",
    fontSize: 18,
    textTransform: "capitalize",
  },
  filtersContainer: {
    paddingHorizontal: 20,
    gap: 20,
  },
  filterBtnContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  footerContainer: {
    flexDirection: "row",
  },
  footerButton: {
    flex: 1,
    paddingTop: 14,
    paddingBottom: 18,
  },
  footerButtonText: {
    fontFamily: "QuicksandSemi",
    fontSize: 17,
    textAlign: "center",
  },
});
