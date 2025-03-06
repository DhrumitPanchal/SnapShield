import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Svg, { Path } from "react-native-svg";

export default function Info(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={props?.size}
      height={props?.size}
      color={props?.color ? props.color : "#000000"}
      fill="none"
      {...props}
    >
      <Path
        d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
        stroke="currentColor"
        strokeWidth={props?.stroke}
      />
      <Path
        d="M12.2422 17V12C12.2422 11.5286 12.2422 11.2929 12.0957 11.1464C11.9493 11 11.7136 11 11.2422 11"
        stroke="currentColor"
        strokeWidth={props?.stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.992 8H12.001"
        stroke="currentColor"
        strokeWidth={props?.stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

const styles = StyleSheet.create({});
