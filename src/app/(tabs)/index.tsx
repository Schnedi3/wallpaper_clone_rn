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
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";

import { Walls } from "@/src/constants/Walls";
import Carousel from "@/src/components/Carousel";
import Sheet from "@/src/components/Sheet";
import Colors from "@/src/constants/Colors";

const { width } = Dimensions.get("window");
const IMG_HEIGHT = 300;

export default function Home() {
  const [currentWall, setCurrentWall] = useState<string>("");
  const [openSheet, setOpenSheet] = useState<boolean>(false);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const colorTheme = useColorScheme();
  const color = Colors[colorTheme ?? "light"];

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

  const handleWallPress = (wall: string) => {
    setCurrentWall(wall);
    setOpenSheet(true);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <Carousel style={imageAnimatedStyle} />

        <View style={[styles.walls, { backgroundColor: color.primaryBg }]}>
          {Walls.map((wall) => (
            <View
              key={wall.id}
              style={[
                styles.wallContainer,
                { backgroundColor: color.primaryBg },
              ]}
            >
              <Pressable onPress={() => handleWallPress(wall.url)}>
                <Image style={styles.wall} source={{ uri: wall.url }} />
              </Pressable>

              <View style={styles.wallOverlay}>
                <Text
                  style={[styles.wallTitle, { color: color.secondaryText }]}
                >
                  {wall.title}
                </Text>
                <AntDesign
                  size={22}
                  name="hearto"
                  color={color.secondaryText}
                />
              </View>
            </View>
          ))}
        </View>
      </Animated.ScrollView>

      {openSheet && (
        <Sheet currentWall={currentWall} onClose={() => setOpenSheet(false)} />
      )}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  walls: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 15,
    padding: 20,
  },
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
  },
});
