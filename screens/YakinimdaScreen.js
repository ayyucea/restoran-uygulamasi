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
import SearchBar from "../components/SearchBar";
import ResultsList from "../components/ResultsList";
import yelp from "../api/yelp"; // Eğer SearchScreen’de ayrı dosyadan çekiyorsan

export default function YakinimdaScreen() {
  const [location, setLocation] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchNearbyRestaurants = async () => {
    if (!location) return;

    setLoading(true);
    try {
      const response = await yelp.get("/search", {
        params: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          limit: 20,
          radius: 3000,
          term: "food",
        },
      });

      setResults(response.data.businesses);
    } catch (err) {
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
          "Yakındaki restoranları görmek için izin verin."
        );
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
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
            <ResultsList title={item.name} results={[item]} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 10, paddingHorizontal: 10 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
});
