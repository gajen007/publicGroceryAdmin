import { ApiEndPoint } from "@/globals";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginTop: 90,
    marginLeft: 5,
    marginRight: 5,
    padding: "0.5%",
  },
    orderLinkButton:{
    padding:5,
    backgroundColor:'#000000',
    borderRadius:5,
  },
  assignmentRow:{
    borderWidth:1,
    borderColor:'#000000',
    borderRadius:5,
    margin:5
  }
});

interface Driver {
    driverID:string;
    driverName:string;
    driverEmail:string|string;
    assignments: Assignment[];
}

interface Assignment {
    assignmentID:string;
    orderID:string;
    status:string;
}

export default function SingleDriver() {
  const { driverID } = useLocalSearchParams<{ driverID: string }>();
    const [driverName,setDriverName ] = useState("");
    const [driverEmail,setDriverEmail ] = useState("");
    const [assignments,setAssignments ] = useState<Assignment[]>([]);
  const getSingleDriver = async () => {
    try {
      await axios
        .get<Driver>(ApiEndPoint + "getSingleDriverForMerchant?driverID=" + driverID)
        .then((res) => {
          const arrived = res.data;
            setDriverName(arrived.driverName);
            setDriverEmail(arrived.driverEmail);
            setAssignments(arrived.assignments)
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
    getSingleDriver();
  }, []);

  return (
    <View style={styles.container}>
        <View style={{marginTop:5}}><Text>Name: {driverName}</Text></View>
        <View style={{marginTop:5}}><Text>Email: {driverEmail}</Text></View>
        <View style={{marginTop:5}}><Text>Assignments</Text>
        {
            Array.isArray(assignments) && assignments.map((a:Assignment)=>{
                return <View style={styles.assignmentRow} key={a.assignmentID}>
                    <Pressable style={styles.orderLinkButton} onPress={()=>router.push({pathname:"/pages/MerchantHome/SingleOrder",params: { orderID: a.orderID }})}>
                        <Text style={{fontSize:15,color:'#ffffff'}}>{a.status}; Click to View Order</Text>
                    </Pressable>
                </View>
            })
        }
        </View>
    </View>
  );
}