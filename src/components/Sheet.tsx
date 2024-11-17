import { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Platform,
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
  const colorTheme = useColorScheme();
  const color = Colors[colorTheme ?? "light"];

  const handleDownloadImage = async () => {
    const filename = currentWall.split("/").pop() || "";

    setIsDownloading(true);
    try {
      const result = await FileSystem.downloadAsync(
        currentWall,
        `${FileSystem.documentDirectory}${filename}`
      );

      setIsDownloading(false);
      saveDownloadedImage(result.uri, filename, result.headers["content-type"]);
    } catch (error: any) {
      setIsDownloading(false);
      console.log(error.message);
    }
  };

  const saveDownloadedImage = async (
    uri: string,
    filename: string,
    mymetype: string
  ) => {
    if (Platform.OS === "android") {
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

      if (!permissions.granted) {
        return;
      }

      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      await FileSystem.StorageAccessFramework.createFileAsync(
        permissions.directoryUri,
        filename,
        mymetype
      ).then(async (uri) => {
        await FileSystem.writeAsStringAsync(uri, base64, {
          encoding: FileSystem.EncodingType.Base64,
        });
      });
    }
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
