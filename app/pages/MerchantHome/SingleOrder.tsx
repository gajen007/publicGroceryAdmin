import { ApiEndPoint } from "@/app/globals/ApiEndPoint";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faAt,
  faDollar,
  faEnvelope,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import OrderStatusSpan from "./OrderStatusSpan";
import ProductRowInOrder from "./ProductRowInOrder";

const styles = StyleSheet.create({
  container: {
    marginTop: 90,
    marginLeft: 5,
    marginRight: 5,
    padding: "0.5%",
  },
  column: {
    flexDirection: "column",
  },
  columnReverse: {
    flexDirection: "column-reverse",
  },
  customerDataRow: {
    display: "flex",
    flexDirection: "row",
    marginTop: 5,
    marginLeft: 5,
    marginBottom: 5,
  },
  customerDataTextStyle: {
    padding: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
  rowReverse: {
    flexDirection: "row-reverse",
  },
  acceptButton: {
    borderColor: "#466E2C",
    borderWidth: 1,
    backgroundColor: "#466E2C",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginLeft: 10,
    marginBottom: 10,
  },
  rejectButton: {
    borderColor: "#F54927",
    borderWidth: 1,
    backgroundColor: "#F54927",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginLeft: 10,
    marginBottom: 10,
  },
  readyButton: {
    borderColor: "#466E2C",
    borderWidth: 1,
    backgroundColor: "#466E2C",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginLeft: 10,
    marginBottom: 10,
  },
  pickButton: {
    borderColor: "#87878C",
    borderWidth: 1,
    backgroundColor: "#87878C",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginLeft: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    marginVertical: 10,
    marginRight: 10,
  },
});

interface Product {
  productID: string;
  productName: string;
  unitPrice: string;
  imageURL: string;
  categoryName: string;
  description: string;
  quantity: number;
}

interface Order {
  orderID: string;
  arrivedAt: string;
  customerName: string;
  customerPhone: string;
  itemsCount: string;
  serveTime: string;
  serveType: string;
  status: string;
  totalValue: string;
  customerAddress: string;
  customerEmail: string;
  listedProducts: [];
}

export default function SingleOrder() {
  const { orderID } = useLocalSearchParams<{ orderID: string }>();
  const [customerName, setCustomerName] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [customerAddress, setCustomerAddress] = useState<string>("");
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [totalValue, setTotalValue] = useState<string>("");
  const [listedProducts, setListedProducts] = useState<Product[]>([]);
  const [orderStatus, setOrderStatus] = useState<string>("");

  const getSingleOrder = async () => {
    try {
      await axios
        .get<Order>(ApiEndPoint + "getSingleOrder?orderID=" + orderID)
        .then((res) => {
          const arrived = res.data;
          setCustomerName(arrived.customerName);
          setCustomerPhone(arrived.customerPhone);
          setCustomerAddress(arrived.customerAddress);
          setCustomerEmail(arrived.customerEmail);
          setOrderStatus(arrived.status);
          setTotalValue(arrived.totalValue);
          setListedProducts(arrived.listedProducts);
        });
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(e.message);
      } else {
        console.error("An unknown error occurred:", e);
      }
    }
  };

  const responseOrder = async (choice: string) => {
    if (orderID) {
      const response = await fetch(ApiEndPoint+"responseOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        response: choice,
        orderID: orderID,
      }),
    });
    const data = await response.json();
    if (data.result) {
      setOrderStatus(choice);
      Alert.alert(data.message);
    }
    else{
      Alert.alert("Unable to Respond this Order!");
    }
    }
  };

  const renderButtons = (orderStatus: string) => {
    switch (orderStatus) {
      case "New":
        return (
          <View style={styles.buttonContainer}>
            <Pressable
              onPress={() => responseOrder("Accepted")}
              style={styles.acceptButton}
            >
              <Text style={styles.buttonText}>ACCEPT</Text>
            </Pressable>
            <Pressable
              onPress={() => responseOrder("Denied")}
              style={styles.rejectButton}
            >
              <Text style={styles.buttonText}>REJECT</Text>
            </Pressable>
          </View>
        );
      case "Accepted":
        return (
          <View style={styles.row}>
            <Pressable
              onPress={() => responseOrder("Ready")}
              style={styles.readyButton}
            >
              <Text style={styles.buttonText}>READY?</Text>
            </Pressable>
          </View>
        );
      case "Ready":
        return (
          <View style={styles.row}>
            <Pressable
              onPress={() => responseOrder("Picked")}
              style={styles.pickButton}
            >
              <Text style={styles.buttonText}>Picked?</Text>
            </Pressable>
          </View>
        );
      case "Picked":
        return (
          <View style={styles.row}>
            <OrderStatusSpan
              orderStatus="Picked"
              textProp="Customer Picked the Order"
            />
          </View>
        );
      case "Denied":
        return (
          <View style={styles.row}>
            <OrderStatusSpan
              orderStatus="Denied"
              textProp="Order is denied by Merchant"
            />
          </View>
        );
      case "Cancelled":
        return (
          <View style={styles.row}>
            <OrderStatusSpan
              orderStatus="Cancelled"
              textProp="Order is Cancelled by Customer"
            />
          </View>
        );
    }
  };

  useEffect(() => {
    getSingleOrder();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        {Array.isArray(listedProducts) &&
          listedProducts.map((product: Product) => {
            return (
              <ProductRowInOrder
                key={product.productID}
                productID={parseInt(product.productID)}
                productName={product.productName}
                imageURL={product.imageURL}
                unitPrice={product.unitPrice}
                quantity={product.quantity.toString()}
              />
            );
          })}
      </View>

      <View style={styles.customerDataRow}>
        <Text style={styles.customerDataTextStyle}>
          <FontAwesomeIcon
            icon={faUser as IconProp}
            size={20}
            color="#000000"
          />
        </Text>
        <Text style={styles.customerDataTextStyle}>{customerName}</Text>
      </View>

      <View style={styles.customerDataRow}>
        <Text style={styles.customerDataTextStyle}>
          <FontAwesomeIcon
            icon={faPhone as IconProp}
            size={20}
            color="#000000"
          />
        </Text>
        <Text style={styles.customerDataTextStyle}>{customerPhone}</Text>
      </View>

      <View style={styles.customerDataRow}>
        <Text style={styles.customerDataTextStyle}>
          <FontAwesomeIcon
            icon={faEnvelope as IconProp}
            size={20}
            color="#000000"
          />
        </Text>
        <Text style={styles.customerDataTextStyle}>{customerAddress}</Text>
      </View>

      <View style={styles.customerDataRow}>
        <Text style={styles.customerDataTextStyle}>
          <FontAwesomeIcon icon={faAt as IconProp} size={20} color="#000000" />
        </Text>
        <Text style={styles.customerDataTextStyle}>{customerEmail}</Text>
      </View>

      <View style={styles.customerDataRow}>
        <Text style={styles.customerDataTextStyle}>
          <FontAwesomeIcon
            icon={faDollar as IconProp}
            size={20}
            color="#000000"
          />
        </Text>
        <Text style={styles.customerDataTextStyle}>{totalValue}</Text>
      </View>

      {renderButtons(orderStatus)}
    </View>
  );
}
