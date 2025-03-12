import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useFocusEffect } from "@react-navigation/native";
import Button from "../components/Button";

const QRScanner = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setScanned(false);
      setKey((prevKey) => prevKey + 1); // Force re-rendering of the scanner
    }, [])
  );

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    navigation.navigate("Preview", { url: data });
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Scan QR Code</Text>
      <Text style={styles.description}>
        Place the QR code properly inside the area. Scanning will happen
        automatically.
      </Text>
      <View style={styles.qrContainer}>
        <BarCodeScanner
          key={key} // Force re-rendering
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 532 }}
        />
      </View>
      {scanned && (
        <Button text={"Tap to Scan Again"} action={() => setScanned(false)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  text: {
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    margin: 10,
    fontWeight: "400",
    textAlign: "center",
  },
  qrContainer: {
    marginBottom: 40,
    width: 300,
    height: 300,
    borderRadius: 20,
    overflow: "hidden",
    marginVertical: 20,
  },
});

export default QRScanner;
