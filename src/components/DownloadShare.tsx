import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import { AntDesign, Ionicons } from "@expo/vector-icons";

import { Colors } from "@/src/constants/Colors";
import { IWall } from "@/src/types/types";
import { useWallStore } from "@/src/store/wallStore";

export default function DownloadShare({
  wall,
  setOpenOverlay,
}: {
  wall: IWall;
  setOpenOverlay: (value: boolean) => void;
}): JSX.Element {
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const { setIsDownloaded, setToastVisible } = useWallStore();

  const handleDownloadImage = async () => {
    setIsDownloading(true);
    const filename = wall.url.split("/").pop();

    if (permissionResponse?.status !== "granted") {
      await requestPermission();
    }

    const fileUri = FileSystem.documentDirectory + `${filename}`;
    const { uri } = await FileSystem.downloadAsync(wall.url, fileUri);

    const asset = await MediaLibrary.createAssetAsync(uri);
    if (asset) {
      setIsDownloaded(true);
      handleToast();
      setOpenOverlay(false);
    } else {
      setIsDownloaded(false);
      Alert.alert("Error", "Failed to download Image");
    }

    setIsDownloading(false);
  };

  const handleShareImage = async () => {
    try {
      await Share.share({ message: "Check out this wall!" });
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to share Image");
    }

    setOpenOverlay(false);
  };

  const handleToast = () => {
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 2000);
  };

  return (
    <View style={styles.buttonsContainer}>
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.button}
        onPress={handleDownloadImage}
      >
        {isDownloading ? (
          <ActivityIndicator size="small" color={Colors.LightText} />
        ) : (
          <AntDesign name="download" style={styles.icon} />
        )}
        <Text style={styles.buttonText}>
          {isDownloading ? "Saving..." : "Save"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.button}
        onPress={handleShareImage}
      >
        <Ionicons name="share-social-outline" style={styles.icon} />
        <Text style={styles.buttonText}>Share</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 22,
    color: Colors.LightText,
  },
  buttonsContainer: {
    alignItems: "center",
    gap: 20,
  },
  button: {
    width: "80%",
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    color: Colors.LightText,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: Colors.LightText,
  },
  buttonText: {
    fontFamily: "QuicksandMed",
    color: Colors.LightText,
  },
});
