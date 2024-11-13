import { useState } from "react";
import { StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Sheet from "../components/Sheet";

export default function Account() {
  const [openSheet, setOpenSheet] = useState<boolean>(false);

  return (
    <GestureHandlerRootView style={styles.container}>
      <Text style={styles.title}>Account</Text>
      <TouchableOpacity onPress={() => setOpenSheet(true)}>
        <Text>Open sheet</Text>
      </TouchableOpacity>

      {openSheet && <Sheet onClose={() => setOpenSheet(false)} />}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: StatusBar.currentHeight,
  },
  title: {
    fontSize: 60,
    fontWeight: "bold",
    opacity: 0.4,
  },
});
