import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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

      <FlatList
        data={jobs}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No jobs applied yet</Text>
            <Text style={styles.emptyText}>
              Jobs you apply to will appear here so you can track them later.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
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
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 20,
  },
  emptyState: {
    flex: 1,
    minHeight: 260,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#102133",
    textAlign: "center",
  },
  emptyText: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    color: "#5A6B7D",
    textAlign: "center",
  },
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
