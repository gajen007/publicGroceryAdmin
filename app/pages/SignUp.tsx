import { ApiEndPoint, validateEmail } from "@/globals";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    marginTop: 90,
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 5,
    paddingTop: 10,
  },
  column: {
    flexDirection: "column",
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
  inputContainer: {
    marginVertical: 10,
    marginLeft: 10,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
    color: "#000000",
  },
  inputStyle: {
    height: 50,
    fontSize: 20,
    padding: 5,
    marginLeft: 10,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 5,
    color: "#000000",
  },
  signupButton: {
    borderColor: "#000000",
    borderWidth: 1,
    backgroundColor: "#000000",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  signupButtonText: {
    color: "#ffffff",
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
  const [nme, setName] = useState<string>("");
  const [em, setEmail] = useState<string>("");
  const [confirmEm, setConfirmEmail] = useState<string>("");
  const [pw, setPassword] = useState<string>("");
  const [confirmPw, setConfirmPassword] = useState<string>("");
  const [clickable,setClickable] = useState<boolean>(true);

  const signUp = async () => {
    if (em === confirmEm && pw === confirmPw) {
      if (validateEmail(em)) {
        setClickable(false);
      const response = await fetch(ApiEndPoint+"adminSignUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nme,
        email: em,
        pwd: pw,
      }),
    });
    const data = await response.json();
    if (data.result) {
      Alert.alert("Signed Up! Now Login!");
      router.push("/pages/Login")
    } else {
      Alert.alert("Unable to Register!");
      setClickable(false);
    }
      }
      else{
        Alert.alert("Not a valid Email!");
      }
    } else {
      if (em !== confirmEm) {
        Alert.alert("Email isn't correctly re-typed!");
      } else if (pw !== confirmPw) {
        Alert.alert("Password isn't correctly re-typed!");
      } else {
        Alert.alert("Both Email & Password are not correctly re-typed!");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Your Name</Text>
        <TextInput
          style={styles.inputStyle}
          placeholder="Type your name here"
          value={nme}
          onChangeText={(name) => setName(name)}
          inputMode="text"
          placeholderTextColor="#000000"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Your eMail</Text>
        <TextInput
          style={styles.inputStyle}
          placeholder="Type your email here"
          value={em}
          onChangeText={(em) => setEmail(em)}
          inputMode="email"
          placeholderTextColor="#000000"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Confirm your eMail</Text>
        <TextInput
          style={styles.inputStyle}
          placeholder="Re-type your email here"
          value={confirmEm}
          onChangeText={(ce) => setConfirmEmail(ce)}
          inputMode="email"
          placeholderTextColor="#000000"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Choose a Password</Text>
        <TextInput
          style={styles.inputStyle}
          placeholder="Type your password here"
          value={pw}
          onChangeText={(pw) => setPassword(pw)}
          secureTextEntry={true}
          placeholderTextColor="#000000"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Confirm the password</Text>
        <TextInput
          style={styles.inputStyle}
          placeholder="Re-type your password here"
          value={confirmPw}
          onChangeText={(cp) => setConfirmPassword(cp)}
          secureTextEntry={true}
          placeholderTextColor="#000000"
        />
      </View>
      <View style={styles.column}>
        <Pressable disabled={!clickable} onPress={signUp} style={clickable?styles.signupButton:styles.loadingButton}>
          <Text style={clickable?styles.signupButtonText:styles.loadingButtonText}>
            {
              clickable?"SignUp":"Loading..."
            }
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
