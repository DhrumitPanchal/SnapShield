import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import * as SecureStore from "expo-secure-store";
import Icon from "../assets/icons";
import * as Application from "expo-application";

const ListCard = ({ name, des, action, icon }) => {
  return (
    <TouchableOpacity style={styles.touchable} onPress={action}>
      <Icon name={icon} color="black" size={28} stroke={1.4} />
      <View styles={styles.listTextContainer}>
        <Text
          style={[
            styles.name,
            { marginBottom: 2, fontSize: 18, fontWeight: "bold" },
          ]}
        >
          {name}
        </Text>
        <Text>{des}</Text>
      </View>
    </TouchableOpacity>
  );
};

const ProfileScreen = ({ navigation }) => {
  const options = [
    {
      name: "About App",
      description: "App details & features",
      icon: "info",
      action: () => navigation.navigate("About"),
    },
    { name: "Set Default", description: "Reset app settings", icon: "setting" },
    {
      name: "Version Info",
      description: "Version : " + Application.nativeApplicationVersion,
      icon: "tag",
    },
    {
      name: "Logout",
      description: "Sign out account",
      icon: "exit",
      action: () => logout(),
    },
  ];

  const logout = async () => {
    await SecureStore.deleteItemAsync("userData");
    navigation.navigate("Login");
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/images/transperant_logo.png")}
        />
        <Text style={styles.text}>Profile</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.profile}>
          <View style={styles.icon}>
            <Icon name="user" color="black" size={40} stroke={1.2} />
          </View>
          <View>
            <Text style={styles.name}>Dhrumit</Text>
            <Text
              style={[
                styles.name,
                { marginTop: 4, fontSize: 16, fontWeight: "normal" },
              ]}
            >
              dhrumitpanchal@gmail.com
            </Text>
          </View>
        </View>
        <View style={styles.divider} />

        <View style={styles.optionsContainer}>
          {options?.map((item, index) => {
            return (
              <ListCard
                key={index}
                name={item?.name}
                des={item?.description}
                icon={item?.icon}
                action={item?.action}
              />
            );
          })}
        </View>
      </View>
      <Text
        style={{
          position: "absolute",
          bottom: 100,
          left: "37%",
          fontSize: 20,
          color: "gray",
        }}
      >
        SnapShield
      </Text>
    </View>
  );
};

export default ProfileScreen;

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
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 80,
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
    height: "100%",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  profile: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 30,
  },

  divider: {
    height: 1,
    width: "100%",
    backgroundColor: "#2e2e2e",
    marginVertical: 20,
  },
  touchable: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 30,
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderColor: "#2e2e2e",
  },
  optionsContainer: {
    marginTop: 40,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
});
