import { ApiEndPoint } from "@/app/globals/ApiEndPoint";
import { login } from "@/app/redux/auth";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import validateEmail from "../globals/ValidateEmail";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    marginRight: 5,
    marginTop: 90,
    paddingTop: 10,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    marginVertical: 10,
  },
  inputContainer: {
    marginVertical: 10,
    marginLeft: 10,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
    color: "#466E2C",
  },
  inputStyle: {
    height: 50,
    fontSize: 20,
    padding: 5,
    marginLeft: 10,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#466E2C",
    borderRadius: 5,
    color: "#466E2C",
  },
  loginButton: {
    borderColor: "#466E2C",
    borderWidth: 1,
    backgroundColor: "#466E2C",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  loginButtonText: {
    color: "#f3e308ff",
    fontSize: 20,
    fontWeight: "bold",
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
    color: "rgb(102, 243, 8)",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default function Page() {
  const [userName, setUsername] = useState<string>("");
  const [passWord, setPassword] = useState<string>("kinkiniminkini");
  const [clickable,setClickable] = useState<boolean>(true);
  const dispatch = useDispatch();
  const router = useRouter();

  const loginForm = async() => {
    if(userName!==""&&passWord!==""){
    if (validateEmail(userName)) {
        setClickable(false);

      const response = await fetch(ApiEndPoint+"adminLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userName,
        pwd: passWord,
      }),
    });
    const data = await response.json();
    if (data.result) {
      dispatch(login());
      Alert.alert(data.message);
      router.push("/pages/MerchantHome");
    } else {
      Alert.alert("Incorrect Email or Password!");
      setClickable(false);
    }
      }
      else{
        Alert.alert("Not a valid Email!");
      }
    }
    else{
      Alert.alert("One or More filed(s) is/are empty!");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          inputMode="text"
          value={userName}
          onChangeText={(uN) => setUsername(uN)}
          style={styles.inputStyle}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          secureTextEntry={true}
          value={passWord}
          onChangeText={(pW) => setPassword(pW)}
          style={styles.inputStyle}
        />
      </View>

      <View style={styles.buttonContainer}>
         <Pressable disabled={!clickable} onPress={loginForm} style={clickable?styles.loginButton:styles.loadingButton}>
          <Text style={clickable?styles.loginButtonText:styles.loadingButtonText}>
            {
              clickable?"Login":"Loading..."
            }
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
