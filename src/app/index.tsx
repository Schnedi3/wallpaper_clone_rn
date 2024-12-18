import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Linking from "expo-linking";
import { useOAuth } from "@clerk/clerk-expo";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";

import { Colors } from "@/src/constants/Colors";
import { useWarmUpBrowser } from "@/src/hooks/useWarmUpBrowser";

enum Strategy {
  Google = "oauth_google",
  Apple = "oauth_apple",
  Facebook = "oauth_facebook",
}

export default function LoginScreen(): JSX.Element {
  const colorTheme = useColorScheme();
  const color = Colors[colorTheme ?? "light"];

  useWarmUpBrowser();
  const { startOAuthFlow: googleAuth } = useOAuth({
    strategy: Strategy.Google,
  });
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: Strategy.Apple });
  const { startOAuthFlow: facebookAuth } = useOAuth({
    strategy: Strategy.Facebook,
  });

  const handleLogin = async (social: Strategy) => {
    const selectedStrategy = {
      [Strategy.Google]: googleAuth,
      [Strategy.Apple]: appleAuth,
      [Strategy.Facebook]: facebookAuth,
    }[social];

    try {
      const { createdSessionId, setActive } = await selectedStrategy({
        redirectUrl: Linking.createURL("/(auth)/(tabs)", { scheme: "myapp" }),
      });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.login}>
        <Text style={styles.title}>Welcome</Text>

        <LoginButton
          onPress={() => handleLogin(Strategy.Google)}
          iconName="logo-google"
          buttonText="Continue with Google"
        />

        <LoginButton
          onPress={() => handleLogin(Strategy.Apple)}
          iconName="logo-apple"
          buttonText="Continue with Apple"
        />

        <LoginButton
          onPress={() => handleLogin(Strategy.Facebook)}
          iconName="logo-facebook"
          buttonText="Continue with Facebook"
        />
      </View>

      <LinearGradient
        colors={[
          "rgba(255, 255, 255, 0)",
          "rgba(255, 255, 255, 0.5)",
          "#ffffff",
          "#ffffff",
        ]}
        style={styles.gradient}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.9 }}
      />
      <Image
        source={require("@/assets/images/welcome.png")}
        style={styles.welcome}
      />
    </View>
  );
}

const LoginButton = ({
  onPress,
  iconName,
  buttonText,
}: {
  onPress: () => void;
  iconName: keyof typeof Ionicons.glyphMap;
  buttonText: string;
}) => {
  const colorTheme = useColorScheme();
  const color = Colors[colorTheme ?? "light"];

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.LoginButton}
      onPress={onPress}
    >
      <View style={styles.continue}>
        <Ionicons name={iconName} style={styles.logoIcon} />
        <Text style={styles.LoginButtonText}>{buttonText}</Text>
        <FontAwesome6
          name="arrow-right-long"
          style={{ fontSize: 20, color: color.accent }}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontFamily: "QuicksandBold",
    fontSize: 55,
    color: Colors.darkText,
  },
  gradient: {
    width: "100%",
    height: "60%",
    position: "absolute",
    left: 0,
    bottom: 0,
    zIndex: -5,
  },
  welcome: {
    width: "100%",
    height: "100%",
    position: "absolute",
    inset: 0,
    resizeMode: "cover",
    filter: "blur(2px), grayscale(40%)",
    zIndex: -10,
  },
  // login
  login: {
    gap: 10,
    alignItems: "center",
    marginTop: "auto",
    paddingVertical: 50,
  },
  LoginButton: {
    width: "80%",
    marginHorizontal: "10%",
    paddingVertical: 20,
    paddingHorizontal: 30,
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: Colors.darkBg,
  },
  continue: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoIcon: {
    fontSize: 24,
    color: Colors.LightText,
  },
  LoginButtonText: {
    fontFamily: "QuicksandSemi",
    fontSize: 17,
    color: Colors.LightText,
  },
});
