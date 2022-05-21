import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";


const Msj = ({msj, colors}) => {
    return (
      <View style={[styles.rowFlex, { backgroundColor: colors.social }]}>
        <Text style={[styles.social, { color: colors.text }]}>
          {msj}
        </Text>
      </View>
   
    );
}

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
      fontSize: 13,
      marginHorizontal: 8,
      paddingBottom: 10,
      fontFamily: 'sans-serif-medium'
    },
  });

export default Msj;
