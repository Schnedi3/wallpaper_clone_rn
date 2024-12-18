import { useState } from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";

import { Walls } from "@/assets/data/Walls";
import Carousel from "@/src/components/Home/Carousel";
import { Colors } from "@/src/constants/Colors";
import WallList from "@/src/components/Home/WallList";
import Toast from "@/src/components/Toast";

const IMG_HEIGHT = 300;

export default function Home(): JSX.Element {
  const [isDownloaded, setIsDownloaded] = useState<boolean>(false);
  const [toastVisible, setToastVisible] = useState<boolean>(false);

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

  return (
    <>
      {isDownloaded && (
        <View style={styles.toastContainer}>
          <Toast
            type="success"
            message="Image downloaded successfully!"
            toastVisible={toastVisible}
          />
        </View>
      )}

      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <Carousel style={imageAnimatedStyle} />

        <View style={[styles.walls, { backgroundColor: color.primaryBg }]}>
          {Walls.map((wall) => (
            <WallList
              key={wall.id}
              wall={wall}
              setIsDownloaded={setIsDownloaded}
              setToastVisible={setToastVisible}
            />
          ))}
        </View>
      </Animated.ScrollView>
    </>
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
  toastContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -60,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
});
