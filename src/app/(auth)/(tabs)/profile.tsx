import {
  Appearance,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";

import { useThemeColor } from "@/src/hooks/useThemeColor";

export default function Profile() {
  const { color } = useThemeColor();

  const { user } = useUser();
  const { signOut } = useAuth();

  return (
    <View
      style={{
        flex: 1,
        gap: 40,
        paddingVertical: 70,
        paddingHorizontal: 40,
        backgroundColor: color.secondaryBg,
      }}
    >
      <View style={{ alignItems: "center" }}>
        <Image source={{ uri: user?.imageUrl }} style={styles.avatar} />
        <Text style={[styles.name, { color: color.primaryText }]}>
          {user?.firstName}
        </Text>
        <Text style={[styles.email, { color: color.disabled }]}>
          {user?.emailAddresses[0].emailAddress}
        </Text>
      </View>

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
      style={[styles.themeBtn, { borderColor: color.primaryText }]}
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
    width: "100%",
    paddingVertical: 14,
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
  themeBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 30,
  },
});
