import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, AntDesign, MaterialIcons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity } from "react-native";
import SearchScreen from "../screens/SearchScreen";
import { useAuth } from "../contexts/AuthContext";
import FavorilerScreen from "../screens/FavorilerScreen";
import YakinimdaScreen from "../screens/YakinimdaScreen";
import ProfilScreen from "../screens/ProfilScreen";

const Tab = createBottomTabNavigator();

function LogoutButton() {
  const { logout } = useAuth();
  return (
    <Ionicons
      name="log-out-outline"
      size={24}
      color="black"
      style={{ marginRight: 15 }}
      onPress={logout}
    />
  );
}

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitle: "🍽️ Lezzet Rehberi",
        headerRight: () => <LogoutButton />,
        tabBarActiveTintColor: "#4CAF50",
        tabBarInactiveTintColor: "#888",
        tabBarLabelStyle: { fontSize: 12 },
      }}
    >
      <Tab.Screen
        name="Keşfet"
        component={SearchScreen}
        options={{
          tabBarLabel: () => <Text style={{ fontSize: 12 }}>Keşfet</Text>,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="search1" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favoriler"
        component={FavorilerScreen}
        options={{
          tabBarLabel: () => <Text style={{ fontSize: 12 }}>Favoriler</Text>,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Yakınımda"
        component={YakinimdaScreen}
        options={{
          tabBarLabel: () => <Text style={{ fontSize: 12 }}>Yakınımda</Text>,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="location-outline" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Profil"
        component={ProfilScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
