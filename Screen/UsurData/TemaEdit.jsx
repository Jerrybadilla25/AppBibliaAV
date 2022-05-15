import React, {useEffect, useState} from "react";
import { View, StyleSheet, Modal, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

const TemaEdit = ({temas, setTemas, colors}) => {
    const [select, setSelect]=useState(true)
    const [temaSelect, settemaSelect]=useState(null)
    
    let data = ""
    let descripcion = ""


    const selectTema = id=>{
        setSelect(false)
        let dataFilter = temas.find(x => x._id === id)
        settemaSelect(dataFilter)  
    }

    const saveDataEdit = async () => {
      try {
          let data1 = valData()
          let data2 = valDescripcion()
          temaSelect.tema = data1;
          temaSelect.description = data2;
          let datos = await AsyncStorage.getItem("@storage_Key_Temas");
          let dataJson = JSON.parse(datos);
          let idx = dataJson.findIndex((x) => x._id === temaSelect._id);
          dataJson.splice(idx, 1, temaSelect);
          await AsyncStorage.setItem("@storage_Key_Temas", JSON.stringify(dataJson));
          setSelect(true);   
      } catch (error) {}
    };

    const valData = ()=>{
        if(data.length>0){
            return data
        }else{
            return temaSelect.tema
        }
    }

    const valDescripcion = ()=>{
        if(descripcion.length>0){
            return descripcion
        }else{
            return temaSelect.description
        }

    }



    const textInputChangeData = (val) => {
        data = val;
      };
    
      const textInputChangeDesc = (val) => {
        descripcion = val;
      };

      

    

    


    return (
        <View>
            {
                select 
                ?
                <View style={styles.homeLike}>
            <Text style={[styles.title, {color: colors.text}]}>Seleccione un tema para editar</Text>
            <ScrollView>
              {temas && (
                <View >
                  {temas.map((x) => (
                    <TouchableOpacity
                      key={x._id}
                      style={[styles.Item, { backgroundColor: colors.header }]}
                      onPress={()=>selectTema(x._id)} 
                    >
                      <Text
                        key={x._id}
                        style={[styles.textCharter, { color: colors.text,  }]}
                      >
                        {x.tema}
                      </Text>
                      <Text
                        style={[
                          styles.textDetalles,
                          { color: colors.text },
                        ]}
                      >
                        {x.description}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </ScrollView>
          </View>
          :
          <View>
              {
                  temaSelect && 
                  <View style={styles.row}>
                      <Text  style={[styles.title, {color: colors.text}]}>Sobreescriba para editar</Text>
                      <TextInput
                      onChangeText={(val) => textInputChangeData(val)}
                       style={[
                         styles.textInput,
                         { backgroundColor: colors.header, color: colors.text },
                       ]}
                       editable={true}
                       autoFocus={true}
                       defaultValue={temaSelect.tema}
                       placeholderTextColor={colors.inputHolder}
                       placeholder="El tema es requerido"
                       
                      />

                      <TextInput
                      onChangeText={(val) => textInputChangeDesc(val)}
                      style={[
                        styles.textInput,
                        { backgroundColor: colors.header, color: colors.text },
                      ]}
                      editable={true}
                      defaultValue={temaSelect.description}
                      placeholderTextColor={colors.inputHolder}
                      placeholder="Descripcion..."
                      />

                      <Text 
                      onPress={saveDataEdit}
                      style={[styles.button, {backgroundColor: colors.text, color: colors.background}]}>
                          Guardar
                      </Text>
                  </View>
              }
          </View>
            }

        </View>
        
    );
};

const styles = StyleSheet.create({
    homeLike: {
        paddingBottom: 40
      },
    Item: {
      paddingHorizontal: 20,
      paddingVertical: 8,
      marginVertical: 4,
      marginHorizontal: 8,
      borderRadius: 10,
    },
    row:{
      paddingVertical: 20,
      paddingHorizontal: 10,
      marginBottom: 24
    },
    textCharter: {
      fontSize: 18,
      fontWeight: "100",
      fontFamily: 'sans-serif-medium'
    },
    textDetalles: {
      fontSize: 14,
      fontFamily: 'sans-serif-condensed',
      fontWeight: "100"
    },
    title: {
      fontSize: 16,
      padding: 20,
      textAlign: "center"
    },
    textInput: {
      borderRadius: 8,
      padding: 10,
      marginVertical: 2
    },
    boton: {
      borderRadius: 8,
      padding: 10,
      fontFamily: 'sans-serif',
      fontSize: 16
    },
    button: {
      borderRadius: 8,
      padding: 10,
      marginVertical: 15,
      textAlign: "center"
    },
    newtema: {
      padding: 7,
      marginHorizontal: 30,
      marginVertical: 15,
      fontFamily: 'Roboto'
    },
  });




export default TemaEdit;
