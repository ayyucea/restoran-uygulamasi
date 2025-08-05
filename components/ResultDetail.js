import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useFavorites } from "../contexts/FavoritesContext";
import { Ionicons } from "@expo/vector-icons";

export default function ResultDetail({ result }) {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const toggleFavorite = () => {
    if (isFavorite(result.id)) {
      removeFromFavorites(result.id);
    } else {
      addToFavorites(result);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={result.image_url ? { uri: result.image_url } : null}
      />

      {/* Başlık + Kalp */}
      <View style={styles.headerRow}>
        <Text style={styles.name}>{result.name}</Text>
        <TouchableOpacity onPress={toggleFavorite}>
          <Ionicons
            name={isFavorite(result.id) ? "heart" : "heart-outline"}
            size={22}
            color={isFavorite(result.id) ? "red" : "gray"}
          />
        </TouchableOpacity>
      </View>

      <Text>
        {result.rating} Yıldızlı Restoran, {result.review_count} Değerlendirme
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
    marginBottom: 10,
  },
  image: {
    width: 250,
    height: 120,
    borderRadius: 8,
    marginBottom: 5,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 3,
  },
});
