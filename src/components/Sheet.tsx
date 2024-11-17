// import { useCallback } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { AntDesign } from "@expo/vector-icons";

import Colors from "@/src/constants/Colors";

const { width } = Dimensions.get("window");

interface ISheetProps {
  currentWall: string;
  onClose: () => void;
}

export default function Sheet({ currentWall, onClose }: ISheetProps) {
  const colorTheme = useColorScheme();
  const color = Colors[colorTheme ?? "light"];

  return (
    <BottomSheet
      enablePanDownToClose={true}
      onClose={onClose}
      handleStyle={{
        backgroundColor: color.primaryBg,
      }}
      handleIndicatorStyle={{
        backgroundColor: color.disabled,
      }}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          opacity={0.8}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          {...props}
        />
      )}
    >
      <BottomSheetView
        style={[styles.sheetContainer, { backgroundColor: color.primaryBg }]}
      >
        <View style={styles.buttonsContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              { borderColor: color.primaryText },
              pressed && {
                borderColor: color.accent,
                backgroundColor: color.accent,
              },
            ]}
          >
            <AntDesign
              name="download"
              style={[styles.buttonIcon, { color: color.primaryText }]}
            />
            <Text style={{ color: color.primaryText }}>Save</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              { borderColor: color.primaryText },
              pressed && {
                borderColor: color.accent,
                backgroundColor: color.accent,
              },
            ]}
          >
            <AntDesign
              name="sharealt"
              style={[styles.buttonIcon, { color: color.primaryText }]}
            />
            <Text style={{ color: color.primaryText }}>Share</Text>
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
    borderRadius: 50,
  },
  buttonIcon: {
    fontSize: 20,
  },
  wall: {
    width: width - 40,
    height: width * 0.6,
    borderRadius: 20,
    overflow: "hidden",
  },
});
