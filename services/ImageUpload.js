import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const pickImage = async () => {
  try {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        alert("Permission to access media library is required!");
        return null;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (result.canceled) return null;

    const uri = result.assets[0].uri;
    const resized = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 300 } }],
      { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG },
    );

    return await uploadToCloudinary(resized.uri);
  } catch (error) {
    console.error("Error picking image:", error);
    alert("Error picking image");
    return null;
  }
};

const uploadToCloudinary = async (imageUri) => {
  const data = new FormData();

  if (Platform.OS === "web") {
    const fileResponse = await fetch(imageUri);
    const blob = await fileResponse.blob();
    data.append("file", blob, "profile.jpg");
  } else {
    data.append("file", {
      uri: imageUri,
      type: "image/jpeg",
      name: "profile.jpg",
    });
  }

  data.append("upload_preset", "h97jctqh");

  try {
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dtocppudu/image/upload",
      {
        method: "POST",
        body: data,
      },
    );

    const result = await res.json();

    if (!res.ok || result.error) {
      throw new Error(result?.error?.message || "Cloudinary upload failed");
    }

    console.log(result.secure_url);
    await AsyncStorage.setItem("userAvatar", result.secure_url);
    return result.secure_url;
  } catch (err) {
    console.error("Upload error:", err);
    alert("Failed to upload image");
  }
};

module.exports = { pickImage, uploadToCloudinary };
