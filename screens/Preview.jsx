import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert, Modal } from "react-native";
import { WebView } from "react-native-webview";
import { Text } from "react-native";
import Button from "../components/Button";

const PreviewScreen = ({ route }) => {
  const [popup, setPopup] = useState(false);
  const [score, setScore] = useState(0);
  const { url } = route.params;
  const GOOGLE_API_KEY =
    "47e4d92aafb1f1a2fe07b7373eedd7d9a47af18504a623ee76dc4e6ae8bb2d2e";

  const checkURL = async () => {
    if (!url) {
      Alert.alert("Error", "URL is missing");
      return;
    }

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/x-www-form-urlencoded",
        "x-apikey": GOOGLE_API_KEY,
      },
      body: new URLSearchParams({
        url: url,
      }).toString(),
    };

    try {
      // First request to submit the URL for scanning
      const response = await fetch(
        "https://www.virustotal.com/api/v3/urls",
        options
      );
      const data = await response.json();

      if (response.ok && data.data) {
        const id = data.data.id;
        console.log("Scan ID:", id);

        // Polling the API every 5 seconds to check the result
        let attempts = 0;
        let result = null;

        while (attempts < 10) {
          const check = await axios.get(
            `https://www.virustotal.com/api/v3/analyses/${id}`,
            {
              headers: {
                accept: "application/json",
                "x-apikey": GOOGLE_API_KEY,
              },
            }
          );

          const status = check.data.data.attributes.status;
          console.log(`Attempt ${attempts + 1}: ${status}`);

          if (status === "completed") {
            result = check.data;
            break;
          }

          // Wait for 5 seconds before trying again
          await new Promise((resolve) => setTimeout(resolve, 5000));
          attempts++;
        }

        if (result) {
          const malicious = result.data.attributes.stats.malicious;
          if (malicious > 0) {
            setScore((pre) => pre + malicious);
            return setPopup(true);
          } else {
            setScore(0);
            return setPopup(false);
          }
        } else {
          Alert.alert("Error", "URL scan took too long or failed.");
        }
      } else {
        Alert.alert("Warning ❌", "Failed to check the URL!");
      }
    } catch (error) {
      console.error("Error checking URL:", error);
      Alert.alert("Error", "Unable to check the website.");
    }
  };
  async function checkDomain() {
    try {
      // Extract domain from URL
      const domain = url.replace(/(^\w+:|^)\/\//, "").split("/")[0];

      const response = await axios.get(
        `https://www.virustotal.com/api/v3/domains/${domain}`,
        {
          headers: {
            "x-apikey": GOOGLE_API_KEY,
          },
        }
      );

      const { data } = response;
      console.log("Domain Analysis:");
      console.log("Reputation:", data.data.attributes.reputation);
      console.log("Registrar:", data.data.attributes.registrar);
      console.log(
        "Creation Date:",
        new Date(data.data.attributes.creation_date * 1000)
      );
      console.log(
        "Last Analysis Date:",
        new Date(data.data.attributes.last_analysis_date * 1000)
      );
      console.log("Total Votes:", data.data.attributes.total_votes);
      console.log(
        "Malicious:",
        data.data.attributes.last_analysis_stats.malicious
      );
      console.log(
        "Suspicious:",
        data.data.attributes.last_analysis_stats.suspicious
      );
      console.log(
        "Harmless:",
        data.data.attributes.last_analysis_stats.harmless
      );
      console.log(
        "Undetected:",
        data.data.attributes.last_analysis_stats.undetected
      );

      // Example to set the malicious score
      if (data.data.attributes.last_analysis_stats.malicious > 0) {
        setScore(data.data.attributes.last_analysis_stats.malicious);
      }
    } catch (error) {
      console.error("Error checking domain:", error);
      Alert.alert("Error", "Unable to check the domain.");
    }
  }

  useEffect(() => {
    checkDomain();
    checkURL();
  }, []);

  return (
    <View style={styles.container}>
      <Modal
        style={styles.popupContainer}
        visible={popup}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setPopup(false)}
      >
        <View style={styles.cardContainer}>
          <View style={styles.box}>
            <View style={styles.resultContainer}>
              <Text style={styles.resultText}>{score}</Text>
              <Text style={styles.resultText}>/</Text>
              <Text style={styles.resultText}>96</Text>
            </View>

            <Text>
              This website might be unsafe! Proceed with caution, as it could
              pose security risks to your data and privacy
            </Text>
            <Button text={"Close"} action={() => setPopup(false)} />
          </View>
        </View>
      </Modal>
      <WebView
        source={{ uri: url }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        cacheEnabled={false}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          Alert.alert("Error", nativeEvent.description);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  popupContainer: {
    position: "relative",
    flex: 1,
  },
  cardContainer: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "rgba(46, 46, 46, 0.38)s",
  },
  box: {
    paddingTop: 40,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    height: 400,
    width: "80%",
    borderRadius: 20,
    marginHorizontal: "auto",
    backgroundColor: "white",
  },
  resultContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: 150,
    width: 150,
    borderWidth: 12,
    borderColor: "red",
    borderRadius: 100,
  },
  resultText: {
    fontSize: 30,
    fontWeight: "800",
  },
});

export default PreviewScreen;
