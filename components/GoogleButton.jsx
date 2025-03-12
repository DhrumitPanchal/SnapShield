import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const GoogleButton = ({ action }) => {
  return (
    <Pressable style={styles.button} onPress={action}>
      <Image
        style={styles.image}
        source={require("../assets/icons/google.png")}
      />
      <Text style={styles.text}>Google</Text>
    </Pressable>
  );
};

export default GoogleButton;

const styles = StyleSheet.create({
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    backgroundColor: "black",
    width: "100%",
    padding: 10,
    paddingVertical: 14,
    borderRadius: 10,
  },
  text: {
    color: "white",
    fontVariant: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  image: {
    width: 26,
    height: 26,
    borderRadius: 50,
  },
});
