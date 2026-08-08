import { ApiEndPoint } from "@/globals";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View,StyleSheet,Text, Pressable, Alert } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginTop: 90,
    marginLeft: 5,
    marginRight: 5,
    padding: "0.5%",
  },
  driverRow:{
    marginTop:5,
    padding:10,
    flexDirection:'row'
  },
  driverNameText:{
    fontSize:15
  },
  assignButton:{
    marginLeft:5,
    padding:7,
    borderRadius:5,
    borderColor:'#000000',
    backgroundColor:'#000000'
  },
  assignButtonText:{
    fontSize:15,
    color:'#ffffff'
  },
  loadingButton:{
    borderColor: "#4a5881",
    borderWidth: 1,
    backgroundColor: "#4a5881",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  loadingButtonText: {
    color: "rgb(243, 133, 8)",
    fontSize: 20,
    fontWeight: "bold",
  },
});

interface Driver {
  driverID: string;
  driverName: string;
}

export default function AssignDriver() {
    const { orderID } = useLocalSearchParams<{ orderID: string }>();

    const [allDrivers, setAllDrivers] = useState<Driver[]>([]);
    const [clickable,setClickable] = useState<boolean>(true);
    
    const getDrivers = async () => {
    try {
      await axios.get(ApiEndPoint + "availableDrivers?orderID="+orderID).then((res) => {
        setAllDrivers(res.data.drivers);
      });
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(e.message);
      } else {
        console.error("An unknown error occurred:", e);
      }
    }
  };

  const assignDriver = async(driverID:string,oID:string)=>{
        setClickable(false);
        const response = await fetch(ApiEndPoint+"assignDriverToOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          driverID: driverID,
          orderID: oID,
        }),
      });
      const data = await response.json();
      console.log(data.message);
      Alert.alert(data.message);
      if (data.result) {
        router.push("/pages/MerchantHome");
      } else {
        setClickable(true);
      }
};

  useEffect(() => {
    //Authenticate(); //runs twice; WHY ?
    getDrivers();
  }, []);

  return (
    <View style={styles.container}>
        {
            Array.isArray(allDrivers) && allDrivers.map((driver:Driver)=>{
                return <View style={styles.driverRow} key={driver.driverID}>
                    <Text style={styles.driverNameText}>{driver.driverName}</Text>
         <Pressable disabled={!clickable} onPress={()=>assignDriver(driver.driverID,orderID)} style={clickable?styles.assignButton:styles.loadingButton}>
          <Text style={clickable?styles.assignButtonText:styles.loadingButtonText}>
            {
              clickable?"Assign":"Loading..."
            }
          </Text>
        </Pressable>
                  </View>
            })
        }
    </View>
  );
}