import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { Context } from "../context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = ({ navigation }) => {
  const { setUser } = useContext(Context);

  const getUserData = async () => {
    const data = await AsyncStorage.getItem("user");
    console.log("user data is  -------------");
    console.log(JSON.parse(data));
    setUser(JSON.parse(data));
    if (data) {
      return navigation.replace("Link");
    } else {
      return navigation.replace("Login");
    }
  };
  useEffect(() => {
    getUserData();
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
        <TouchableOpacity onPress={() => navigation.navigate("Link")}>
          <Image
            style={styles.logo}
            source={require("../assets/images/transperant_logo.png")}
          />
        </TouchableOpacity>
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
