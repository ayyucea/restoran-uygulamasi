import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function SearchBar() {
  return (
    <View style={styles.backgroundStyle}>
      <AntDesign
        style={styles.iconStyle}
        name="search1"
        size={30}
        color="black"
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="Ara"
        autoCorrect={false}
        autoCapitalize="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: "lightgray",
    flexDirection: "row", //search ikonuyla textin yanyana olabilmesi icin
    margin: 10,
    height: 50,
    borderRadius: 20,
    alignItems: "center", //text ile iconu hizalamak
  },
  iconStyle: {
    marginHorizontal: 15,
  },
  inputStyle: {
    flex: 1,
    fontSize: 18,
  },
});
