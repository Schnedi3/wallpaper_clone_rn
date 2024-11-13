import { StyleSheet, Text, View } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { lightColors } from "@/src/constants/Colors";

export default function Sheet({ onClose }: { onClose: () => void }) {
  return (
    <BottomSheet
      snapPoints={["90%"]}
      enablePanDownToClose={true}
      onClose={onClose}
      handleIndicatorStyle={{ backgroundColor: lightColors.disabled }}
    >
      <BottomSheetView style={styles.sheetContainer}>
        <Text style={styles.title}>Sheet</Text>
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  sheetContainer: {
    flex: 1,
    padding: 36,
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    opacity: 0.4,
  },
});
