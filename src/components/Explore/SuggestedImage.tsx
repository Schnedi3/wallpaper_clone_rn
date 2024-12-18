import { Dimensions, Image, StyleSheet, View } from "react-native";

import { IWall } from "@/src/types/types";

const { width } = Dimensions.get("window");

export default function SuggestedImage({ wall }: { wall: IWall }): JSX.Element {
  return (
    <View key={wall.id}>
      <Image key={wall.id} style={styles.image} source={{ uri: wall.url }} />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: width / 2 - 30,
    height: width * 0.7,
    borderRadius: 16,
  },
});
