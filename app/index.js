import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PreviewScreen from "../screens/Preview";
import UrlScreen from "../screens/UrlScreen";
import Welcome from "../screens/Welcome";
import LoginScreen from "../screens/LoginScreen";
const App = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Link" component={Welcome} />
      <Stack.Screen name="Preview" component={PreviewScreen} />
    </Stack.Navigator>
  );
};

export default App;
