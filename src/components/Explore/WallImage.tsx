import { useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

import { IWall } from "@/src/types/types";
import { useLikedStore } from "@/src/store/likedStore";
import Colors from "@/src/constants/Colors";

const { width } = Dimensions.get("window");

export default function WallImage({ wall }: { wall: IWall }) {
  const [openOverlay, setOpenOverlay] = useState<boolean>(false);
  const { removeFromLiked } = useLikedStore();
  const colorTheme = useColorScheme();
  const color = Colors[colorTheme ?? "light"];

  const handleRemoveFromLiked = () => {
    removeFromLiked(wall);
    setOpenOverlay(false);
  };

  return (
    <View>
      <Pressable onPress={() => setOpenOverlay(true)}>
        <Image style={styles.image} source={{ uri: wall.url }} key={wall.id} />
      </Pressable>

      {openOverlay && (
        <Pressable style={styles.overlay} onPress={() => setOpenOverlay(false)}>
          <Pressable
            style={[styles.removeButton, { borderColor: color.primaryText }]}
            onPress={handleRemoveFromLiked}
          >
            <Text style={[styles.removeText, { color: color.primaryText }]}>
              Remove from liked
            </Text>
          </Pressable>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
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
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  removeButton: {
    width: "80%",
    alignSelf: "center",
    padding: 15,
    borderWidth: 1,
    borderRadius: 30,
  },
  removeText: {
    textAlign: "center",
  },
});
