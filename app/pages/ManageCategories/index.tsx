import axios from "axios";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { ApiEndPoint } from "../../globals/ApiEndPoint";
import CategoryGrid from "./CategoryGrid";
import { RelativePathString, router } from "expo-router";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
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
  addButtonContainer: {
    marginTop: 100,
    marginRight: 10,
    flexDirection: "row-reverse",
  },
  gridContainer: {
    margin: "2.5%",
    flexDirection: "row",
  },
  menuItemStyle: {
    marginTop: 2,
    flexDirection: "row",
    borderWidth: 1,
    backgroundColor: "#466E2C",
    borderRadius: 5,
    padding: 17,
  },
  menuTextStyle: { marginLeft: 5, color: "#466E2C", fontSize: 20 },
  pressedItemStyle: {
    marginTop: 2,
    flexDirection: "row",
    borderWidth: 1,
    backgroundColor: "orange",
    borderRadius: 5,
    padding: 17,
  },
  pressedItemTextStyle: { marginLeft: 5, color: "#f3e308ff", fontSize: 20 },
  loginButton: {
    borderColor: "#466E2C",
    borderWidth: 1,
    backgroundColor: "#466E2C",
    padding: 5,
    borderRadius: 5,
    alignItems: "center",
    marginLeft: 10,
    marginBottom: 10,
  },
  addButton: {
    borderColor: "#466E2C",
    borderWidth: 1,
    backgroundColor: "#466E2C",
    padding: 5,
    borderRadius: 5,
    alignItems: "center",
    marginLeft: 10,
    marginBottom: 10,
  },
  addButtonText: {
    color: "#f3e308ff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

interface Category {
  categoryID: string;
  categoryName: string;
  imageURL: string;
  description: string;
}

export default function Page() {
  const [categories, setCategories] = useState<Category[]>([]);

  const getAllCategories = async () => {
    try {
      await axios.get(ApiEndPoint + "getAllCategories").then((res) => {
        setCategories(res.data);
      });
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(e.message);
      } else {
        console.error("An unknown error occurred:", e);
      }
    }
  };

  useEffect(() => {
    //Authenticate(); //runs twice; WHY ?
    getAllCategories();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.addButtonContainer}>
        <Pressable
          style={styles.addButton}
          onPress={() => router.push("pages/ManageCategories/AddNewCategory" as RelativePathString) }
        >
          <Text style={styles.addButtonText}>Add New Category</Text>
        </Pressable>
      </View>
      <ScrollView style={styles.column}>
        <View style={styles.container}>
          {Array.isArray(categories) &&
            categories.map((category: Category) => {
              return (
                <CategoryGrid
                  key={category.categoryID}
                  categoryID={category.categoryID}
                  categoryName={category.categoryName}
                  imageURL={category.imageURL}
                  description={category.description}
                />
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
}
