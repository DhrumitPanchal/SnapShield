import { Stack } from "expo-router";
import React from "react";

function _layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        statusBarStyle: "dark",
        statusBarBackgroundColor: "black",
      }}
    />
  );
}

export default _layout;
