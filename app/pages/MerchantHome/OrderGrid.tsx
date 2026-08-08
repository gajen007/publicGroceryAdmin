import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faClock,
  faDollar,
  faPersonRunning,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  column: {
    display: "flex",
    flexDirection: "column",
  },
  columnReverse: {
    display: "flex",
    flexDirection: "column-reverse",
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
  rowReverse: {
    display: "flex",
    flexDirection: "row-reverse",
  },
  rowStyle: {
    display: "flex",
    flexDirection: "row",
    padding: 1,
  },
  textStyle: { color: "#ffffff", fontSize: 20, padding: 5, fontWeight: "bold" },
});

interface OrderGridProps {
  status: string;
  orderID: string;
  itemsCount: string;
  arrivedAt: string;
  customerName: string;
  serveType: string;
  serveTime: string;
  totalValue: string;
}

export default function OrderGrid({
  status,
  orderID,
  itemsCount,
  arrivedAt,
  customerName,
  serveType,
  serveTime,
  totalValue,
}: OrderGridProps) {
  const toSingleOrder = (oID: string) => {
    router.push({
      pathname: "/pages/MerchantHome/SingleOrder",
      params: { orderID: oID },
    });
  };

  const bgColor = (orderStatus: string) => {
    let c = "#ffffff";
    switch (orderStatus) {
      case "New":
        c = "#F54927";
        break;
      case "Accepted":
        c = "#3527F5";
        break;
      case "Ready":
        c = "#466E2C";
        break;
      case "Picked":
        c = "#f3e308ff";
        break;
      case "Denied":
        c = "87878C";
        break;
    }
    return c;
  };

  return (
    <Pressable onPress={() => toSingleOrder(orderID)}>
      <View
        style={{
          backgroundColor: bgColor(status),
          borderWidth: 1,
          borderColor: bgColor(status),
          borderRadius: 5,
          margin: 10,
        }}
      >
        <View style={styles.rowStyle}>
          <Text style={styles.textStyle}>{itemsCount}</Text>
          <Text style={styles.textStyle}>Item(s)</Text>
        </View>
        <View style={styles.rowStyle}>
          <Text style={styles.textStyle}>
            <FontAwesomeIcon
              icon={faClock as IconProp}
              size={12}
              color="#ffffff"
            />
          </Text>
          <Text style={styles.textStyle}>{arrivedAt}</Text>
        </View>
        <View style={styles.rowStyle}>
          <Text style={styles.textStyle}>
            <FontAwesomeIcon
              icon={faUser as IconProp}
              size={12}
              color="#ffffff"
            />
          </Text>
          <Text style={styles.textStyle}>{customerName}</Text>
        </View>
        <View style={styles.rowStyle}>
          <Text style={styles.textStyle}>
            <FontAwesomeIcon
              icon={faPersonRunning as IconProp}
              size={12}
              color="#ffffff"
            />
          </Text>
          <Text style={styles.textStyle}>{serveType}</Text>
          <Text style={styles.textStyle}>{serveTime}</Text>
        </View>
        <View style={styles.rowStyle}>
          <Text style={styles.textStyle}>
            <FontAwesomeIcon
              icon={faDollar as IconProp}
              size={12}
              color="#ffffff"
            />
          </Text>
          <Text style={styles.textStyle}>{totalValue}</Text>
        </View>
      </View>
    </Pressable>
  );
}
