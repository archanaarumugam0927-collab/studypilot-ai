import { Link, router } from "expo-router";
import { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { supabase } from "../lib/supabase";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert("Login failed", error.message);
      return;
    }

    router.replace("/");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>StudyPilot AI</Text>

      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Login to continue your study journey</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Link href="/signup" style={styles.link}>
        New user? Create account
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#F8F9FF",
  },
  logo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0040E0",
    textAlign: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#0B1C30",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#434656",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 30,
  },
  input: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 14,
    fontSize: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#D3E4FE",
  },
  button: {
    backgroundColor: "#0040E0",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },
  link: {
    textAlign: "center",
    marginTop: 20,
    color: "#0040E0",
    fontWeight: "bold",
  },
});