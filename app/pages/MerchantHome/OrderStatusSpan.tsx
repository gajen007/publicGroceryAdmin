import { StyleSheet, Text, View } from "react-native";

interface OrderStatusSpanProps {
  orderStatus: string;
  textProp: string;
}
export default function OrderStatusSpan({
  orderStatus,
  textProp,
}: OrderStatusSpanProps) {
  const styles = StyleSheet.create({
    viewStyle: {
      padding: 5,
      backgroundColor:
        orderStatus === "Picked"
          ? "#000000"
          : orderStatus === "Denied"
            ? "#F54927"
            : "gray",
    },
    textStyle: {
      color:
        orderStatus === "Picked"
          ? "#ffffff"
          : orderStatus === "Denied"
            ? "#ffffff"
            : "black",
      fontSize: 15,
      alignContent: "center",
    },
  });

  return (
    <View style={styles.viewStyle}>
      <Text style={styles.textStyle}>{textProp}</Text>
    </View>
  );
}
