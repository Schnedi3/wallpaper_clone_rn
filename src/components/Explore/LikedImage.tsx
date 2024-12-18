import { useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";

import { IWall } from "@/src/types/types";
import { useLikedStore } from "@/src/store/likedStore";
import { Colors } from "@/src/constants/Colors";
import DownloadShare from "@/src/components/DownloadShare";

const { width } = Dimensions.get("window");
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function LikedImage({ wall }: { wall: IWall }): JSX.Element {
  const [openOverlay, setOpenOverlay] = useState<boolean>(false);
  const { removeFromLiked } = useLikedStore();

  const handleRemoveFromLiked = () => {
    removeFromLiked(wall);
    setOpenOverlay(false);
  };

  return (
    <View>
      <AnimatedPressable onPress={() => setOpenOverlay(true)} exiting={ZoomOut}>
        <Image style={styles.wall} source={{ uri: wall.url }} />
      </AnimatedPressable>

      {openOverlay && (
        <AnimatedPressable
          style={styles.overlay}
          onPress={() => setOpenOverlay(false)}
          entering={ZoomIn}
          exiting={ZoomOut}
        >
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.removeButton}
            onPress={handleRemoveFromLiked}
          >
            <Text style={styles.removeText}>Remove from liked</Text>
          </TouchableOpacity>

          <DownloadShare wall={wall} setOpenOverlay={setOpenOverlay} />
        </AnimatedPressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wall: {
    width: width / 2 - 30,
    height: width * 0.7,
    borderRadius: 20,
  },
  overlay: {
    width: width / 2 - 30,
    height: width * 0.7,
    position: "absolute",
    inset: 0,
    justifyContent: "center",
    gap: 20,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  removeButton: {
    alignSelf: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: Colors.LightText,
  },
  removeText: {
    fontFamily: "QuicksandMed",
    textAlign: "center",
    color: Colors.LightText,
  },
});
