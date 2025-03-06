import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PreviewScreen from "../screens/Preview";
import Welcome from "../screens/Welcome";
import LoginScreen from "../screens/LoginScreen";
import DetailsScreen from "../screens/DetailsScreen";
import { StyleSheet } from "react-native";
import ProfileScreen from "../screens/ProfileScreen";
import SplashScreen from "../screens/SplashScreen";
import AboutScreen from "../screens/AboutScreen";

const Navigation = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
      initialRouteName="Splash"
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Link" component={Welcome} />
      <Stack.Screen name="Preview" component={PreviewScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
    </Stack.Navigator>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
