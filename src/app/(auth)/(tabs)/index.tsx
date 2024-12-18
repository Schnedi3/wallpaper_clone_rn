import { FlatList, StyleSheet, useColorScheme, View } from "react-native";
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
import { useWallStore } from "@/src/store/wallStore";

const IMG_HEIGHT = 300;

export default function Home(): JSX.Element {
  const { isDownloaded } = useWallStore();
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
          <Toast type="success" message="Image downloaded successfully!" />
        </View>
      )}

      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        style={{ backgroundColor: color.secondaryBg }}
      >
        <Carousel style={imageAnimatedStyle} />

        <FlatList
          style={{ backgroundColor: color.secondaryBg }}
          contentContainerStyle={{ padding: 20, gap: 20 }}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          data={Walls}
          numColumns={2}
          renderItem={({ item: wall }) => <WallList wall={wall} />}
          scrollEnabled={false}
        />
      </Animated.ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
