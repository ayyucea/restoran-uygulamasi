console.log("APP BAŞLADI");

import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import SearchScreen from "./screens/SearchScreen";
import ResultsShowScreen from "./screens/ResultsShowScreen";

const Stack = createNativeStackNavigator();

// Header'ın sağındaki çıkış butonu
function LogoutButton() {
  const { logout } = useAuth();
  return (
    <Ionicons
      name="log-out-outline"
      size={28}
      color="#080a08"
      style={{ marginRight: 15 }}
      onPress={logout}
    />
  );
}

function Root() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#ff6600" />
        <Text style={{ marginTop: 10, fontSize: 16 }}>Yükleniyor...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerTitle: "🍕  Lezzet Rehberi",
          headerRight: () => <LogoutButton />,
        }}
      />
      <Stack.Screen name="ResultsShow" component={ResultsShowScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({});
