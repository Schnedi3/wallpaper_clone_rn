import { useEffect, useState } from "react";
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
  Easing,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";

import { Walls } from "@/assets/data/Walls";
import Carousel from "@/src/components/Carousel";
import { useLikedStore } from "@/src/store/likedStore";
import { Colors } from "@/src/constants/Colors";

const { width } = Dimensions.get("window");
const IMG_HEIGHT = 300;
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function Home(): JSX.Element {
  const { liked, addToLiked } = useLikedStore();

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
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.6]
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

  const [visible, setVisible] = useState<boolean>(false);
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
      setTimeout(() => {
        YValue.value = withTiming(280, {
          duration: 500,
          easing: Easing.out(Easing.linear),
        });
      }, 2000);
    }
  }, [visible]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <Carousel style={imageAnimatedStyle} />

        <View style={[styles.walls, { backgroundColor: color.primaryBg }]}>
          {Walls.map((wall) => {
            const likedWall = liked.find((w) => w.id === wall.id);
            return (
              <View
                key={wall.id}
                style={[
                  styles.wallContainer,
                  { backgroundColor: color.primaryBg },
                ]}
              >
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
                    <Text
                      style={[styles.wallTitle, { color: color.secondaryText }]}
                    >
                      {wall.title}
                    </Text>
                    <AntDesign
                      size={22}
                      name={likedWall ? "heart" : "hearto"}
                      color={color.secondaryText}
                      onPress={() => addToLiked(wall)}
                    />
                  </View>

                  <View
                    style={{ alignItems: "center", gap: 20, marginTop: "50%" }}
                  >
                    <Text
                      style={{
                        fontFamily: "QuicksandMed",
                        color: color.secondaryText,
                        borderWidth: 1,
                        borderColor: color.secondaryText,
                        borderRadius: 30,
                        paddingVertical: 8,
                        paddingHorizontal: 20,
                      }}
                    >
                      Download
                    </Text>
                    <Text
                      style={{
                        fontFamily: "QuicksandMed",
                        color: color.secondaryText,
                        borderWidth: 1,
                        borderColor: color.secondaryText,
                        borderRadius: 30,
                        paddingVertical: 8,
                        paddingHorizontal: 20,
                      }}
                    >
                      Share
                    </Text>
                  </View>
                </AnimatedPressable>
              </View>
            );
          })}
        </View>
      </Animated.ScrollView>
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
});
