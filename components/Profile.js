import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Linking,
  Platform,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { pickImage } from "../services/ImageUpload";
import { uploadPDF } from "../services/ResumeUpload";

export default function Profile({ navigation }) {
  const [image, setImage] = useState(null);
  const [resume, setResume] = useState(null);
  const [resumeUploadStatus, setResumeUploadStatus] = useState("");
  const [iseditable, setEditable] = useState(false);
  const [userdata, setUserData] = useState({
    email: "john@example.com",
    phone: "9175215412",
    location: "Chennai, Tambarm",
    experience: "2",
  });

  useEffect(() => {
    const getData = async () => {
      const avatar = await AsyncStorage.getItem("userAvatar");
      const savedResume = await AsyncStorage.getItem("resume");

      if (avatar !== null) {
        setImage(avatar);
      }

      if (savedResume !== null) {
        setResume(savedResume);
      }
    };
    getData();
  }, []);

  const openResumeLink = async () => {
    if (!resume) return;

    try {
      if (Platform.OS === "web") {
        const opened = window.open(resume, "_blank", "noopener,noreferrer");
        if (!opened) {
          window.location.assign(resume);
        }
        return;
      }

      const canOpen = await Linking.canOpenURL(resume);
      if (!canOpen) {
        Alert.alert("Error", "Cannot open resume link");
        return;
      }

      await Linking.openURL(resume);
    } catch (error) {
      console.log(error);
      if (Platform.OS === "web") {
        setResumeUploadStatus("Could not open resume. Try again.");
      } else {
        Alert.alert("Error", "Failed to open resume");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity
          onPress={async () => {
            const uploadedUrl = await pickImage();
            if (uploadedUrl) setImage(uploadedUrl);
          }}
        >
          {image ? (
            <Image source={{ uri: image }} style={styles.avatar} />
          ) : (
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>JD</Text>
            </View>
          )}
        </TouchableOpacity>

        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.role}>React Native Developer</Text>

        {!iseditable && (
          <View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{userdata.email}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={[styles.infoValue]}>{userdata.phone}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Location</Text>
              <Text style={styles.infoValue}>{userdata.location}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Experience</Text>
              <Text
                style={styles.infoValue}
              >{`${userdata.experience} Years`}</Text>
            </View>
          </View>
        )}

        {iseditable && (
          <View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email</Text>
              <TextInput
                style={[styles.infoValue]}
                value={userdata.email}
                onChangeText={(text) => {
                  setUserData({ ...userdata, email: text });
                }}
              />
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Phone</Text>
              <TextInput
                style={[styles.infoValue]}
                value={userdata.phone}
                onChangeText={(text) => {
                  setUserData({ ...userdata, phone: text });
                }}
              />
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Location</Text>
              <TextInput
                style={[styles.infoValue]}
                value={userdata.location}
                onChangeText={(text) => {
                  setUserData({ ...userdata, location: text });
                }}
              />
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Experience</Text>
              <TextInput
                style={[styles.infoValue]}
                value={userdata.experience}
                onChangeText={(text) => {
                  setUserData({ ...userdata, experience: text });
                }}
              />
            </View>
          </View>
        )}

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.editButton}
            activeOpacity={0.8}
            onPress={() => {
              setEditable((prev) => !prev);
            }}
          >
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.editButton, styles.logoutbutton]}
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={[styles.editButtonText, { color: "red" }]}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={async () => {
              setResumeUploadStatus("");
              const result = await uploadPDF();
              if (result.url) {
                setResume(result.url);
                setResumeUploadStatus("Resume uploaded successfully");
              } else {
                setResumeUploadStatus(
                  result.error || "Resume upload failed. Try again.",
                );
              }
            }}
          >
            <Text style={styles.resumeUploadText}>
              Upload Resume in PDF Format
            </Text>
          </TouchableOpacity>
          {resumeUploadStatus ? (
            <Text
              style={[
                styles.resumeStatusText,
                resumeUploadStatus.includes("successfully")
                  ? styles.resumeStatusSuccess
                  : styles.resumeStatusError,
              ]}
            >
              {resumeUploadStatus}
            </Text>
          ) : null}
          {resume ? (
            <TouchableOpacity onPress={openResumeLink}>
              <Text numberOfLines={1} style={styles.resumeLinkText}>
                View uploaded resume
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    padding: 18,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#E7F2FE",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 10,
  },
  avatarText: {
    color: "#1C7ED6",
    fontSize: 24,
    fontWeight: "700",
  },
  name: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
    color: "#102133",
  },
  role: {
    textAlign: "center",
    color: "#5A6B7D",
    marginTop: 4,
    marginBottom: 18,
  },
  infoRow: {
    borderWidth: 1,
    borderColor: "#E7ECF2",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  infoLabel: {
    color: "#5A6B7D",
    fontSize: 12,
    marginBottom: 3,
  },
  infoValue: {
    color: "#102133",
    fontSize: 14,
    fontWeight: "600",
  },
  editButton: {
    flex: 1,
    margin: 6,
    backgroundColor: "#1C7ED6",
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: "center",
  },
  editButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
  logoutbutton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "red",
  },
  resumeUploadText: {
    marginTop: 10,
    color: "#1C7ED6",
    fontWeight: "600",
    textAlign: "center",
  },
  resumeLinkText: {
    marginTop: 8,
    color: "#0D5C2E",
    textDecorationLine: "underline",
    textAlign: "center",
    fontWeight: "700",
  },
  resumeStatusText: {
    marginTop: 8,
    textAlign: "center",
    fontWeight: "600",
  },
  resumeStatusSuccess: {
    color: "#167A3E",
  },
  resumeStatusError: {
    color: "#C92A2A",
  },
});
