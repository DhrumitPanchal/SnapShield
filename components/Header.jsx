import React from "react";
import { View, Text, StyleSheet } from "react-native";
function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>PreView</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal : 28,
    paddingVertical : 10,
    width: "100%",
    backgroundColor: "red",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Header;
