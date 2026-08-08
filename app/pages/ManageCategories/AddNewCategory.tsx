import { ApiEndPoint } from "@/globals";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Image,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
  },
  container: {
    marginTop: 32,
    marginLeft: 5,
    marginRight: 10,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
  },
  column: {
    display: "flex",
    flexDirection: "column",
    marginTop: 10,
  },
  inputStyle: {
    flex: 1,
    height: 50,
    fontSize: 15,
    padding: 1,
    margin: 1,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 5,
    color: "#000000",
    marginRight: 2,
  },
  addButton: {
    borderColor: "#000000",
    borderWidth: 1,
    backgroundColor: "#000000",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  addButtonText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
  selectImageButton: {
    borderColor: "#000000",
    borderWidth: 1,
    backgroundColor: "#000000",
    padding: 5,
    borderRadius: 5,
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  selectImageButtonText: {
    color: "#ffffff",
    fontSize: 15,
  },
  image: { width: 200, height: 200 },
});

export default function AddNewCategory() {
  const [categoryName, setCategoryName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const router = useRouter();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedAsset = result.assets[0];
      setImage(selectedAsset);
    }
  };

  const addCategory = async () => {
    if (!image) return;
    const formData = new FormData();

    /*
Android and iOS handle local paths differently.
Android: Usually requires the file:// prefix to remain.
iOS: Sometimes requires the file:// prefix to be stripped or handled specifically.
Web: Uses a blob: or data: URI which works differently.
*/

    if (Platform.OS === "web") {
      const response = await fetch(image.uri);
      const data = await response.blob();
      formData.append("fileToUpload", data, categoryName + ".jpeg");
    } else if (Platform.OS === "android") {
      const fileToUpload = {
        uri: image.uri,
        type: image.mimeType || "image/jpeg", // PHP needs this to populate $_FILES
        name: image.fileName || "filename.jpg",
      } as any;
      formData.append("fileToUpload", fileToUpload);
    }

    formData.append("categoryName", categoryName);
    formData.append("description", description);

    try {
      const response = await fetch(
        ApiEndPoint + "addNewProductCategory",
        {
          method: "POST",
          body: formData,
          /*
      In standard fetch: You usually omit the header or set it as shown above.
      In Axios: Do not set the Content-Type header manually.
      Axios (and the browser/native bridge) needs to automatically generate the "boundary" string (e.g., boundary=----WebKitFormBoundary...) to separate the file data from other fields.
      */
        },
      );
      if (response.ok) {
        const r = await response.json();
        if (r.result) {
          Alert.alert("Success", r.message);
          router.push("/pages/ManageCategories");
        } else {
          Alert.alert("Failed", "Check the console!");
          console.log(r.message);
        }
      } else {
        Alert.alert("Error", "Image upload failed.");
        console.log("Error", "Image upload failed.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred during upload.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <View style={styles.row}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Category Name"
            value={categoryName}
            onChangeText={(text) => setCategoryName(text)}
            placeholderTextColor="#7A7877"
            inputMode="text"
          />
        </View>

        <View style={styles.row}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Description"
            value={description}
            onChangeText={(text) => setDescription(text)}
            placeholderTextColor="#7A7877"
            inputMode="text"
          />
        </View>

        <View style={styles.row}>
          <Pressable
            onPress={() => pickImage()}
            style={styles.selectImageButton}
          >
            <Text style={styles.selectImageButtonText}>Select Image</Text>
          </Pressable>
          {image && <Image source={{ uri: image.uri }} style={styles.image} />}
        </View>

        <View style={styles.column}>
          <Pressable onPress={() => addCategory()} style={styles.addButton}>
            <Text style={styles.addButtonText}>Add Category</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
