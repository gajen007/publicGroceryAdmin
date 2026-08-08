import MyPicker from "@/app/components/MyPicker";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
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
import { ApiEndPoint } from "../../globals/ApiEndPoint";
import { ImageBaseURL } from "../../globals/ImageBaseURL";

const styles = StyleSheet.create({
  container: {
    marginTop: 90,
    marginLeft: 5,
    marginRight: 5,
  },
  pickerView: {
    height: 50,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 30,
  },
  column: {
    flexDirection: "column",
  },
  columnReverse: {
    flexDirection: "column-reverse",
  },
  row: {
    flexDirection: "row",
  },
  rowReverse: {
    flexDirection: "row-reverse",
  },
  img: {
    width: 50,
    height: 50, // Remote images REQUIRE dimensions in RN
  },
  updateButton: {
    borderColor: "#466E2C",
    borderWidth: 1,
    backgroundColor: "#466E2C",
    padding: 5,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  cancelButton: {
    borderColor: "#F54927",
    borderWidth: 1,
    backgroundColor: "#F54927",
    padding: 5,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  editButton: {
    borderColor: "#466E2C",
    borderWidth: 1,
    backgroundColor: "#466E2C",
    padding: 5,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 15,
  },
  inputContainer: {
    marginLeft: 10,
    marginVertical: 5,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
  },
  textInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  inputStyle: {
    height: 30,
    fontSize: 15,
    padding: 1,
    marginLeft: 10,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#466E2C",
    borderRadius: 5,
    color: "#466E2C",
  },
  selectImageButton: {
    borderColor: "#466E2C",
    borderWidth: 1,
    backgroundColor: "#466E2C",
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

interface Product {
  productID: string;
  productName: string;
  unitPrice: string;
  imageURL: string;
  categoryName: string;
  description: string;
  categoryID: string;
  measuredBy: string;
}

export default function SingleProduct() {
  const { productID } = useLocalSearchParams<{ productID: string }>();
  const [productName, setProductName] = useState<string>("");
  const [selectedCategoryObject, setSelectedCategoryObject] = useState<
    SelectOption | undefined
  >();
  const [selectedMeasuringUnitObject, setSelectedMeasuringUnitObject] =
    useState<SelectOption | undefined>();
  const [categories4picker, setCategories4picker] = useState<SelectOption[]>(
    [],
  );
  const [categoryID, setcategoryID] = useState<string>("");
  const [unitPrice, setUnitPrice] = useState<string>("");
  const [imageURL, setImageURL] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [editMode, setEditMode] = useState<boolean>(false);
  const router = useRouter();

  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);

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

  const measuringUnits = [
    { id: "0", optionName: "0" },
    { id: "1", optionName: "Kilogram" },
    { id: "2", optionName: "Litre" },
    { id: "3", optionName: "Number" },
  ];

  const getSingleProductOnly = async () => {
    try {
      await axios
        .get<Product>(
          ApiEndPoint + "getSingleProductOnly?productID=" + productID,
        )
        .then((res) => {
          const arrived = res.data;
          setProductName(arrived.productName);
          setcategoryID(arrived.categoryID);
          setSelectedMeasuringUnitObject(
            measuringUnits.filter(
              (item) => item.optionName === arrived.measuredBy,
            )[0],
          );
          setUnitPrice(arrived.unitPrice);
          setImageURL(arrived.imageURL);
          setDescription(arrived.description);
        });
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(e.message);
      } else {
        console.error("An unknown error occurred:", e);
      }
    }
  };

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

  const updateProductData = async () => {
    if (!image) return;
    const fd = new FormData();

    /*
Android and iOS handle local paths differently.
Android: Usually requires the file:// prefix to remain.
iOS: Sometimes requires the file:// prefix to be stripped or handled specifically.
Web: Uses a blob: or data: URI which works differently.
*/
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
    fd.append("categoryID", selectedCategoryObject?.id as string);
    fd.append("productName", productName);
    fd.append("description", description);
    fd.append("unitPrice", unitPrice);
    fd.append("measuredBy", selectedMeasuringUnitObject?.optionName as string);
    fd.append("productID", productID);

    try {
      const response = await fetch(ApiEndPoint + "editProduct", {
        method: "POST",
        body: fd,
        /*
      In standard fetch: You usually omit the header or set it as shown above.
      In Axios: Do not set the Content-Type header manually.
      Axios (and the browser/native bridge) needs to automatically generate the "boundary" string (e.g., boundary=----WebKitFormBoundary...) to separate the file data from other fields.
      */
      });
      if (response.ok) {
        const r = await response.json();
        if (r.result) {
          Alert.alert("Success", r.message);
          router.push("/pages/ManageProducts");
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
    getAllCategories();
    getSingleProductOnly();
  }, []);

  useEffect(() => {
    if (categoryID !== "" && categories4picker.length !== 0) {
      setSelectedCategoryObject(
        categories4picker.filter((item) => item.id === categoryID)[0],
      );
    }
  }, [categories4picker, categoryID]);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Product Name</Text>
        <TextInput
          editable={editMode}
          inputMode="text"
          value={productName}
          onChangeText={(pN) => setProductName(pN)}
          style={styles.inputStyle}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Product Description</Text>
        <TextInput
          editable={editMode}
          inputMode="text"
          value={description}
          onChangeText={(desc) => setDescription(desc)}
          style={styles.inputStyle}
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

      <View style={styles.pickerView}>
        <MyPicker
          labelName="Measured by"
          options={measuringUnits}
          selectedItem={selectedMeasuringUnitObject}
          onSelect={(item) => setSelectedMeasuringUnitObject(item)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Product Value $</Text>
        <TextInput
          editable={editMode}
          inputMode="text"
          value={unitPrice}
          onChangeText={(p) => setUnitPrice(p)}
          style={styles.inputStyle}
        />
      </View>

      <View style={styles.column}>
        <Image
          source={{ uri: `${ImageBaseURL}${imageURL}` }}
          style={styles.img}
        />
        {editMode ? (
          <View style={styles.row}>
            <Pressable
              onPress={() => pickImage()}
              style={styles.selectImageButton}
            >
              <Text style={styles.selectImageButtonText}>Select Image</Text>
            </Pressable>
            {image && (
              <Image source={{ uri: image.uri }} style={styles.image} />
            )}
          </View>
        ) : null}
      </View>

      {editMode ? (
        <View style={styles.column}>
          <Pressable
            onPress={() => updateProductData()}
            style={styles.updateButton}
          >
            <Text style={styles.buttonText}>Update Data</Text>
          </Pressable>
          <Pressable
            onPress={() => setEditMode(false)}
            style={styles.cancelButton}
          >
            <Text style={styles.buttonText}>Cancel Editing</Text>
          </Pressable>
        </View>
      ) : (
        <Pressable onPress={() => setEditMode(true)} style={styles.editButton}>
          <Text style={styles.buttonText}>Edit Product</Text>
        </Pressable>
      )}
    </View>
  );
}
