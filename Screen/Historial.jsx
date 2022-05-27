import React, {useState, useContext} from 'react';
import {View, StyleSheet, Text, ScrollView, TouchableOpacity} from 'react-native';

import { useTheme } from "@react-navigation/native";
import { UserContext } from "../Component/Context/contexUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

import Reina from "../Component/Biblias/ReinaValera/buscarCapituloReinaValera.json";
import Oso from "../Component/Biblias/Oso/buscarCapituloOso.json";


const Historial = ( {navigation: { navigate }} ) => {
    const { fontZize, versionBook } =useContext(UserContext); //en uso
    const { colors } = useTheme(); //en uso
    

    
    const [history, setHistory]=useState(null)
    const [msj, setMsj]=useState(true)
    const [estado, setEstado]=useState(true)

    React.useEffect(() => {
        Historia()
    }, []);

    const sendingBiblia= (id)=>{
        navigate('Charter', {_id: id, version: versionBook});
    }

    const deleteHistorial = async ()=>{
        await AsyncStorage.removeItem('@storage_Key_Historial')
        setEstado(true)
        setHistory(null)
        setMsj(true)
    }

    const ayudaDelete = ()=>{
        setMsj(false)
    }

    const Historia = async (id)=>{
        try {
          let histori = await AsyncStorage.getItem('@storage_Key_Historial')
          let historia = JSON.parse(histori)
         switch (versionBook) {
             case "Reina_Valera_1960":
                 let array = []
                 for (let i=0; i<historia.length; i ++){
                    let filtro = Reina.find(x => x._id===historia[i])
                    if(filtro===undefined){
                     //no hacer nada
                    }else{
                        array.push(filtro)
                    }
                 }
                 setHistory(array)
                 break;
             case "Biblia_del_oso_1569":
                let array2 = []
                for (let i=0; i<historia.length; i ++){
                   let filtro = Oso.find(x => x._id===historia[i])
                   if(filtro===undefined){
                    //no hacer nada
                   }else{
                       array.push(filtro)
                   }
                }
                setHistory(array2)
                    break;    
        
         }
         if(history===null){
            setEstado(false)
         }else{
             //no hacer nada
         }
        } catch (error) {
          //error
        }
      }


    return (
      <View style={styles.container}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {estado ? (
            <View
              style={[
                styles.buton,
                { flexDirection: "row", backgroundColor: colors.header },
              ]}
            >
              <Text style={[styles.title, { color: colors.text }]}>
                0 Registros
              </Text>
            </View>
          ) : (
            <View
              style={[
                styles.buton,
                { flexDirection: "row", backgroundColor: colors.header },
              ]}
            >
              <Text style={[styles.title, { color: colors.text }]}>
                {" "}
                {history.length} Registros
              </Text>
            </View>
          )}

          <View
            style={[
              styles.buton,
              { flexDirection: "row", backgroundColor: colors.text },
            ]}
          >
            <TouchableOpacity
              onPress={ayudaDelete}
              onLongPress={deleteHistorial}
            >
              <Ionicons name="trash-outline" size={20} color={colors.header} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={ayudaDelete}
              onLongPress={deleteHistorial}
            >
              <Text style={[styles.title, { color: colors.header }]}>
                {" "}
                Borrar
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {msj ? (
          <Text
            style={{
              color: colors.text,
              textAlign: "center",
              marginVertical: 12,
              fontFamily: "sans-serif-medium",
            }}
          >
            Historial
          </Text>
        ) : (
          <Text
            style={{
              color: colors.textNumber,
              textAlign: "center",
              marginVertical: 12,
              fontFamily: "sans-serif-medium",
            }}
          >
            Presione por 2 segundos para borrar
          </Text>
        )}

        <View>
          {history && (
            <ScrollView>
              <View>
                {history.map((item, idx) => (
                  <View key={idx}>
                    <TouchableOpacity onPress={() => sendingBiblia(item._id)}>
                      <Text
                        style={[
                          styles.texthistorial,
                          {
                            color: colors.text,
                            backgroundColor: colors.header,
                            fontSize: 16,
                          },
                        ]}
                      >
                        {item.charter}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
 container:{
     flex: 1,
     paddingHorizontal: 10,
     paddingVertical: 14,
     marginBottom: 86
 },
 title:{
    fontFamily: 'sans-serif-medium',
    fontSize: 14,
 },
 texthistorial:{
    fontFamily: 'sans-serif-condensed',
    textAlign: "center",
    paddingVertical: 12,
    marginHorizontal: 50,
    marginVertical: 4,
    borderRadius: 8
 },
 buton:{
     width: "48%",
     borderRadius: 8,
     paddingHorizontal: 10,
     paddingVertical: 10,
     justifyContent: "center",   
 }
})

export default Historial;
