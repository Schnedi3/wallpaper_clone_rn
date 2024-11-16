// import { useCallback } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

import { lightColors } from "@/src/constants/Colors";
import { AntDesign } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

interface ISheetProps {
  currentWall: string;
  onClose: () => void;
}

export default function Sheet({ currentWall, onClose }: ISheetProps) {
  return (
    <BottomSheet
      enablePanDownToClose={true}
      onClose={onClose}
      handleIndicatorStyle={{ backgroundColor: lightColors.disabled }}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          opacity={0.8}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          {...props}
        />
      )}
    >
      <BottomSheetView style={styles.sheetContainer}>
        <View style={styles.buttonsContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
          >
            <AntDesign name="download" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
          >
            <AntDesign name="sharealt" style={styles.buttonIcon} />
            <Text>Share</Text>
          </Pressable>
        </View>
        <Image style={styles.wall} source={{ uri: currentWall }} />
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  sheetContainer: {
    flex: 1,
    paddingHorizontal: 36,
    paddingVertical: 20,
    alignItems: "center",
    gap: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 20,
    alignSelf: "flex-start",
  },
  button: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
    borderWidth: 1,
    borderColor: lightColors.primaryText,
    borderRadius: 50,
  },
  buttonPressed: {
    borderColor: lightColors.accent,
    backgroundColor: lightColors.accent,
  },
  buttonIcon: {
    fontSize: 20,
    color: lightColors.primaryText,
  },
  buttonText: {
    color: lightColors.primaryText,
  },
  wall: {
    width: width - 40,
    height: width * 0.6,
    borderRadius: 20,
    overflow: "hidden",
  },
});
