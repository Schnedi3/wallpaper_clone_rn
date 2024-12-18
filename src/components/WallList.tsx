import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";

import { useLikedStore } from "@/src/store/likedStore";
import { Colors } from "@/src/constants/Colors";
import { IWall } from "@/src/types/types";
import DownloadShare from "@/src/components/DownloadShare";

const { width } = Dimensions.get("window");
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function WallList({ wall }: { wall: IWall }) {
  const [openOverlay, setOpenOverlay] = useState<boolean>(false);
  const { liked, addToLiked } = useLikedStore();
  const colorTheme = useColorScheme();
  const color = Colors[colorTheme ?? "light"];
  const YValue = useSharedValue(0);

  const overlayAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: YValue.value }],
    };
  });

  useEffect(() => {
    if (openOverlay) {
      YValue.value = withTiming(-280, {
        duration: 500,
        easing: Easing.out(Easing.linear),
      });
    } else {
      YValue.value = withTiming(0, {
        duration: 500,
        easing: Easing.out(Easing.linear),
      });
    }
  }, [openOverlay]);

  const isLiked = liked.some((item) => item.id === wall.id);

  return (
    <View
      style={[styles.wallContainer, { backgroundColor: color.secondaryBg }]}
    >
      <Pressable onPress={() => setOpenOverlay(true)}>
        <Image style={styles.wall} source={{ uri: wall.url }} />
      </Pressable>

      <AnimatedPressable
        style={[styles.wallOverlay, overlayAnimatedStyle]}
        onPress={() => setOpenOverlay(false)}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Text style={styles.wallTitle}>{wall.title}</Text>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => addToLiked(wall)}
            disabled={isLiked}
          >
            <AntDesign
              name={isLiked ? "heart" : "hearto"}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        <DownloadShare wall={wall} setOpenOverlay={setOpenOverlay} />
      </AnimatedPressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wallContainer: {
    width: width / 2 - 30,
    height: width * 0.7,
    borderRadius: 20,
    overflow: "hidden",
  },
  wall: {
    width: "100%",
    height: "100%",
  },
  wallOverlay: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 280,
    paddingHorizontal: 10,
    paddingVertical: 15,
    gap: 100,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  wallTitle: {
    fontFamily: "QuicksandMed",
    textAlign: "center",
    color: Colors.LightText,
  },
  icon: {
    fontSize: 22,
    color: Colors.LightText,
  },
});
