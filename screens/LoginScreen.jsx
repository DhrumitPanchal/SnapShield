import { Alert, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import ScreenWrapper from "../components/ScreenWrapper";
import GoogleButton from "../components/GoogleButton";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

const androidClientId =
  "181224964121-u34nsb68t34m36828v4j8f2dg9qkuap6.apps.googleusercontent.com";
const webClientId =
  "181224964121-k8k7f1te26h6pgtop5mvv6n5pehp7lqf.apps.googleusercontent.com";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }) => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: webClientId,
    androidClientId: androidClientId,
    scopes: ["profile", "email"],
  });

  Alert.alert("data", response);
  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      console.log("ID Token:", id_token);
    }
  }, [response]);

  // navigation.navigate("Link");
  // useEffect(() => {}, []);

  return (
    <ScreenWrapper bg={"black"}>
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image
            style={styles.logoImage}
            height={100}
            width={100}
            source={require("../assets/images/transperant_logo.png")}
          />
        </View>

        <View style={styles.bottomContainer}>
          <Text style={styles.loginTitle}>Login</Text>

          <Image
            style={styles.image}
            height={100}
            width={100}
            source={require("../assets/images/loginimage.jpg")}
          />
          <Text
            style={[styles.loginTitle, { fontSize: 14, fontWeight: "400" }]}
          >
            Protect yourself from malicious websites. Log in to scan links and
            get instant security reports.
          </Text>
          <GoogleButton action={() => promptAsync()} />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    display: "flex",
    justifyContent: "center",
    items: "center",
    position: "absolute",
    top: 0,
    marginTop: 80,
    height: 80,
    width: 80,
    backgroundColor: "white",
    borderRadius: 20,
    borderTopEndRadius: 0,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "white",
    width: "100%",
    height: "70%",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 0,
    padding: 20,
    paddingTop: 60,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  loginTitle: {
    fontSize: 28,
    fontWeight: "bold",
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 50,
  },
  logoImage: {
    width: 85,
    height: 85,
    borderRadius: 50,
  },
});
