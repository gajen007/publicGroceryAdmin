import { ImageBaseURL } from "@/globals";
import { Image, StyleSheet, Text, View } from "react-native";

interface ProductRowInOrderProps {
  productID: number;
  imageURL: string;
  productName: string;
  unitPrice: string;
  quantity: string;
}
const styles = StyleSheet.create({
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
    height: 50,
    borderRadius: 5,
    borderColor: "#000000",
    borderWidth: 1,
    margin: 5,
  },
  productRow: {
    display: "flex",
    flexDirection: "row",
  },
  productRowContainer: {
    display: "flex",
    flexDirection: "row",
    marginRight: 5,
    paddingTop: 20,
  },
  productRowText: {
    paddingLeft: 5,
    fontSize: 15,
  },
});

export default function ProductRowInOrder({
  imageURL,
  productName,
  unitPrice,
  quantity,
}: ProductRowInOrderProps) {
  return (
    <View style={styles.productRow}>
      <Image
        source={{ uri: `${ImageBaseURL}${imageURL}` }}
        style={styles.img}
      />
      <View style={styles.productRowContainer}>
        <Text style={styles.productRowText}>{productName}</Text>
        <Text style={styles.productRowText}>${unitPrice}</Text>
        <Text style={styles.productRowText}>x</Text>
        <Text style={styles.productRowText}>{quantity}</Text>
      </View>
    </View>
  );
}
