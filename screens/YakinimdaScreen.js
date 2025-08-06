import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import yelp from "../api/yelp";

export default function YakinimdaScreen() {
  const [location, setLocation] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchNearbyRestaurants = async () => {
    if (!location) return;

    setLoading(true);
    try {
      console.log("📍 Konumla arama yapılıyor:", location.coords);

      const response = await yelp.get("/search", {
        params: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          term: "restaurant",
          radius: 10000, // 10 km
          limit: 20,
        },
      });

      console.log("🍽️ Yelp'ten gelen sonuçlar:", response.data.businesses);
      setResults(response.data.businesses);
    } catch (err) {
      console.error("❌ Yelp isteği başarısız:", err);
      Alert.alert("Hata", "Restoranlar alınamadı.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Konum İzni Gerekli",
          "Yakındaki restoranları görmek için konum izni vermeniz gerekir."
        );
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      console.log("📍 Konum alındı:", currentLocation);
      setLocation(currentLocation);
    })();
  }, []);

  useEffect(() => {
    if (location) {
      searchNearbyRestaurants();
    }
  }, [location]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📍 Yakınımdaki Restoranlar</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#ff6600" />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.detail}>
                ⭐ {item.rating} yıldız, {item.review_count} değerlendirme
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  detail: {
    fontSize: 14,
    color: "#555",
  },
});
