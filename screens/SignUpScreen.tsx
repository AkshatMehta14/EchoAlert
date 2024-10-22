import { UserContext } from "@/context/userContext";
import { auth } from "@/firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";

const SignUpScreen = ({ navigation }: any) => {
  const { setUser } = useContext(UserContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [school, setSchool] = useState("");
  const [password, setPassword] = useState("");

  const createUser = async (email: string, password: string) => {
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      setUser(userCred.user);

      navigation.navigate("Alert");
    } catch (err: any) {
      Alert.alert(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up Page</Text>
      <TextInput
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.placeholderText}>Student/Administrator</Text>
        <Switch
          style={{ flex: 1 }}
          value={isAdmin}
          onValueChange={setIsAdmin}
        />
      </View>
      <TextInput
        placeholder="School Name"
        value={school}
        onChangeText={setSchool}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Sign Up" onPress={() => createUser(email, password)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  input: { width: "80%", padding: 10, borderWidth: 1, marginVertical: 10 },
  placeholderText: { fontSize: 16, flex: 3 },
});

export default SignUpScreen;
