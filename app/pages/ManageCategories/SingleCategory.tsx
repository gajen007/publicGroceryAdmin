import ScrollableCard from "@/app/components/ScrollableCard";
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
import ProductGrid from "../ManageProducts/ProductGrid";

const styles = StyleSheet.create({
  container: {
    marginTop: 90,
    marginLeft: 5,
    marginRight: 5,
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
    marginVertical: 10,
    marginLeft: 10,
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
  image: {
    width: 200,
    height: 200,
  },
  productsCountContainer: {
    marginVertical: 10,
    marginLeft: 10,
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
  },
  productsCountText: {
    fontSize: 15,
    fontWeight: "bold",
  },
});

interface SingleCategoryRes {
  categoryName: string;
  imageURL: string;
  description: string;
  productsCount: string;
}
interface Product {
  productID: string;
  productName: string;
  unitPrice: string;
  imageURL: string;
  categoryName: string;
  description: string;
  measuredBy: string;
}

export default function SingleCategory() {
  const { categoryID } = useLocalSearchParams<{ categoryID: string }>();
  const [categoryName, setCategoryName] = useState<string>("");
  const [imageURL, setImageURL] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [productsCount, setProductsCount] = useState<string>("");
  const [editMode, setEditMode] = useState(false);
  const [productsOfThisCategory, setProductsOfThisCategory] = useState<
    Product[]
  >([]);
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

  const getSingleCategory = async () => {
    try {
      await axios
        .get<SingleCategoryRes>(
          ApiEndPoint + "getSingleCategory?categoryID=" + categoryID,
        )
        .then((res) => {
          const arrived = res.data;
          setCategoryName(arrived.categoryName);
          setImageURL(arrived.imageURL);
          setDescription(arrived.description);
          setProductsCount(arrived.productsCount);
        });
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(e.message);
      } else {
        console.error("An unknown error occurred:", e);
      }
    }
  };

  const getProductsOfCategory = async () => {
    try {
      await axios
        .get<
          Product[]
        >(ApiEndPoint + "getProductsOfCategory?categoryID=" + categoryID)
        .then((res) => {
          setProductsOfThisCategory(res.data);
        });
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(e.message);
      } else {
        console.error("An unknown error occurred:", e);
      }
    }
  };

  const updateCategoryData = async () => {
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
      fd.append("fileToUpload", data, categoryName + ".jpeg");
    } else if (Platform.OS === "android") {
      const fileToUpload = {
        uri: image.uri,
        type: image.mimeType || "image/jpeg", // PHP needs this to populate $_FILES
        name: image.fileName || "filename.jpg",
      } as any;
      fd.append("fileToUpload", fileToUpload);
    }

    fd.append("categoryID", categoryID);
    fd.append("categoryName", categoryName);
    fd.append("description", description);

    try {
      const response = await fetch(ApiEndPoint + "editCategory", {
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

  const dummy = () => {};

  useEffect(() => {
    getSingleCategory();
    getProductsOfCategory();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.productsCountContainer}>
        <Text style={styles.productsCountText}>{productsCount} Product(s)</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Category Name</Text>
        <TextInput
          editable={editMode}
          inputMode="text"
          value={categoryName}
          onChangeText={(cN) => setCategoryName(cN)}
          style={styles.inputStyle}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Description</Text>
        <TextInput
          editable={editMode}
          inputMode="text"
          value={description}
          onChangeText={(desc) => setDescription(desc)}
          style={styles.inputStyle}
        />
      </View>
      {editMode ? (
        <>
          <Image
            source={{ uri: `${ImageBaseURL}${imageURL}` }}
            style={styles.img}
          />

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

          <View style={styles.column}>
            <Pressable
              onPress={() => updateCategoryData()}
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
        </>
      ) : (
        <Pressable onPress={() => setEditMode(true)} style={styles.editButton}>
          <Text style={styles.buttonText}>Edit Category</Text>
        </Pressable>
      )}
      <ScrollableCard
        cardTitle="Products"
        themeColor="#466E2C"
        cardTitleColor="#f3e308ff"
        headerTextFontSize={20}
        marginTop={20}
        closeCard={() => dummy()}
      >
        {Array.isArray(productsOfThisCategory) &&
          productsOfThisCategory.map((product: Product) => {
            return (
              <ProductGrid
                key={product.productID}
                productID={product.productID}
                productName={product.productName}
                categoryName={product.categoryName}
                imageURL={product.imageURL}
                description={product.description}
                unitPrice={product.unitPrice}
                measuredBy={product.measuredBy}
              />
            );
          })}
      </ScrollableCard>
    </View>
  );
}
