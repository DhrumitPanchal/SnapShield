import { Alert, Image, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ScreenWrapper from "../components/ScreenWrapper";
import GoogleButton from "../components/GoogleButton";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Context } from "../context";

const webClientId =
  "309286171665-673dnjav05k5f99sb212a245hus0okvs.apps.googleusercontent.com";

const LoginScreen = ({ navigation }) => {
  const { setUser } = useContext(Context);

  GoogleSignin.configure({
    webClientId: webClientId,
    offlineAccess: true,
    scopes: ["profile", "email"],
  });
  const login = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const { data } = await GoogleSignin.signIn();
      const user = {
        name: data?.user?.name,
        email: data?.user?.email,
        photo: data?.user?.photo,
      };
      setUser(user);
      await AsyncStorage.setItem("user", JSON.stringify(user));
      navigation.replace("Link");
    } catch (error) {
      console.log("Google Signin Error", error.message);
      console.log(error);
    }
  };

  useEffect(() => {}, []);

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
          <GoogleButton action={() => login()} />
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
