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
  const { url, score, certificate } = route.params;

  console.log({ url, score, certificate });
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
        <Text style={styles.sectionTitle}>Domain Security Analysis Report</Text>

        {/* Domain Information */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeading}>Domain Information</Text>
          <Text>Domain Name: {url}</Text>
          <Text>Domain Age: {getRelativeTime("2022-12-28T08:02:38.000Z")}</Text>
          <Text>SSL Certification: {certificate ? "valid" : "invalid"}</Text>
          {/* <Text>Hosting Provider: Example Host</Text> */}
        </View>

        {/* Security Overview */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeading}>Security Overview</Text>
          <View style={styles.analysisRow}>
            <Text>Malware Detected</Text>
            <Text style={styles.safe}>Yes</Text>
          </View>
          <View style={styles.analysisRow}>
            <Text>Phishing Link</Text>
            <Text style={styles.safe}>No</Text>
          </View>
          <View style={styles.analysisRow}>
            <Text>SSL Certificate</Text>
            <Text style={styles.safe}>{certificate ? "valid" : "invalid"}</Text>
          </View>
        </View>

        {/* Detailed Threat Analysis */}
        {/* <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeading}>Detailed Threat Analysis</Text>
          <View style={styles.analysisRow}>
            <Text>SSL Certificate</Text>
            <Text style={styles.safe}>Valid</Text>
          </View>
          <View style={styles.analysisRow}>
            <Text>Phishing Detection</Text>
            <Text style={styles.danger}>Detected</Text>
          </View>
          <View style={styles.analysisRow}>
            <Text>Malware Scan</Text>
            <Text style={styles.safe}>Clean</Text>
          </View>
        </View> */}

        {/* Conclusion */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeading}>Conclusion</Text>
          <Text>Overall Security Score: 75% Secure</Text>
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
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#fff",
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
    elevation: 2,
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
