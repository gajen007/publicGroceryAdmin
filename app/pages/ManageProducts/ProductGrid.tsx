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

interface ProductGridProps {
  productID: string;
  productName: string;
  categoryName: string;
  imageURL: string;
  unitPrice: string;
  measuredBy: string;
  description: string;
}

export default function ProductGrid({
  productID,
  productName,
  categoryName,
  imageURL,
  unitPrice,
  measuredBy,
}: ProductGridProps) {
  const toSingleProduct = (pId: string) => {
    router.push({
      pathname: "/pages/ManageProducts/SingleProduct",
      params: { productID: pId },
    });
  };
  return (
    <Pressable
      onPress={() => toSingleProduct(productID)}
      style={styles.container}
    >
      <View style={styles.column}>
        <View style={styles.row}>
          <Text>{productName}</Text>
        </View>
        <View style={styles.row}>
          <Text>Category:</Text>
          <Text>{categoryName}</Text>
        </View>
        <View style={styles.row}>
          <Image
            source={{ uri: `${ImageBaseURL}${imageURL}` }}
            style={styles.img}
          />
        </View>
        <View style={styles.row}>
          <Text>$:</Text>
          <Text>{unitPrice}</Text>
        </View>
        <View style={styles.row}>
          <Text>Measuredby:</Text>
          <Text>{measuredBy}</Text>
        </View>
      </View>
    </Pressable>
  );
}
