import { ApiEndPoint } from "@/globals";
import axios from "axios";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import OrderGrid from "./OrderGrid";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    margin: 10,
  },
  scrollView: {
    display: "flex",
    flexDirection: "column",
    marginTop: 70,
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
});

interface Order {
  orderID: string;
  dateOrdered: string;
  arrivedAt: string;
  customerName: string;
  itemsCount: string;
  serveDate: string;
  serveTime: string;
  serveType: string;
  status: string;
  totalValue: string;
}

export default function Page() {
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const getOrders = async () => {
    try {
      await axios.get<Order[]>(ApiEndPoint + "getOrders").then((res) => {
        setAllOrders(res.data);
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
    getOrders();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          {Array.isArray(allOrders) &&
            allOrders.map((order: Order) => {
              return (
                <OrderGrid
                  key={order.orderID}
                  orderID={order.orderID}
                  dateOrdered={order.dateOrdered}
                  arrivedAt={order.arrivedAt}
                  customerName={order.customerName}
                  itemsCount={order.itemsCount}
                  serveDate={order.serveDate}
                  serveTime={order.serveTime}
                  serveType={order.serveType}
                  status={order.status}
                  totalValue={order.totalValue}
                />
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
}
