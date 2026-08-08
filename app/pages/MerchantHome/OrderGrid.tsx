import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faClock,
  faDollar,
  faPersonRunning,
  faUser,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  column: {
    display: "flex",
    flexDirection: "column",
  },
  rowStyle: {
    display: "flex",
    flexDirection: "row",
    padding: 1,
  },
  rowReverse: {
    flexDirection: "row-reverse",
  },
  textStyle: { color: "#000000", fontSize: 15, padding: 5, fontWeight: "bold" },
});

interface OrderGridProps {
  status: string;
  orderID: string;
  itemsCount: string;
  dateOrdered: string;
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
  dateOrdered,
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
/*
  const bgColor = (orderStatus: string) => {
    let c = "#ffffff";
    switch (orderStatus) {
      case "New":
        c = "#F54927";
        break;
      case "Accepted":
        c = "#3527F5";
        break;
      case "Assigned":
        c = "#27f55a";
        break;
      case "Await":
        c = "#A52A2A";
        break;
      case "Dispatched":
        c = "rgb(31, 133, 21)";
        break;
      case "Ready":
        c = "#000000";
        break;
      case "Picked":
        c = "#ffffff";
        break;
      case "Delivered":
        c = "#E427F5";
        break;
      case "Returned":
        c = "#9299B0";
        break;
      case "Denied":
        c = "#87878C";
        break;
    }
    return c;
  };
  */

  return (
    <Pressable onPress={() => toSingleOrder(orderID)}>
      <View
        style={{
          borderWidth: 1,
          borderColor: '#000000',
          borderRadius: 5,
          margin: 10,
        }}
      >
        <View style={styles.rowStyle}>
          <Text style={styles.textStyle}>
            <FontAwesomeIcon
              icon={faUser as IconProp}
              size={15}
              color="#000000"
            />
          </Text>
          <Text style={styles.textStyle}>{customerName}</Text>
        </View>

        <View style={styles.rowStyle}>
          <Text style={styles.textStyle}>
            <FontAwesomeIcon
              icon={faDollar as IconProp}
              size={15}
              color="#000000"
            />
          </Text>
          <Text style={styles.textStyle}>{totalValue} ({itemsCount}) Items</Text>
          <Text style={styles.textStyle}>
            <FontAwesomeIcon
              icon={faClock as IconProp}
              size={15}
              color="#000000"
            /></Text>
            <Text style={styles.textStyle}>Ordered at {arrivedAt}</Text>
        </View>

        <View style={styles.rowStyle}>
          <Text style={styles.textStyle}>
            <FontAwesomeIcon
              icon={serveType==="pickUp"?faPersonRunning as IconProp:faTruck as IconProp }
              size={15}
              color="#000000"
            />
          </Text>
          <Text style={styles.textStyle}>{serveType}</Text>
          <Text style={styles.textStyle}>{serveTime}</Text>
          <Text style={styles.textStyle}>of {dateOrdered}</Text>
          <View style={{marginLeft:'15%',flexDirection:'row-reverse'}}>
            <Text style={{color:'rgb(31, 133, 21)',fontWeight:'bold'}}>{status}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
