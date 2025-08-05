import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useFavorites } from "../contexts/FavoritesContext";
import ResultDetail from "../components/ResultDetail";

export default function FavorilerScreen() {
  const { favorites } = useFavorites();

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.empty}>Henüz favori restoran yok 🥺</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ResultDetail result={item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  empty: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 30,
  },
});
