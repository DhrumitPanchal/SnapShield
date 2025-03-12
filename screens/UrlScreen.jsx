import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import axios from "axios";
import ScreenWrapper from "../components/ScreenWrapper";
import Button from "../components/Button";

const UrlScreen = ({ navigation }) => {
  const [url, setUrl] = useState("");

  const checkURL = async () => {
    if (url === "") {
      return Alert.alert("URL missing", "Please enter URL for check");
    }
    navigation.navigate("Preview", { url }); // Navigate with URL param
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Scan and Verify URLs Instantly!</Text>
        <Text style={[styles.title, { fontSize: 16, fontWeight: 400 }]}>
          Enter any website link to check its security status and protect
          yourself from malicious websites.
        </Text>
        <TextInput
          style={styles.input}
          placeholder="https://example.com"
          value={url}
          onChangeText={setUrl}
        />
        <Button text="Check URL" action={checkURL} />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: "900",
    color: "#333",
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
    padding: 10,
    fontSize: 16,
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 5,
    borderColor: "#ccc",
  },
});

export default UrlScreen;
