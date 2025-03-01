// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet, Alert } from "react-native";
// import { Camera, useCameraDevices } from "react-native-vision-camera";

// const QrScanScreen = () => {
//   const [hasPermission, setHasPermission] = useState(false);
//   const devices = useCameraDevices();
//   const device = devices.back;

//   useEffect(() => {
//     (async () => {
//       const status = await Camera.requestCameraPermission();
//       setHasPermission(status === "authorized");
//     })();
//   }, []);

//   const onCodeScanned = (code) => {
//     Alert.alert("QR Code Detected", code);
//   };

//   if (!device) return <Text>Camera not available</Text>;

//   return (
//     <View style={styles.container}>
//       {hasPermission ? (
//         <Camera
//           style={styles.camera}
//           device={device}
//           isActive={true}
//           onCodeScanned={(codes) => {
//             if (codes.length > 0) {
//               onCodeScanned(codes[0].value);
//             }
//           }}
//         />
//       ) : (
//         <Text>No Permission Granted</Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   camera: {
//     width: 300,
//     height: 300,
//     borderRadius: 20,
//     overflow: "hidden",
//   },
// });

// export default QrScanScreen;

import { StyleSheet, Text, View } from "react-native";
import React from "react";

const QrScanScreen = () => {
  return (
    <View>
      <Text>QrScanScreen</Text>
    </View>
  );
};

export default QrScanScreen;

const styles = StyleSheet.create({});
