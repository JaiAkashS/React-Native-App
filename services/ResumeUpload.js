import AsyncStorage from "@react-native-async-storage/async-storage";
import * as DocumentPicker from "expo-document-picker";
import { Platform } from "react-native";

const CLOUDINARY_CLOUD_NAME = "dtocppudu";
const RESUME_UPLOAD_PRESET = "h97jctqh";

export const uploadPDF = async () => {
  const result = await DocumentPicker.getDocumentAsync({
    type: "application/pdf",
    copyToCacheDirectory: true,
  });

  if (result.canceled) {
    return { url: null, error: "Resume upload cancelled" };
  }

  const file = result.assets[0];

  const formData = new FormData();

  if (Platform.OS === "web") {
    if (file.file) {
      formData.append("file", file.file, file.name || "file.pdf");
    } else {
      const fileResponse = await fetch(file.uri);
      const blob = await fileResponse.blob();
      formData.append("file", blob, file.name || "file.pdf");
    }
  } else {
    formData.append("file", {
      uri: file.uri,
      type: "application/pdf",
      name: file.name || "file.pdf",
    });
  }

  formData.append("upload_preset", RESUME_UPLOAD_PRESET);

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/raw/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await res.json();
    if (!res.ok || data.error) {
      throw new Error(data?.error?.message || "Resume upload failed");
    }

    const resumeUrl = data.secure_url || data.url || null;

    if (!resumeUrl) {
      throw new Error("Resume URL missing in upload response");
    }

    const isRestrictedUrl =
      resumeUrl.includes("/authenticated/") || resumeUrl.includes("/private/");
    const isRestrictedResponse =
      data.access_mode === "authenticated" ||
      data.type === "authenticated" ||
      data.type === "private";

    if (isRestrictedUrl || isRestrictedResponse) {
      throw new Error(
        "Upload succeeded but file delivery is restricted (401). Set your Cloudinary upload preset to public upload delivery.",
      );
    }

    await AsyncStorage.setItem("resume", resumeUrl);
    return { url: resumeUrl, error: null };
  } catch (err) {
    console.log(err);

    const errorMessage = err?.message || "Resume upload failed. Try again.";
    if (
      errorMessage.toLowerCase().includes("image file format pdf not allowed")
    ) {
      return {
        url: null,
        error:
          "Your Cloudinary upload preset allows images only. Create/use an unsigned preset for RAW/PDF files and update RESUME_UPLOAD_PRESET in ResumeUpload.js.",
      };
    }

    return {
      url: null,
      error: errorMessage,
    };
  }
};
