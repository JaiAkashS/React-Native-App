import {
  StyleSheet,
  TextInput,
  View,
  FlatList,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [jobsdata, setJobsData] = useState([]);
  const [appliedJobKeys, setAppliedJobKeys] = useState([]);
  const [extendedKeys, setExtendedKeys] = useState([]);

  const getJobKey = (job) => {
    if (job?.id != null) return `id:${job.id}`;
    if (job?._id != null) return `_id:${job._id}`;
    if (job?.uuid) return `uuid:${job.uuid}`;

    const title = (job?.title || "").trim().toLowerCase();
    const company = (job?.owner?.companyName || "").trim().toLowerCase();
    return `${title}|${company}`;
  };

  const handleApply = async (item) => {
    try {
      const storedData = await AsyncStorage.getItem("appliedjobs");

      let jobs = storedData ? JSON.parse(storedData) : [];
      const itemKey = getJobKey(item);

      const alreadyApplied = jobs.some((job) => getJobKey(job) === itemKey);

      if (!alreadyApplied) {
        jobs.push(item);
        await AsyncStorage.setItem("appliedjobs", JSON.stringify(jobs));
        setAppliedJobKeys((prev) =>
          prev.includes(itemKey) ? prev : [...prev, itemKey],
        );
        if (Platform.OS === "web") {
          alert("Applied Job");
        } else {
          Alert.alert("Success", "Applied");
        }
      } else if (Platform.OS === "web") {
        alert("Already applied");
      } else {
        Alert.alert("Info", "Already applied");
      }
    } catch (error) {
      console.log(error);

      if (Platform.OS === "web") {
        alert("Error");
      } else {
        Alert.alert("Error", "Application failed");
      }
    }
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          "https://api.joinrise.io/api/v1/jobs/public?page=1&limit=40&sort=asc&sortedBy=createdAt&includeDescription=true&isTrending=true",
        );

        // console.log(res.data.result.jobs);
        let jobs = res.data.result.jobs;
        jobs = jobs.map((item) => {
          return {
            ...item,
            createdAt: new Date(item.createdAt).toLocaleDateString(),
          };
        });
        setJobsData(jobs);

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    };

    const loadAppliedJobs = async () => {
      try {
        const storedData = await AsyncStorage.getItem("appliedjobs");
        const jobs = storedData ? JSON.parse(storedData) : [];
        setAppliedJobKeys(jobs.map((job) => getJobKey(job)));
      } catch (error) {
        console.log(error);
      }
    };

    fetchJobs();
    loadAppliedJobs();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        style={styles.textinput}
        placeholder="Cloud Engineer"
        value={searchValue}
        onChangeText={setSearchValue}
      />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={jobsdata.filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase()),
          )}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => {
            const itemKey = getJobKey(item);
            const isApplied = appliedJobKeys.includes(itemKey);
            const isExtended = extendedKeys.includes(itemKey);
            return (
              <View style={styles.jobCard}>
                <View style={styles.cardRow}>
                  <View style={styles.leftColumn}>
                    <Text style={styles.jobTitle}>{item.title}</Text>
                    <Text style={styles.company}>{item.owner.companyName}</Text>
                    <Text
                      style={styles.jobMeta}
                    >{`Created At ${item.createdAt}`}</Text>
                  </View>
                  <View style={styles.rightColumn}>
                    <Text
                      style={styles.salaryText}
                    >{`₹${item.descriptionBreakdown.salaryRangeMinYearly} - ₹${item.descriptionBreakdown.salaryRangeMaxYearly}`}</Text>
                    <TouchableOpacity
                      onPress={async () => {
                        await handleApply(item);
                      }}
                      disabled={isApplied}
                      style={[
                        styles.applyButton,
                        isApplied && styles.applyButtonDisabled,
                      ]}
                    >
                      <Text style={styles.applyButtonText}>
                        {isApplied ? "Applied" : "Apply"}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setExtendedKeys((prev) => {
                          return prev.includes(itemKey)
                            ? prev.filter((val) => val !== itemKey)
                            : prev.concat(itemKey);
                        });
                      }}
                    >
                      <Text style={styles.toggleText}>
                        {isExtended ? "Show less" : "Show more"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                {isExtended ? (
                  <View style={styles.extendedContainer}>
                    <Text style={styles.extendedSummaryText}>
                      {item.descriptionBreakdown?.oneSentenceJobSummary}
                    </Text>
                    <Text style={styles.extendedTypeText}>
                      {item.descriptionBreakdown?.employmentType}
                    </Text>
                  </View>
                ) : null}
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 20,
  },
  textinput: {
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "dark-grey",
    margin: 20,
    padding: 10,
    color: "grey",
  },
  jobCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  cardRow: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "center",
    columnGap: 12,
  },
  leftColumn: {
    flex: 1,
    minWidth: 0,
  },
  rightColumn: {
    width: 150,
    marginLeft: "auto",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    rowGap: 10,
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
  salaryText: {
    color: "green",
    fontWeight: "bold",
    fontSize: 13,
    textAlign: "right",
  },
  applyButton: {
    backgroundColor: "#1C7ED6",
    borderRadius: 10,
    minHeight: 40,
    minWidth: 110,
    paddingHorizontal: 12,
    paddingVertical: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  applyButtonDisabled: {
    backgroundColor: "#A0A8B3",
  },
  applyButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
  toggleText: {
    color: "#1C7ED6",
    fontSize: 13,
    fontWeight: "700",
  },
  extendedContainer: {
    marginTop: 12,
    borderRadius: 8,
    backgroundColor: "#F4F8FC",
    borderWidth: 1,
    borderColor: "#D7E3F2",
    padding: 10,
    rowGap: 4,
  },
  extendedSummaryText: {
    color: "#21374D",
    fontSize: 12,
    lineHeight: 18,
    textAlign: "left",
  },
  extendedTypeText: {
    color: "#0D5C2E",
    fontSize: 12,
    fontWeight: "700",
    textAlign: "left",
  },
});
