import { View, StyleSheet, StatusBar } from 'react-native';
import React from 'react';

const layout = ({children}) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#140e1b"/>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
     backgroundColor: "#140e1b",
     padding: 10,
     flex: 1,
     alignItems: "center"
    }
})

export default layout;

