import { ApiEndPoint } from "@/globals";
import { useEffect, useState } from "react";
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
//import { Authenticate } from '@/globals/Authenticate';
import MyPicker from "@/components/MyPicker";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";

const styles = StyleSheet.create({
  container: {
    marginTop: 90,
    display: "flex",
    flexDirection: "column",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
  },
  textInputContainer: {
    zIndex: 1,
  },
  inputStyle: {
    height: 50,
    fontSize: 15,
    padding: 1,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 5,
    color: "#000000",
  },
  pickerView: {
    height: 50,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
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

interface SelectOption {
  id: string | number;
  optionName: string;
}

export default function AddNewProduct() {
  const [categories4picker, setCategories4picker] = useState<SelectOption[]>(
    [],
  );
  const [selectedCategoryObject, setSelectedCategoryObject] = useState<
    SelectOption | undefined
  >();
  const [productName, setProductName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedMeasuringUnitObject, setSelectedMeasuringUnitObject] =
    useState<SelectOption | undefined>();
  const [unitPrice, setUnitPrice] = useState<string>("");
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const router = useRouter();

  const measuringUnits = [
    { id: "1", optionName: "Kilogram" },
    { id: "2", optionName: "Litre" },
    { id: "3", optionName: "Number" },
  ];

  const assignCategoriesToPicker = (arr: []) => {
    let result: { id: string; optionName: string }[] = [];
    arr.forEach((ele: { categoryID: string; categoryName: string }) => {
      result.push({ id: ele.categoryID, optionName: ele.categoryName });
    });
    return result;
  };

  const getAllCategories = async () => {
    try {
      await axios.get(ApiEndPoint + "getAllCategories").then((res) => {
        setCategories4picker(assignCategoriesToPicker(res.data));
      });
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(e.message);
      } else {
        console.error("An unknown error occurred:", e);
      }
    }
  };

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

  const submitProduct = async () => {
    const fd = new FormData();
    fd.append("productName", productName);
    fd.append("description", description);
    fd.append("categoryID", selectedCategoryObject?.id as string);
    fd.append("unitPrice", unitPrice);
    fd.append("measuredBy", selectedMeasuringUnitObject?.optionName as string);

    if (!image) return;

    if (Platform.OS === "web") {
      const response = await fetch(image.uri);
      const data = await response.blob();
      fd.append("fileToUpload", data, productName + ".jpeg");
    } else if (Platform.OS === "android") {
      const fileToUpload = {
        uri: image.uri,
        type: image.mimeType || "image/jpeg", // PHP needs this to populate $_FILES
        name: image.fileName || "filename.jpg",
      } as any;
      fd.append("fileToUpload", fileToUpload);
    }

    try {
      const response = await fetch(ApiEndPoint + "addProduct", {
        method: "POST",
        body: fd,
      });
      if (response.ok) {
        const r = await response.json();
        if (r.result) {
          Alert.alert("Success", "Product added successfully!");
          router.push("/");
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

  useEffect(() => {
    //Authenticate(); //runs twice; WHY ?
    getAllCategories();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.inputStyle}
          onChangeText={(text) => setProductName(text)}
          value={productName}
          placeholder="Product's Name"
          placeholderTextColor="#7A7877"
          inputMode="text"
        />
      </View>

      <View style={styles.pickerView}>
        <MyPicker
          labelName="Choose Category"
          options={categories4picker}
          selectedItem={selectedCategoryObject}
          onSelect={(item) => setSelectedCategoryObject(item)}
        />
      </View>

      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.inputStyle}
          placeholder="Unit Price"
          value={unitPrice}
          onChangeText={(text) => setUnitPrice(text)}
          inputMode="text"
          placeholderTextColor="#7A7877"
        />
      </View>

      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.inputStyle}
          placeholder="Description"
          value={description}
          onChangeText={(text) => setDescription(text)}
          inputMode="text"
          placeholderTextColor="#7A7877"
        />
      </View>

      <View style={styles.pickerView}>
        <MyPicker
          labelName="Measured by"
          options={measuringUnits}
          selectedItem={selectedMeasuringUnitObject}
          onSelect={(item) => setSelectedMeasuringUnitObject(item)}
        />
      </View>

      <View style={styles.row}>
        <Pressable onPress={() => pickImage()} style={styles.selectImageButton}>
          <Text style={styles.selectImageButtonText}>Select Image</Text>
        </Pressable>
        {image && <Image source={{ uri: image.uri }} style={styles.image} />}
      </View>

      <Pressable onPress={() => submitProduct()} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Product</Text>
      </Pressable>
    </View>
  );
}
