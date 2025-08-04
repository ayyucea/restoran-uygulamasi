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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Toast from "react-native-toast-message";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Toast.show({
        type: "success",
        text1: "Kayıt başarılı 🎉",
        text2: "Şimdi giriş yapabilirsiniz!",
      });
      navigation.replace("Login");
    } catch (e) {
      console.log("Kayıt hatası:", e.code, e.message);

      let message = "Kayıt sırasında bir hata oluştu.";

      switch (e.code) {
        case "auth/email-already-in-use":
          message = "Bu e-posta zaten kullanılıyor.";
          break;
        case "auth/invalid-email":
          message = "Geçersiz e-posta adresi.";
          break;
        case "auth/weak-password":
          message = "Şifre çok zayıf. En az 6 karakter olmalı.";
          break;
        default:
          message = e.message;
      }

      Toast.show({
        type: "error",
        text1: "Kayıt Hatası",
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
        <Text style={styles.title}>Hesap Oluştur ✨</Text>
        <Text style={styles.subtitle}>Yeni bir hesap için bilgileri gir</Text>

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

        {/* Kayıt butonu */}
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Kayıt Ol</Text>
        </TouchableOpacity>

        {/* Girişe yönlendirme */}
        <TouchableOpacity
          style={styles.linkContainer}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.linkText}>Zaten hesabın var mı? Giriş Yap</Text>
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
