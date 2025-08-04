import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Toast.show({
        type: "success",
        text1: "Başarıyla giriş yapıldı!",
      });
    } catch (e) {
      console.log("Giriş hatası:", e.code, e.message);

      let message = "Bir hata oluştu";
      switch (e.code) {
        case "auth/user-not-found":
          message = "Böyle bir kullanıcı bulunamadı. Lütfen kayıt olun.";
          break;
        case "auth/wrong-password":
          message = "Şifre doğru değil. Lütfen tekrar deneyin.";
          break;
        case "auth/invalid-email":
          message = "Geçersiz e-posta adresi.";
          break;
        case "auth/too-many-requests":
          message =
            "Çok fazla giriş denemesi. Lütfen daha sonra tekrar deneyin.";
          break;
        case "auth/invalid-credential":
          message = "Geçersiz kullanıcı bilgileri. E-posta veya şifre yanlış.";
          break;
        default:
          message = e.message;
          break;
      }

      Toast.show({
        type: "error",
        text1: "Giriş Hatası",
        text2: message,
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={80}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Hoş Geldin 👋</Text>
        <Text style={styles.subtitle}>Lütfen giriş yap</Text>

        {/* E-posta */}
        <View style={styles.inputContainer}>
          <MaterialIcons
            name="email"
            size={20}
            color="#666"
            style={styles.icon}
          />
          <TextInput
            placeholder="E-posta"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            autoCapitalize="none"
            placeholderTextColor="#999"
            keyboardType="email-address"
          />
        </View>

        {/* Şifre */}
        <View style={styles.inputContainer}>
          <MaterialIcons
            name="lock"
            size={20}
            color="#666"
            style={styles.icon}
          />
          <TextInput
            placeholder="Şifre"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry={!showPassword}
            placeholderTextColor="#999"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye" : "eye-off"}
              size={20}
              color="#666"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        {/* Giriş butonu */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Giriş Yap</Text>
        </TouchableOpacity>

        {/* Kayıt ol */}
        <TouchableOpacity
          style={styles.linkContainer}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.linkText}>Hesabın yok mu? Kayıt Ol</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  scrollContainer: {
    padding: 30,
    justifyContent: "center",
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  linkContainer: {
    alignItems: "center",
  },
  linkText: {
    color: "#4CAF50",
    fontSize: 14,
  },
});
