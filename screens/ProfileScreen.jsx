import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Icon from "../assets/icons";
import * as Application from "expo-application";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Context } from "../context";
import { CommonActions } from "@react-navigation/native";

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
  const { user, setUser } = useContext(Context);

  const options = [
    {
      name: "About App",
      description: "App details & features",
      icon: "info",
      action: () => navigation.navigate("About"),
    },
    {
      name: "Set Default",
      description: "Set app as Default",
      icon: "setting",
    },
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
    Alert.alert("Confirmation", "Are you sure you want to logout?", [
      {
        text: "Yes",
        onPress: async () => {
          await AsyncStorage.removeItem("user");
          setUser(null);
          // navigation.replace("Login");
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Login" }], // Reset navigation to Login screen
            })
          );
        },
      },
      {
        text: "No",
        onPress: () => {},
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.back}
            source={require("../assets/icons/back.png")}
          />
        </TouchableOpacity>
        <Text style={styles.text}>Profile</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.profile}>
          <View style={styles.icon}>
            {user?.photo ? (
              <Image style={styles.userPhoto} source={{ uri: user?.photo }} />
            ) : (
              <Icon name="user" color="black" size={36} stroke={1.2} />
            )}
          </View>
          <View>
            <Text style={styles.name}>{user?.name}</Text>
            <Text
              style={[
                styles.name,
                { marginTop: 4, fontSize: 16, fontWeight: "normal" },
              ]}
            >
              {user?.email}
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
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  back: {
    height: 20,
    width: 20,
    marginRight: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  userPhoto: {
    height: "100%",
    width: "100%",
  },
  icon: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 100,
    overflow: "hidden",
    backgroundColor: "#dcdcdc",
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
    gap: 20,
  },

  divider: {
    height: 1.3,
    width: "100%",
    backgroundColor: "#dcdcdc",
    marginVertical: 20,
  },
  touchable: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 30,
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderColor: "#dcdcdc",
  },
  optionsContainer: {
    marginTop: 40,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
});
