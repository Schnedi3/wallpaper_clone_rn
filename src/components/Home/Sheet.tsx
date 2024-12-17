import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Pressable,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
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

import Toast from "@/src/components/Toast";
import { Colors } from "@/src/constants/Colors";

const { width } = Dimensions.get("window");

interface ISheetProps {
  currentWall: string;
  onClose: () => void;
}

export default function Sheet({
  currentWall,
  onClose,
}: ISheetProps): JSX.Element {
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [isDownloaded, setIsDownloaded] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
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
      setIsDownloaded(true);
      handleToast();
    } else {
      setIsDownloaded(false);
      console.log("There was an error!");
    }

    setIsDownloading(false);
  };

  const handleShare = async () => {
    try {
      await Share.share({ message: "Check out this wall!" });
    } catch (error) {
      Alert.alert("Error", "Failed to share Image");
    }
  };

  const handleToast = () => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 2500);
  };

  return (
    <BottomSheet
      snapPoints={["45%"]}
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
      enablePanDownToClose={true}
      onClose={onClose}
      enableOverDrag={false}
    >
      {isDownloaded && (
        <View style={styles.toastContainer}>
          <Toast
            type="success"
            message="Image downloaded successfully!"
            visible={visible}
          />
        </View>
      )}
      <BottomSheetView
        style={[styles.sheetContainer, { backgroundColor: color.primaryBg }]}
      >
        <View style={styles.buttonsContainer}>
          <Animated.View entering={FadeInDown.springify()}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={[styles.button, { borderColor: color.disabled }]}
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
              <Text
                style={{ fontFamily: "QuicksandMed", color: color.primaryText }}
              >
                {isDownloading ? "Saving..." : "Save"}
              </Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View entering={FadeInDown.springify().delay(150)}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={[styles.button, { borderColor: color.disabled }]}
              onPress={handleShare}
            >
              <AntDesign
                name="sharealt"
                style={[styles.buttonIcon, { color: color.primaryText }]}
              />
              <Text
                style={{ fontFamily: "QuicksandMed", color: color.primaryText }}
              >
                Share
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
        <Animated.View entering={FadeInDown.springify().delay(300)}>
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
  toastContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -60,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 20,
  },
  button: {
    width: width / 2 - 40,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
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
