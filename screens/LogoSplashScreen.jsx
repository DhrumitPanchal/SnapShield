import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const LogoSplashScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Image
        style={{ height: 200, width: 200 }}
        source={require("../assets/images/logo.jpeg")}
      />
    </View>
  );
};

export default LogoSplashScreen;

const styles = StyleSheet.create({});
