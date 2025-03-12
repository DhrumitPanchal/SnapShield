import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  Modal,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { WebView } from "react-native-webview";
import { Text } from "react-native";
import Button from "../components/Button";
import Icon from "../assets/icons/index";

const PreviewScreen = ({ route, navigation }) => {
  const [popup, setPopup] = useState(false);
  const [score, setScore] = useState(0);
  const [certificate, setCertificate] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

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
      // Submit the URL for scanning
      const response = await fetch(
        "https://www.virustotal.com/api/v3/urls",
        options
      );
      const data = await response.json();

      if (response.ok && data.data) {
        const id = data.data.id;
        // console.log("Scan ID:", id);

        let attempts = 0;
        let result = null;

        // Wait for 5 seconds before polling (optional but helps API process request)
        await new Promise((resolve) => setTimeout(resolve, 5000));

        while (attempts < 15) {
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

          const filteredResults = Object.entries(
            check.data.data.attributes?.results
          )
            .filter(
              ([key, value]) =>
                value.result !== "clean" && value.result !== "unrated"
            )
            .reduce((acc, [key, value]) => {
              acc[key] = value;
              return acc;
            }, {});

          const isPhishing = Object.keys(filteredResults).filter(
            (item) => filteredResults[item].result === "phishing"
          );

          setResult((prev) => ({ ...prev, isPhishing: isPhishing.length > 0 }));
          if (status === "completed") {
            result = check.data;
            break;
          }

          await new Promise((resolve) => setTimeout(resolve, 5000));
          attempts++;
        }

        if (result) {
          const malicious = result.data.attributes.stats.malicious;

          setScore(malicious);

          if (malicious > 0) {
            setPopup(true);
          } else {
            setPopup(false);
          }
        } else {
          Alert.alert("Error", "URL scan took too long or failed.");
        }
      } else {
        // Alert.alert("Warning ❌", "Failed to check the URL!");
      }
    } catch (error) {
      console.error("Error checking URL:", error);
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

      const certificate = response.data.data.attributes.last_https_certificate;
      certificate && setCertificate(certificate);

      const { data } = response;
      console.log(data);
      setResult((prev) => ({
        ...prev,
        domain: response?.data?.data?.id,
        registrar: response?.data?.data?.attributes.registrar,
        malicious:
          response?.data?.data?.attributes.last_analysis_stats.malicious,
        harmless: response?.data?.data?.attributes.last_analysis_stats.harmless,
      }));

      if (data.data.attributes.last_analysis_stats.malicious > 0) {
        setScore(data.data.attributes.last_analysis_stats.malicious);
      }
    } catch (error) {
      console.error("Error checking domain:", error);
      // Alert.alert("Error", "Unable to check the domain.");
    }
  }
  const showMoreDetails = () => {
    navigation.navigate("Details", {
      url,
      score,
      certificate,
      details: result,
    });
  };

  const handleDownloadRequest = (event) => {
    const downloadExtensions = [".pdf", ".apk", ".zip", ".docx", ".xlsx"];
    const isDownloadable = downloadExtensions.some((ext) =>
      event.url.includes(ext)
    );

    if (isDownloadable) {
      Alert.alert(
        "Download Confirmation",
        "This site is trying to download a file. Do you want to proceed?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Download",
            onPress: () => {
              Linking.openURL(event.url); // Open the URL to start the download
            },
          },
        ]
      );
      return false; // Prevent WebView from auto-downloading
    }
    return true; // Allow normal navigation
  };
  useEffect(() => {
    checkDomain();
    checkURL();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.back}
            source={require("../assets/icons/back.png")}
          />
        </TouchableOpacity>
        {certificate ? (
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                "Secure Network",
                `SSL Certification Verified\nValid Until: ${new Date(
                  certificate.validity.not_after
                ).toDateString()}`
              )
            }
          >
            <Icon name="lock" size={24} color="black" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                "Insecure Network",
                "No valid SSL certificate found. This website may not be secure!"
              )
            }
          >
            <Icon name="unsafe" size={24} color="red" />
          </TouchableOpacity>
        )}
      </View>
      <Modal
        style={styles.popupContainer}
        visible={popup}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setPopup(false)}
      >
        <View style={styles.cardContainer}>
          <View style={styles.box}>
            <Image
              style={styles.alertImage}
              source={require("../assets/icons/warning.png")}
            />
            <Text>
              This website might be unsafe! Proceed with caution, as it failed
              {` ${score} out of 96`} security test cases, potentially posing
              risks to your data and privacy.
            </Text>
            <TouchableOpacity onPress={showMoreDetails}>
              <Text style={{ color: "blue", textDecorationLine: "underline" }}>
                Show more details
              </Text>
            </TouchableOpacity>
            <Button text={"Close"} action={() => setPopup(false)} />
          </View>
        </View>
      </Modal>

      {error ? (
        <View style={styles.errorContainer}>
          <Image
            style={styles.errorImage}
            source={require("../assets/images/error-icon.png")}
          />
          <Text style={{fontSize : 12}}>{error}</Text>
        </View>
      ) : (
        <WebView
          source={{ uri: url }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          cacheEnabled={false}
          allowFileAccess={false}
          allowFileAccessFromFileURLs={false}
          allowUniversalAccessFromFileURLs={false}
          mixedContentMode="never"
          incognito={true}
          onError={(syntheticEvent) => {
            setError(syntheticEvent.nativeEvent.description);
          }}
          onShouldStartLoadWithRequest={handleDownloadRequest} // Handle download request
          injectedJavaScript={`
window.open = function(){ return false; };
window.XMLHttpRequest = function(){ return false; };
`}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: "relative",
    left: 0,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: "100%",
    height: 60,
    borderBlockColor: "black",
    borderBottomWidth: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap : 10,
    marginTop: -40,
  },
  errorImage: {
    height: 120,
    width: 120,
  },
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
    backgroundColor: "#2e2e2es",
  },
  box: {
    paddingTop: 40,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    height: 370,
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
  back: {
    height: 20,
    width: 20,
  },
  alertImage: {
    height: 100,
    width: 100,
  },
});

export default PreviewScreen;

// import { StyleSheet, Text, View } from "react-native";
// import React from "react";

// const Preview = () => {
//   return (
//     <View>
//       <Text>Preview</Text>
//     </View>
//   );
// };

// export default Preview;

// const styles = StyleSheet.create({});
