import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";

import { Colors } from "@/src/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export default function Profile() {
  const colorTheme = useColorScheme();
  const color = Colors[colorTheme ?? "light"];
  const { user } = useUser();
  const { signOut } = useAuth();

  return (
    <View
      style={{
        flex: 1,
        paddingVertical: 70,
        backgroundColor: color.secondaryBg,
      }}
    >
      {user && (
        <View style={{ alignItems: "center" }}>
          <Image source={{ uri: user.imageUrl }} style={styles.avatar} />
          <Text style={[styles.name, { color: color.primaryText }]}>
            {user.firstName}
          </Text>
          <Text style={[styles.email, { color: color.disabled }]}>
            {user.emailAddresses[0].emailAddress}
          </Text>

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => signOut()}
            style={[styles.logoutBtn, { borderColor: color.primaryText }]}
          >
            <Ionicons
              name="log-out-outline"
              style={{ fontSize: 30, color: color.primaryText }}
            />
            <Text style={[styles.logoutText, { color: color.primaryText }]}>
              Log Out
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  name: {
    fontFamily: "QuicksandBold",
    fontSize: 35,
  },
  email: {
    fontFamily: "QuicksandMed",
    fontSize: 15,
  },
  logoutBtn: {
    width: "70%",
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 60,
    borderWidth: 1,
    borderRadius: 30,
  },
  logoutText: {
    fontFamily: "QuicksandBold",
    fontSize: 20,
    textAlign: "center",
  },
});
