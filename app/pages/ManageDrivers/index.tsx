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
  linkButton:{
    marginLeft:5,
    padding:7,
    borderRadius:5,
    borderColor:'#000000',
    borderWidth:1
  },
  driverNameText:{
    fontSize:15,
    fontWeight:'bold'
  },
  assignmentStat:{
    margin:5,
  },
  assignmentStatText:{
    fontSize:12,
  }
});

interface Driver {
  driverID: string;
  driverName: string;
  totalAssignments:number;
  delivered:number;
  withdrawn:number;
  rejected:number;
  returned:number;
}

export default function AssignDriver() {
    const [allDrivers, setAllDrivers] = useState<Driver[]>([]);
    
    const getDrivers = async () => {
    try {
      await axios.get(ApiEndPoint + "allDrivers?orderID").then((res) => {
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

  useEffect(() => {
    getDrivers();
  }, []);

  return (
    <View style={styles.container}>
        {
            Array.isArray(allDrivers) && allDrivers.map((driver:Driver)=>{
                return <View style={styles.driverRow} key={driver.driverID}>
                    <Pressable onPress={()=>router.push({pathname:"/pages/ManageDrivers/SingleDriver",params:{driverID:driver.driverID}})} style={styles.linkButton}>
                        <Text style={styles.driverNameText}>{driver.driverName}</Text>
                    </Pressable>
                    { driver.totalAssignments>0?<View style={styles.assignmentStat}><Text style={styles.assignmentStatText}>{driver.totalAssignments} Total Assignments</Text></View>:null}
                    { driver.delivered>0?<View style={styles.assignmentStat}><Text style={styles.assignmentStatText}>{driver.delivered} Delivered</Text></View>:null}
                    { driver.withdrawn>0?<View style={styles.assignmentStat}><Text style={styles.assignmentStatText}>{driver.withdrawn} Withdrawn</Text></View>:null}
                    { driver.rejected>0?<View style={styles.assignmentStat}><Text style={styles.assignmentStatText}>{driver.rejected} Rejected</Text></View>:null}
                    { driver.returned>0?<View style={styles.assignmentStat}><Text style={styles.assignmentStatText}>{driver.returned} Returned</Text></View>:null}
            </View>;
            })
        }
    </View>
  );
}