import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import AsyncStorage from '@react-native-async-storage/async-storage';

const pickImage = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
  });

  if (!result.canceled) {
    const uri = result.assets[0].uri;

    const resized = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 300 } }],
      { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
    );

    uploadToCloudinary(resized.uri);
  }
};

const uploadToCloudinary = async (imageUri) => {
  const data = new FormData();

  data.append('file', {
    uri: imageUri,
    type: 'image/jpeg',
    name: 'profile.jpg',
  });

  data.append('upload_preset', 'YOUR_UPLOAD_PRESET');

  try {
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload',
      {
        method: 'POST',
        body: data,
      }
    );

    const result = await res.json();

    console.log(result.secure_url);
    await AsyncStorage.setItem('userAvatar',result.secure_url);
    // setImage(result.secure_url); // ✅ Save Cloudinary URL
    // return result.secure_url
  } catch (err) {
    console.log(err);
  }
};