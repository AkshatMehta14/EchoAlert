import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { requestForegroundPermissionsAsync } from "expo-location";

const HomeScreen = ({ navigation }: { navigation: any }) => {
  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await requestForegroundPermissionsAsync();
      console.log(`Location Permission Status: ${status}`);
    };

    requestPermissions();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EchoAlert</Text>
      <Text style={styles.subtitle}>Making Schools Safer</Text>
      <TouchableOpacity
        style={styles.signInButton}
        onPress={() => navigation.navigate("SignIn")}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signUpButton}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5", // Light grey background for cleaner look
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "800",
    color: "#333333",
    marginBottom: 10,
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  subtitle: {
    fontSize: 18,
    fontStyle: "italic",
    color: "#555555",
    marginBottom: 40,
  },
  signInButton: {
    backgroundColor: "#4CAF50", // Solid green color for button
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3, // For Android shadow
    marginVertical: 15,
  },
  signUpButton: {
    backgroundColor: "#03A9F4", // Solid blue color for button
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3, // For Android shadow
    marginVertical: 15,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 18,
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
});

export default HomeScreen;
