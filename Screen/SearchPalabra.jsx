import React, {useState, useContext} from "react";
import {View,Text, TouchableOpacity,StyleSheet,TextInput,ScrollView} from "react-native";
import { useTheme } from "@react-navigation/native";
import {searchCharter} from '../api.manual';
import {UserContext} from '../Component/Context/contexUser';

import Versos from '../Component/Biblias/versosall.json';


const SearchPalabra = ({ route, navigation: { navigate } }) => {
    const {versionBook, setVersionBook} = useContext(UserContext);
    const { colors } = useTheme();
    const [data, setData]=useState(null); //en uso
    const [filter, setFilter]=useState(null);
    const [palabra, setPalabra]=useState(null);


    /*
    React.useEffect(() => {
        SearchVersos();
     }, []);


     const SearchVersos = ()=>{
        setData(Versos)
     }
     */

     const textInputChange = (val)=>{
        setPalabra(val)
      }

      const buscarPalabra = ()=>{
          setFilter(null)
          let dataFilter = Versos.filter(x => x.versiculo.toUpperCase().includes(palabra.toUpperCase()))
          setFilter(dataFilter);
      }


      

    return (
        <View style={styles.container}>
      <View >
          <Text style={[styles.textTitle,{color: colors.text}]}>Buscar versiculos segun la siguiente palabra</Text>
        <TextInput
          style={[styles.textInput, { borderColor: colors.border, color: colors.text }]}
          placeholder="Buscar palabra en toda la biblia"
          placeholderText={colors.text}
          placeholderTextColor={colors.inputHolder}
          onChangeText={(val) => textInputChange(val)}
        />

        <TouchableOpacity
        onPress={buscarPalabra}
        >
           <Text style={[styles.boton,{ color: colors.header, backgroundColor: colors.text  }]}>Buscar</Text> 
        </TouchableOpacity>
        
        
      </View>

         {
           filter && 
           (
             <ScrollView style={[styles.col, {}]}>
               <View>
                 {
                 filter.map(item => (
                    <View 
                    style={[styles.item, {backgroundColor: colors.header}]}
                    key={item._id}>
                        <Text style={{color: colors.text, fontFamily: 'sans-serif-medium', paddingBottom:6}}>{item.originCharter}</Text>

                        <Text style={{color: colors.textNumber}}>{item.numero}<Text>  </Text>
                        <Text style={{color: colors.text}}>{item.versiculo}</Text></Text>
                    </View>
                   
                   
                 ))
               }
               </View>
               
             </ScrollView>
           )
         }
       
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        padding: 20,
      },
      col: {
        flex: 1,
        flexDirection: "column",
        paddingHorizontal: 5,
        marginVertical: 10,
        
      },
      textInput: {
        height: 40,
        borderWidth: 1,
        padding: 5,
        borderRadius: 10,
      },
      textFilter:{
        paddingHorizontal: 20,
        paddingVertical: 10,
      },
      textTitle:{
        fontFamily: 'sans-serif-medium',
        paddingBottom: 20,
        fontSize: 12,
        
      },
      boton:{
        marginVertical: 10,
        fontSize: 14,
        height: 45,
        borderWidth: 1,
        padding: 5,
        borderRadius: 10,
        textAlign: "center",
        paddingVertical: 10

      },
      item:{
          marginVertical: 10,
          padding: 12
      }
})

export default SearchPalabra;


