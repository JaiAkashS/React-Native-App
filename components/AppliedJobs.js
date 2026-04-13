import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

export default function AppliedJobs({ navigation }) {
  const [image, setImage] = useState(null);
  const [jobs, setJobs] = useState([]);

  const loadData = useCallback(async () => {
    const avatar = await AsyncStorage.getItem("userAvatar");
    const jobsRaw = await AsyncStorage.getItem("appliedjobs");
    setImage(avatar);
    setJobs(jobsRaw ? JSON.parse(jobsRaw) : []);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData]),
  );

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.title}>Applied Jobs</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          {image ? (
            <Image source={{ uri: image }} style={styles.avatar} />
          ) : (
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>JD</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      {/* <Text style={styles.subtitle}>Welcome back, Candidate</Text> */}

      <Text style={styles.sectionTitle}>Applied Jobs</Text>
      <FlatList
        data={jobs}
        renderItem={({ item }) => (
          <View
            style={[
              styles.jobCard,
              { flexDirection: "row", justifyContent: "space-between" },
            ]}
          >
            <View style={{ flex: 2, justifyContent: "space-between" }}>
              <Text style={styles.jobTitle}>{item.title}</Text>
              <Text style={styles.company}>{item.owner.companyName}</Text>
              <Text
                style={styles.jobMeta}
              >{`Created At ${item.createdAt}`}</Text>
            </View>
            <View style={{ flex: 1, justifyContent: "space-evenly" }}>
              <Text
                style={[styles.jobMeta, { color: "green", fontWeight: "bold" }]}
              >{`₹${item.descriptionBreakdown.salaryRangeMinYearly} - ₹${item.descriptionBreakdown.salaryRangeMaxYearly}`}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#102133",
  },
  subtitle: {
    marginTop: 4,
    marginBottom: 16,
    color: "#5A6B7D",
    fontSize: 14,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    paddingVertical: 12,
    marginHorizontal: 4,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1C7ED6",
  },
  statLabel: {
    fontSize: 12,
    color: "#5A6B7D",
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#102133",
    marginBottom: 10,
  },
  jobCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
  },
  jobTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#102133",
  },
  jobMeta: {
    fontSize: 13,
    color: "#5A6B7D",
    marginTop: 4,
    marginBottom: 2,
  },
  company: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#2a7dd6",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E7F2FE",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  avatarText: {
    color: "#1C7ED6",
    fontSize: 24,
    fontWeight: "700",
  },
});
