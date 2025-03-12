import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const Button = ({ action, text }) => {
  return (
    <Pressable style={styles.button} onPress={action}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
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
});
