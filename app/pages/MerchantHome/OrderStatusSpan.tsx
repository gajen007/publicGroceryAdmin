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
          ? "#466E2C"
          : orderStatus === "Denied"
            ? "#F54927"
            : "gray",
    },
    textStyle: {
      color:
        orderStatus === "Picked"
          ? "#f3e308ff"
          : orderStatus === "Denied"
            ? "#f3e308ff"
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
