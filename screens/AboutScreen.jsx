import { Image, StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/images/transperant_logo.png")}
        />
        <Text style={styles.text}>About App</Text>
      </View>

      <ScrollView style={styles.contentContainer}>
        <Text style={styles.heading}>Welcome to Secure Web View App</Text>
        <Text style={styles.description}>
          This app provides a secure web browsing experience by blocking
          automatic downloads and alerting users before downloading any files.
          It ensures your device is protected against harmful downloads and
          offers seamless browsing.
        </Text>

        <Text style={styles.subHeading}>Features:</Text>
        <Text style={styles.listItem}>✅ Secure Web Browsing</Text>
        <Text style={styles.listItem}>✅ Automatic Download Protection</Text>
        <Text style={styles.listItem}>✅ Custom WebView with Sandbox Mode</Text>
        <Text style={styles.listItem}>✅ Deep Link Support</Text>
        <Text style={styles.listItem}>✅ Download Confirmation Alerts</Text>

        <Text style={styles.subHeading}>Our Mission:</Text>
        <Text style={styles.description}>
          Our mission is to provide a safe and seamless browsing experience
          where users can access content without the risk of harmful downloads.
        </Text>

        <Text style={styles.subHeading}>Contact Us:</Text>
        <Text style={styles.description}>Email: support@securewebapp.com</Text>
        <Text style={styles.description}>Website: www.securewebapp.com</Text>
      </ScrollView>
    </View>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
    container: {
        position: "relative",
      },
      headerContainer: {
        display: "flex",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        paddingHorizontal: 20,
      },
      text: {
        fontSize: 20,
        fontWeight: "bold",
      },
      icon: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: 70,
        height: 70,
        borderRadius: 100,
        backgroundColor: "#2e2e2e",
        alignItems: "center",
      },
      logo: {
        marginLeft: -20,
        height: 70,
        width: 70,
      },
  contentContainer: {
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#555",
  },
  description: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
    marginBottom: 10,
  },
  listItem: {
    fontSize: 16,
    color: "#444",
    marginBottom: 5,
  },
});
