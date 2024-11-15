import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";

import { Walls } from "@/src/constants/Walls";
import Carousel from "../components/Carousel";
import { lightColors } from "@/src/constants/Colors";

const { width } = Dimensions.get("window");
const IMG_HEIGHT = 300;

export default function Explore() {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 1.2]
          ),
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <Carousel style={imageAnimatedStyle} />

        <View style={styles.walls}>
          {Walls.map((wall) => (
            <View key={wall.id} style={styles.wallContainer}>
              <Image style={styles.wall} source={{ uri: wall.url }} />
              <View style={styles.wallOverlay}>
                <Text style={styles.wallTitle}>{wall.title}</Text>
                <AntDesign
                  size={22}
                  name="hearto"
                  color={lightColors.invertedText}
                />
              </View>
            </View>
          ))}
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightColors.secondaryBg,
  },
  walls: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 15,
    backgroundColor: lightColors.secondaryBg,
    padding: 20,
  },
  wallContainer: {
    width: width / 2 - 30,
    height: IMG_HEIGHT * 1.2,
    borderRadius: 20,
    overflow: "hidden",
  },
  wall: {
    width: "100%",
    height: "100%",
  },
  wallOverlay: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    paddingHorizontal: 10,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  wallTitle: {
    textAlign: "center",
    color: lightColors.invertedText,
  },
});
