import { ImageBaseURL } from "@/app/globals/ImageBaseURL";
import { rem } from "@/app/globals/Styles";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    borderColor: "#466E2C",
    borderWidth: rem(0.05),
    margin: "2.5%",
    padding: "0.5%",
    borderRadius: 5,
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
});

interface CategoryGridProps {
  categoryID: string;
  categoryName: string;
  imageURL: string;
  description: string;
}

export default function CategoryGrid({
  categoryID,
  categoryName,
  imageURL,
  description,
}: CategoryGridProps) {
  const toSingleCategory = (cID: string) => {
    router.push({
      pathname: "/pages/ManageCategories/SingleCategory",
      params: { categoryID: cID },
    });
  };

  return (
    <Pressable
      onPress={() => toSingleCategory(categoryID)}
      style={styles.container}
    >
      <View style={styles.column}>
        <View style={styles.row}>
          <Text>{categoryName}</Text>
        </View>
        <Image
          source={{ uri: `${ImageBaseURL}${imageURL}` }}
          style={styles.img}
        />
        <View style={styles.row}>
          <Text>{description}</Text>
        </View>
      </View>
    </Pressable>
  );
}
