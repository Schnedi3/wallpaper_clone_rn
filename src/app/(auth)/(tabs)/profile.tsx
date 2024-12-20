import {
  Appearance,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";

import { useThemeColor } from "@/src/hooks/useThemeColor";

const { width } = Dimensions.get("window");

export default function Profile() {
  const { color } = useThemeColor();

  const { user } = useUser();
  const { signOut } = useAuth();

  return (
    <View style={[styles.container, { backgroundColor: color.secondaryBg }]}>
      <View style={{ alignItems: "center" }}>
        <Image source={{ uri: user?.imageUrl }} style={styles.avatar} />
        <Text style={[styles.name, { color: color.primaryText }]}>
          {user?.firstName}
        </Text>
        <Text style={[styles.email, { color: color.secondaryText }]}>
          {user?.emailAddresses[0].emailAddress}
        </Text>
      </View>

      <View style={{ gap: 10 }}>
        <Text style={[styles.themeTitle, { color: color.primaryText }]}>
          User
        </Text>

        <TouchableOpacity
          activeOpacity={0.5}
          style={[
            styles.button,
            { width: width / 3 - 30, borderColor: color.disabled },
          ]}
          onPress={() => signOut()}
        >
          <Ionicons
            name="log-out-outline"
            style={{ fontSize: 24, color: color.primaryText }}
          />
          <Text
            style={{ fontFamily: "QuicksandMed", color: color.primaryText }}
          >
            Log Out
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ gap: 10 }}>
        <Text style={[styles.themeTitle, { color: color.primaryText }]}>
          Theme
        </Text>

        <View style={{ flexDirection: "row", gap: 10 }}>
          <ThemeButton
            colorScheme={null}
            iconName="settings-outline"
            label="System"
          />
          <ThemeButton
            colorScheme="light"
            iconName="sunny-outline"
            label="Light"
          />
          <ThemeButton
            colorScheme="dark"
            iconName="moon-outline"
            label="Dark"
          />
        </View>
      </View>
    </View>
  );
}

export const ThemeButton = ({
  colorScheme,
  iconName,
  label,
}: {
  colorScheme: "light" | "dark" | null;
  iconName: keyof typeof Ionicons.glyphMap;
  label: string;
}) => {
  const { color } = useThemeColor();

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[styles.button, { flex: 1, borderColor: color.disabled }]}
      onPress={() => Appearance.setColorScheme(colorScheme)}
    >
      <Ionicons
        name={iconName}
        style={{ fontSize: 24, color: color.primaryText }}
      />
      <Text style={{ fontFamily: "QuicksandMed", color: color.primaryText }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 30,
    paddingVertical: 70,
    paddingHorizontal: 40,
  },
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
  button: {
    width: width / 3 - 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderWidth: 1,
    borderRadius: 30,
  },
  logoutText: {
    fontFamily: "QuicksandBold",
    fontSize: 20,
    textAlign: "center",
  },
  themeTitle: {
    fontFamily: "QuicksandBold",
    fontSize: 20,
  },
});
