import React from "react";
import UrlScreen from "./UrlScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "../assets/icons";
import QrScanScreen from "./QrScanScreen";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "react-native";

const Tab = createBottomTabNavigator();

const CustomHeader = ({ title, action }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/images/transperant_logo.png")}
      />
      <Text style={styles.text}>{title}</Text>

      <TouchableOpacity style={styles.icon} onPress={action}>
        <Text>DB</Text>
      </TouchableOpacity>
    </View>
  );
};

const Welcome = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          if (route.name === "Url") {
            return (
              <View style={{ marginTop: 10 }}>
                <Icon
                  name={"home"}
                  size={30}
                  stroke={1}
                  color={focused ? "black" : "#2e2e2e"}
                />
              </View>
            );
          }
          if (route.name === "QrCode") {
            return (
              <View style={{ marginTop: 10 }}>
                <Icon
                  name={"qr"}
                  size={30}
                  stroke={1}
                  color={focused ? "black" : "#2e2e2e"}
                />
              </View>
            );
          }
        },
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen
        name="Url"
        options={{
          headerTitle: () => (
            <CustomHeader
              title="LINK CHECKER"
              action={() => navigation.navigate("Profile")}
            />
          ),
        }}
        component={UrlScreen}
      />
      <Tab.Screen
        options={{
          headerTitle: () => (
            <CustomHeader
              title="QR SCANNER"
              action={() => navigation.navigate("Profile")}
            />
          ),
        }}
        name="QrCode"
        component={QrScanScreen}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  icon: {
    marginLeft: "auto",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 34,
    height: 34,
    borderRadius: 100,
    backgroundColor: "#2e2e2e",
    alignItems: "center",
  },
  logo: {
    marginLeft: -20,
    height: 70,
    width: 70,
  },
});
export default Welcome;
