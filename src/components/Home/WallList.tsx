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
import { AntDesign, Ionicons } from "@expo/vector-icons";

import { useLikedStore } from "@/src/store/likedStore";
import { Colors } from "@/src/constants/Colors";
import { IWall } from "@/src/types/types";

const { width } = Dimensions.get("window");
const IMG_HEIGHT = 300;
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function WallList({ wall }: { wall: IWall }) {
  const [visible, setVisible] = useState<boolean>(false);

  const { liked, addToLiked } = useLikedStore();
  const colorTheme = useColorScheme();
  const color = Colors[colorTheme ?? "light"];
  const YValue = useSharedValue(280);

  const overlayAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: YValue.value }],
    };
  });

  useEffect(() => {
    if (visible) {
      YValue.value = withTiming(0, {
        duration: 500,
        easing: Easing.out(Easing.linear),
      });
    } else {
      YValue.value = withTiming(280, {
        duration: 500,
        easing: Easing.out(Easing.linear),
      });
    }
  }, [visible]);

  const likedWall = liked.find((item) => item.id === wall.id);

  return (
    <View style={[styles.wallContainer, { backgroundColor: color.primaryBg }]}>
      <Pressable onPress={() => setVisible(true)}>
        <Image style={styles.wall} source={{ uri: wall.url }} />
      </Pressable>

      <AnimatedPressable
        style={[styles.wallOverlay, overlayAnimatedStyle]}
        onPress={() => setVisible(false)}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Text style={[styles.wallTitle, { color: color.secondaryText }]}>
            {wall.title}
          </Text>
          <AntDesign
            size={22}
            name={likedWall ? "heart" : "hearto"}
            color={color.secondaryText}
            onPress={() => addToLiked(wall)}
          />
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={[styles.button, { borderColor: color.secondaryText }]}
          >
            <AntDesign name="download" size={22} color={color.secondaryText} />
            <Text style={[styles.buttonText, { color: color.secondaryText }]}>
              Download
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.6}
            style={[styles.button, { borderColor: color.secondaryText }]}
          >
            <Ionicons
              name="share-social-outline"
              size={22}
              color={color.secondaryText}
            />
            <Text style={[styles.buttonText, { color: color.secondaryText }]}>
              Share
            </Text>
          </TouchableOpacity>
        </View>
      </AnimatedPressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wallContainer: {
    width: width / 2 - 30,
    height: IMG_HEIGHT * 1.1,
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
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  wallTitle: {
    fontFamily: "QuicksandMed",
    textAlign: "center",
  },
  buttonsContainer: {
    alignItems: "center",
    gap: 20,
    marginTop: "50%",
  },
  button: {
    width: "80%",
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderWidth: 1,
    borderRadius: 30,
  },
  buttonText: {
    fontFamily: "QuicksandMed",
  },
});
