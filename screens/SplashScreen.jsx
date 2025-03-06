import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import * as SecureStore from "expo-secure-store";

const SplashScreen = ({ navigation }) => {
  const check = async () => {
    const data = SecureStore.getItem("userData");

    if (data) {
      navigation.navigate("Link");
    } else {
      navigation.navigate("Login");
    }
  };
  useEffect(() => {
    check();
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 40,
          transform: [{ scale: 2 }, { rotateX: "10deg" }],
        }}
      >
        <ActivityIndicator size="large" color="black" />
      </View>

      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../assets/images/transperant_logo.png")}
        />
        <Text style={styles.text}>SnapShield</Text>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 50,
  },
  logo: {
    marginLeft: -20,
    height: 70,
    width: 70,
  },
  text: {
    fontSize: 26,
    fontWeight: "bold",
    color: "black",
  },
});
