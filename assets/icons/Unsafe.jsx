import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Svg, { Path } from "react-native-svg";

const Unsafe = (props) => {
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
        d="M5.32171 9.6829C7.73539 5.41196 8.94222 3.27648 10.5983 2.72678C11.5093 2.42437 12.4907 2.42437 13.4017 2.72678C15.0578 3.27648 16.2646 5.41196 18.6783 9.6829C21.092 13.9538 22.2988 16.0893 21.9368 17.8293C21.7376 18.7866 21.2469 19.6548 20.535 20.3097C19.241 21.5 16.8274 21.5 12 21.5C7.17265 21.5 4.75897 21.5 3.46496 20.3097C2.75308 19.6548 2.26239 18.7866 2.06322 17.8293C1.70119 16.0893 2.90803 13.9538 5.32171 9.6829Z"
        stroke="currentColor"
        stroke-width={props?.stroke}
      />
      <Path
        d="M12.2422 17V13C12.2422 12.5286 12.2422 12.2929 12.0957 12.1464C11.9493 12 11.7136 12 11.2422 12"
        stroke="currentColor"
        stroke-width={props?.stroke}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M11.992 8.99997H12.001"
        stroke="currentColor"
        stroke-width={props?.stroke}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default Unsafe;

const styles = StyleSheet.create({});
