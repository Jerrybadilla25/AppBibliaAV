import React, { useState, useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { UserContext } from "../Context/contexUser";

const Favorito = ({ colors, data, addFavorito }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        addFavorito({
          variables: {
            _id: data._id,
            version: data.version,
            charter: data.charter
          },
        })
      }
    >
      <View style={[styles.rowFlex, { backgroundColor: colors.social }]}>
        <Text style={[styles.social, { color: colors.text }]}>
          Agregar a favoritos
        </Text>
        <Ionicons name="md-heart-outline" size={24} color={colors.text} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rowFlex: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginVertical: 30,
  },
  socialText: {
    paddingHorizontal: 5,
  },
  social: {
    fontSize: 14,
    marginHorizontal: 8,
    paddingBottom: 10,
  },
});

export default Favorito;
