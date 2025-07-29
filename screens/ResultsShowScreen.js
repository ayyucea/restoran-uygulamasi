import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import yelp from "../api/yelp";

export default function ResultsShowScreen({ route }) {
  const [result, setResult] = useState(null);
  const id = route.params.id;

  const getResult = async (id) => {
    const response = await yelp.get(`/${id}`);
    console.log(response.data);
    setResult(response.data);
  };
  //degisken kullanacagim icin $
  useEffect(() => {
    getResult(id);
  }, []);
  if (!result) {
    return null;
  }
  //[] bir kez istek gondermeyi saglar.
  return (
    <View>
      <Text style={styles.title}>{result.name}</Text>
      <Text style={styles.phone}>{result.phone}</Text>
      <FlatList
        data={result.photos}
        renderItem={({ item }) => {
          return <Image style={styles.image} source={{ uri: item }} />;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 180,
    borderRadius: 20,
    margin: 10,
  },
  title: {
    alignSelf: "center",
    fontSize: 25,
    marginVertical: 10,
  },
  phone: {
    alignSelf: "center",
    fontSize: 20,
  },
});
