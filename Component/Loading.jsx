import React from 'react';
import {Text, View, StyleSheet } from "react-native";
import { useTheme } from '@react-navigation/native';


function Loading() {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, {backgroundColor: colors.background}]} >
        <Text style={[styles.title, {color: colors.text}]}>Cargando.....</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      padding: 20,
      flex: 1,
    },
    title:{
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 16,
    }
  
  });

export default Loading;
