import { StyleSheet, TextInput, View, FlatList, Text } from "react-native";
import React, { useState } from "react";
import { jobs } from "../services/seedData";

export default function Search() {
  const [searchValue, setSearchValue] = useState("");
  return (
    <View>
      <TextInput
        style={styles.textinput}
        placeholder="Cloud Engineer"
        value={searchValue}
        onChangeText={setSearchValue}
      />

      <FlatList
        data={jobs.filter((item) =>
          item.jobtitle.toLowerCase().includes(searchValue.toLowerCase()),
        )}
        renderItem={({ item }) => (
          <View style={styles.jobCard}>
            <Text style={styles.jobTitle}>{item.jobtitle}</Text>
            <Text style={styles.company}>{item.company}</Text>
            {/* <Text style={styles.jobMeta}>{`Applied on ${item.date}`}</Text> */}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
});
