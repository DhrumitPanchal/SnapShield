import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React from "react";

const DetailsScreen = ({ navigation, route }) => {
  const { url, score, certificate, details } = route.params;

  function getRelativeTime(dateString) {
    const givenDate = new Date(dateString);
    const currentDate = new Date();

    let years = currentDate.getFullYear() - givenDate.getFullYear();
    let months = currentDate.getMonth() - givenDate.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    let result = "";
    if (years > 0) {
      result += `${years} ${years === 1 ? "year" : "years"}`;
    }
    if (months > 0) {
      result += `${result ? ", " : ""}${months} ${
        months === 1 ? "month" : "months"
      }`;
    }

    return result || "Just now";
  }

  function checkCertificateValidity(notBefore, notAfter) {
    const currentTime = new Date();
    const notBeforeDate = new Date(notBefore);
    const notAfterDate = new Date(notAfter);

    if (currentTime < notBeforeDate) {
      return "Invalid (Not valid yet)";
    } else if (currentTime > notAfterDate) {
      return "Invalid (Expired)";
    } else {
      return "Valid";
    }
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.back}
            source={require("../assets/icons/back.png")}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Detailed Analysis</Text>
      </View>

      <ScrollView style={styles.container}>
        {/* <Text style={styles.sectionTitle}>Domain Security Analysis Report</Text> */}

        {/* Domain Information */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeading}>Domain Information</Text>

          <View style={styles.analysisRow}>
            <Text>Domain Name </Text>
            <Text>{details?.domain?.replace(/^https?:\/\//, "")}</Text>
          </View>

          {/* <View style={styles.analysisRow}>
            <Text>Domain Age:</Text>
            <Text> {getRelativeTime("2022-12-28T08:02:38.000Z")}</Text>
          </View> */}

          <View style={styles.analysisRow}>
            <Text>SSL Certification</Text>
            <Text>
              {checkCertificateValidity(
                certificate?.validity?.not_before,
                certificate?.validity?.not_after
              )}
            </Text>
          </View>

          <View style={styles.analysisRow}>
            <Text>Registrar</Text>
            <Text>{details?.registrar}</Text>
          </View>
        </View>

        {/* Security Overview */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeading}>Security Overview</Text>
          <View style={styles.analysisRow}>
            <Text>Malware Detected</Text>
            <Text style={details?.malicious > 0 ? styles.danger : styles.safe}>
              {details?.malicious > 0 ? "Yes" : "No"}
            </Text>
          </View>
          <View style={styles.analysisRow}>
            <Text>Phishing Link</Text>
            <Text style={details?.isPhishing ? styles.danger : styles.safe}>
              {details?.isPhishing ? "Yes" : "No"}
            </Text>
          </View>
          <View style={styles.analysisRow}>
            <Text>SSL Certificate</Text>
            <Text
              style={
                checkCertificateValidity(
                  certificate?.validity?.not_before,
                  certificate?.validity?.not_after
                ) === "Valid"
                  ? styles.safe
                  : styles.danger
              }
            >
              {checkCertificateValidity(
                certificate?.validity?.not_before,
                certificate?.validity?.not_after
              )}
            </Text>
          </View>
        </View>

        {/* Conclusion */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeading}>Conclusion</Text>
          <Text>Overall Security Score: {details?.harmless}% Secure</Text>
          <Text style={styles.caution}>
            Recommendation: Proceed with Caution
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 18,
    backgroundColor: "#ffff",
  },
  back: {
    height: 20,
    width: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
  },
  container: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    // elevation: 2,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  analysisRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  safe: {
    color: "green",
    fontWeight: "bold",
  },
  danger: {
    color: "red",
    fontWeight: "bold",
  },
  caution: {
    color: "orange",
    fontWeight: "bold",
  },
});
