// import React, { useEffect, useState } from "react";
// import {
//   FlatList,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
//   Linking,
// } from "react-native";
// import yelp from "../api/yelp";
// import AntDesign from "@expo/vector-icons/AntDesign";
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// export default function ResultsShowScreen({ route }) {
//   const [result, setResult] = useState(null);
//   const id = route.params.id;

//   const getResult = async (id) => {
//     const response = await yelp.get(`/${id}`);
//     setResult(response.data);
//   };

//   useEffect(() => {
//     getResult(id);
//   }, []);

//   if (!result) return null;

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>{result.name}</Text>
//       <Text style={styles.phone}>📞 {result.phone}</Text>

//       <View style={styles.icon}>
//         {result.is_closed ? (
//           <AntDesign name="closecircleo" size={30} color="red" />
//         ) : (
//           <MaterialIcons name="delivery-dining" size={30} color="green" />
//         )}
//       </View>

//       {/* Fotoğraflar */}
//       <FlatList
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         data={result.photos}
//         keyExtractor={(photo) => photo}
//         renderItem={({ item }) => (
//           <Image style={styles.image} source={{ uri: item }} />
//         )}
//       />

//       {/* Ek Bilgiler */}
//       <View style={styles.infoSection}>
//         {/* Adres */}
//         <Text style={styles.sectionText}>
//           📍 {result.location.address1}, {result.location.city}
//         </Text>

//         {/* Fiyat */}
//         {result.price && (
//           <Text style={styles.sectionText}>💰 Fiyat: {result.price}</Text>
//         )}

//         {/* Puan ve yorum */}
//         <Text style={styles.sectionText}>
//           ⭐️ {result.rating} / 5 — {result.review_count} değerlendirme
//         </Text>

//         {/* Kategori */}
//         <Text style={styles.sectionText}>
//           🍽️ {result.categories.map((cat) => cat.title).join(", ")}
//         </Text>

//         {/* Yelp Link */}
//         <Text
//           style={[styles.sectionText, styles.link]}
//           onPress={() => Linking.openURL(result.url)}
//         >
//           🔗 Yelp sayfasında aç
//         </Text>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#fff",
//     padding: 20,
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: "bold",
//     color: "#333",
//     textAlign: "center",
//     marginBottom: 5,
//   },
//   phone: {
//     fontSize: 16,
//     color: "#777",
//     textAlign: "center",
//     marginBottom: 10,
//   },
//   icon: {
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   image: {
//     width: 250,
//     height: 180,
//     borderRadius: 12,
//     marginRight: 15,
//   },
//   infoSection: {
//     marginTop: 20,
//     paddingHorizontal: 10,
//   },
//   sectionText: {
//     fontSize: 16,
//     color: "#444",
//     marginVertical: 8,
//   },
//   link: {
//     color: "#4CAF50",
//     textDecorationLine: "underline",
//   },
// });

import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
} from "react-native";
import yelp from "../api/yelp";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MapView, { Marker } from "react-native-maps";

export default function ResultsShowScreen({ route }) {
  const [result, setResult] = useState(null);
  const id = route.params.id;

  const getResult = async (id) => {
    const response = await yelp.get(`/${id}`);
    setResult(response.data);
  };

  useEffect(() => {
    getResult(id);
  }, []);

  if (!result) return null;

  const openInMaps = () => {
    const { latitude, longitude } = result.coordinates;
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{result.name}</Text>
      <Text style={styles.phone}>📞 {result.phone}</Text>

      <View style={styles.icon}>
        {result.is_closed ? (
          <AntDesign name="closecircleo" size={30} color="red" />
        ) : (
          <MaterialIcons name="delivery-dining" size={30} color="green" />
        )}
      </View>

      {/* Fotoğraflar */}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={result.photos}
        keyExtractor={(photo) => photo}
        renderItem={({ item }) => (
          <Image style={styles.image} source={{ uri: item }} />
        )}
      />

      {/* Bilgiler */}
      <View style={styles.infoSection}>
        <Text style={styles.sectionText}>
          📍 {result.location.address1}, {result.location.city}
        </Text>

        {result.price && (
          <Text style={styles.sectionText}>💰 Fiyat: {result.price}</Text>
        )}

        <Text style={styles.sectionText}>
          ⭐️ {result.rating} / 5 — {result.review_count} değerlendirme
        </Text>

        <Text style={styles.sectionText}>
          🍽️ {result.categories.map((cat) => cat.title).join(", ")}
        </Text>

        <Text
          style={[styles.sectionText, styles.link]}
          onPress={() => Linking.openURL(result.url)}
        >
          🔗 Yelp sayfasında aç
        </Text>

        {/* Harita */}
        <TouchableOpacity onPress={openInMaps}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: result.coordinates.latitude,
              longitude: result.coordinates.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            pointerEvents="none" // sadece görüntü, dokunma yok
          >
            <Marker
              coordinate={{
                latitude: result.coordinates.latitude,
                longitude: result.coordinates.longitude,
              }}
              title={result.name}
              description={result.location.address1}
            />
          </MapView>
          <Text
            style={[
              styles.sectionText,
              { textAlign: "center", marginTop: 5, color: "#4CAF50" },
            ]}
          >
            📍 Haritada açmak için dokun
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 5,
  },
  phone: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    marginBottom: 10,
  },
  icon: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 250,
    height: 180,
    borderRadius: 12,
    marginRight: 15,
  },
  infoSection: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  sectionText: {
    fontSize: 16,
    color: "#444",
    marginVertical: 8,
  },
  link: {
    color: "#4CAF50",
    textDecorationLine: "underline",
  },
  map: {
    height: 200,
    borderRadius: 12,
    marginTop: 20,
  },
});
