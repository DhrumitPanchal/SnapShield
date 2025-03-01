import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import ScreenWrapper from "../components/ScreenWrapper";
import GoogleButton from "../components/GoogleButton";
import { signInWithGoogle } from "../firebase/actions";

const LoginScreen = ({ navigation }) => {
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
          <GoogleButton
            action={() => navigation.navigate("Link", { screen: "Url" })}
          />
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
