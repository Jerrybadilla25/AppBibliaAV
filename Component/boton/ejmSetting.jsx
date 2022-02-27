import React from 'react';
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useTheme } from '@react-navigation/native';


const Ejmsetting = ({fontZize}) => {
    const { colors } = useTheme();
    return (
        <ScrollView>
          <View style={{flex:1, padding: 20}}>
                    <Text style={[styles.title, { color: colors.text, fontSize: fontZize.fonttitle }]}>Genesis 1</Text>
                    <Text style={[styles.title, { color: colors.text, fontSize: fontZize.fontsubtitle }]}>La creacion</Text>
                    <View style={styles.row2}>
                      <Text style={[styles.numero, {color: colors.textNumber, fontSize: fontZize.fonttext }]}>1-   
                      <Text style={{ color: colors.text, fontSize: fontZize.fonttext, width: "90%" }}>
                       En el principio creó Dios los cielos y la tierra. 
                     </Text>
                     </Text>
                   </View>
                   <View style={styles.row2}>
                      <Text style={[styles.numero, { color: colors.textNumber, fontSize: fontZize.fonttext }]}>2-
                     <Text style={{ color: colors.text, fontSize: fontZize.fonttext }}>
                     Y la tierra estaba desordenada y vacía, y las tinieblas estaban sobre la faz del abismo, y el espíritu de Dios se movía sobre la faz de las aguas.  
                     </Text>
                     </Text>
                   </View>
                   <View style={styles.row2}>
                      <Text style={[styles.numero, { color: colors.textNumber, fontSize: fontZize.fonttext }]}>3-
                     <Text style={{ color: colors.text, fontSize: fontZize.fonttext}}>
                     Y dijo Dios: Sea la luz; y fue la luz.  
                     </Text>
                     </Text>
                   </View>
                </View>  
        </ScrollView>
        
    );
}

const styles = StyleSheet.create({
    numero: {
        //fontSize: 14,
        paddingRight: 12,
        //fontWeight: "bold",
    },
    title: {
        marginBottom: 8,
        
        //fontSize: 22,
        fontWeight: "bold",
        textAlign: "center"
    },
    row2: {
        //flex: 1,
        flexDirection: "row",
        marginVertical: 8,
    }
})

export default Ejmsetting;

