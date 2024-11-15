import {
  Dimensions,
  Image,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

import { lightColors } from "@/src/constants/Colors";
import { Walls } from "@/src/constants/Walls";

const { width } = Dimensions.get("window");

export default function Carousel({ style }: { style: StyleProp<ViewStyle> }) {
  const scrollX = useSharedValue(0);

  return (
    <Animated.View style={style}>
      <Animated.FlatList
        data={Walls}
        renderItem={({ item: wall }) => (
          <View>
            <Image style={styles.image} source={{ uri: wall.url }} />
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.8)"]}
              style={styles.background}
            />
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={(event) => {
          scrollX.value = event.nativeEvent.contentOffset.x;
        }}
        scrollEventThrottle={16}
      />

      <View style={styles.dotContainer}>
        {Walls.map((_, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const animatedDotStyle = useAnimatedStyle(() => {
            const widthAnimation = interpolate(
              scrollX.value,
              inputRange,
              [10, 20, 10],
              Extrapolation.CLAMP
            );

            const opacityAnimation = interpolate(
              scrollX.value,
              inputRange,
              [0.4, 1, 0.4],
              Extrapolation.CLAMP
            );

            return {
              width: widthAnimation,
              opacity: opacityAnimation,
            };
          });

          return (
            <Animated.View key={index} style={[styles.dot, animatedDotStyle]} />
          );
        })}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: width,
    height: width * 0.6,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 200,
  },
  dotContainer: {
    bottom: 20,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 20,
    backgroundColor: lightColors.invertedText,
  },
});
