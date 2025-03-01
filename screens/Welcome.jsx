import React from "react";
import UrlScreen from "./UrlScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "../assets/icons";
import QrScanScreen from "./QrScanScreen";
import { StyleSheet, Text, View } from "react-native";
import { Image } from "react-native";

const Tab = createBottomTabNavigator();

const CustomHeader = ({ title }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/images/transperant_logo.png")}
      />
      <Text style={styles.text}>{title}</Text>

      <View style={styles.icon}>
        <Text>DB</Text>
      </View>
    </View>
  );
};

const Welcome = () => {
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
                  color={focused ? "black" : "rgba(46, 46, 46, 0.38)"}
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
                  color={focused ? "black" : "rgba(46, 46, 46, 0.38)"}
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
          headerTitle: () => <CustomHeader title="LINK CHECKER" />,
        }}
        component={UrlScreen}
      />
      <Tab.Screen
        options={{
          headerTitle: () => <CustomHeader title="QR SCANNER" />,
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
    backgroundColor: "hsla(0, 0.00%, 18.00%, 0.20)",
    alignItems: "center",
  },
  logo: {
    marginLeft: -20,
    height: 70,
    width: 70,
  },
});
export default Welcome;
