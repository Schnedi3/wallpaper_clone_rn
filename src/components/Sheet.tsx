import { useState } from "react";
import {
  ActivityIndicator,
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
import Animated, { FadeInDown } from "react-native-reanimated";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import { AntDesign } from "@expo/vector-icons";

import Colors from "@/src/constants/Colors";

const { width } = Dimensions.get("window");

interface ISheetProps {
  currentWall: string;
  onClose: () => void;
}

export default function Sheet({ currentWall, onClose }: ISheetProps) {
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const colorTheme = useColorScheme();
  const color = Colors[colorTheme ?? "light"];

  const handleDownloadImage = async () => {
    setIsDownloading(true);
    const filename = currentWall.split("/").pop();

    if (permissionResponse?.status !== "granted") {
      await requestPermission();
    }

    const fileUri = FileSystem.documentDirectory + `${filename}`;
    const { uri } = await FileSystem.downloadAsync(currentWall, fileUri);

    const asset = await MediaLibrary.createAssetAsync(uri);
    if (asset) {
      console.log("Image downloaded successfully!");
    } else {
      console.log("Something went wrong!");
    }

    setIsDownloading(false);
  };

  return (
    <BottomSheet
      enablePanDownToClose={true}
      onClose={onClose}
      handleStyle={{
        backgroundColor: color.primaryBg,
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
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
          <Animated.View entering={FadeInDown.springify()}>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                { borderColor: color.primaryText },
                pressed && {
                  borderColor: color.accent,
                  backgroundColor: color.accent,
                },
              ]}
              onPress={handleDownloadImage}
            >
              {isDownloading ? (
                <ActivityIndicator size="small" color={color.primaryText} />
              ) : (
                <AntDesign
                  name="download"
                  style={[styles.buttonIcon, { color: color.primaryText }]}
                />
              )}
              <Text style={{ color: color.primaryText }}>
                {isDownloading ? "Saving..." : "Save"}
              </Text>
            </Pressable>
          </Animated.View>
          <Animated.View entering={FadeInDown.springify().delay(100)}>
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
          </Animated.View>
        </View>
        <Animated.View entering={FadeInDown.springify().delay(200)}>
          <Image style={styles.wall} source={{ uri: currentWall }} />
        </Animated.View>
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
