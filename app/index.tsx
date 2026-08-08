import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  indexViewStyle: {
    marginTop: 70,
  },
  buttonContainer:{
    marginVertical: 10,
    marginLeft: 10,
  },
  linkToLogin: {
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
  linkToSignUp:{
    borderColor: "#8d2005",
    borderWidth: 1,
    backgroundColor: "#8d2005",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  linkToSignUpText: {
    color: "rgb(251, 255, 0)",
    fontSize: 20,
    fontWeight: "bold",
  },
  linkToLoginText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default function Index() {
  return (
    <View style={styles.indexViewStyle}>
      <View style={styles.buttonContainer}>
        <Pressable onPress={() => router.push("/pages/Login")} style={styles.linkToLogin}>
          <Text style={styles.linkToLoginText}>Merchant Login</Text>
        </Pressable>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable onPress={() => router.push("/pages/SignUp")} style={styles.linkToSignUp}>
          <Text style={styles.linkToSignUpText}>New Merchant ? Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
}
