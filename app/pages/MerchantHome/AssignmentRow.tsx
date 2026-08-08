import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { RelativePathString, router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface AssignmentRowProps {
  driverID:string;
  driverName:string;
  status:string;
  awaitedSince:string;
  acceptedOrRejected:string|null;
  pickedOrWithdrawn:string|null;
  deliveredOrReturned:string|null;
}
const styles = StyleSheet.create({
  assignmentRow: {
    display: "flex",
    flexDirection: "row",
    borderRadius:5,
    borderColor:'#000000',
    borderWidth:1,
    marginTop:5
  },
  assignmentRowContainer: {
    marginRight: 5,
    paddingTop: 20,
  },
  assignmentRowText: {
    marginBottom:5,
    paddingLeft: 5,
    fontSize: 15,
  },
  driverLinkButton:{
    padding:5,
    borderWidth:1,
    borderColor:'#000000',
    borderRadius:5,
  }
});

export default function AssignmentRow({
  driverID,
  driverName,
  status,
  awaitedSince,
  acceptedOrRejected,
  pickedOrWithdrawn,
  deliveredOrReturned,
}: AssignmentRowProps) {
  return (
    <View style={styles.assignmentRow}>
      <View style={styles.assignmentRowContainer}>
        <View style={styles.assignmentRowText}>
          <Pressable onPress={()=>router.push({
                pathname: "/pages/ManageDrivers/SingleDriver" as RelativePathString,
                params: { driverID: driverID },
              })} style={styles.driverLinkButton}>
                <Text style={{fontSize:15,color:'#000000'}}>
                  <FontAwesomeIcon
                    icon={faUser as IconProp}
                    size={15}
                    color="#000000"
                  />
                  {driverName}
                </Text>
          </Pressable>
        </View>
        <Text style={styles.assignmentRowText}>Called @{awaitedSince}</Text>
        <Text style={styles.assignmentRowText}>Responded @{acceptedOrRejected}</Text>
        { pickedOrWithdrawn!==null?<Text style={styles.assignmentRowText}>{status==='Delivered'?'Picked':'Withdrwan'} @{pickedOrWithdrawn}</Text>:null }
        { deliveredOrReturned!==null?<Text style={styles.assignmentRowText}>{status==='Delivered'?'Delivered ':'Returned'} @{deliveredOrReturned}</Text>:null }
      </View>
    </View>
  );
}