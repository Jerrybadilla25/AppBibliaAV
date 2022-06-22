import React, {useContext, useState} from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { UserContext } from "../Component/Context/contexUser";


const Notas = () => {
    const { colors } = useTheme(); //en uso
    const { fontZize, setfontZize } = useContext(UserContext); //en uso
    const [estadoNewNota, setEstadoNewNota]=useState(false) // boton new Nota
    const [controlRender, setControlRender]=useState(false) //use efect renderiza al cambiar
    const [getNotas, setGetNOtas]=useState(null) //array de notas
    //const [addmas, setAddMas]=useState(false)
    const [addID, setAddID]=useState(null)

    const [newNota, setNewNota]=useState({
        title: "",
        subtitle: "",
        descripcion: ""
    })

    const generateUUID =()=>{
        var d = new Date().getTime();
        var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
      }

    React.useEffect(() => {
        obtNotas()
    }, [controlRender]);

    const obtNotas = async()=>{
        let arrayNotas = await AsyncStorage.getItem("@storage_Key_Notas")
        let jsonArrayNotas = JSON.parse(arrayNotas)
        if(jsonArrayNotas===null){
            // no hacer nada
        }else{
            setGetNOtas(jsonArrayNotas)
            setEstadoNewNota(true)
        }
    }



    const deleteNota = async (id)=>{
        let notas = getNotas
        let idx = notas.findIndex(x => x._id===id)
        notas.splice(idx, 1)
        await AsyncStorage.setItem("@storage_Key_Notas", JSON.stringify(notas))
        setControlRender(!controlRender)
    }

    const editNota = (id)=>{
      let notas = getNotas
      let idx = notas.findIndex(x => x._id===id)
      let nota = notas[idx]
      setNewNota({
        _id:nota._id,
        descripcion: nota.descripcion,
        subtitle: nota.subtitle,
        title: nota.title
      })
      setEstadoNewNota(!estadoNewNota)
    }



    const threePoind = (id)=>{
        setAddID(`${id}`)
    }

    const threePoind2 = ()=>{
      setAddID(null)
    }
    
    const addNewNota = ()=>{
        setEstadoNewNota(!estadoNewNota)
    }

    const saveNota = async ()=>{
      if(newNota._id){
        let notas = await AsyncStorage.getItem("@storage_Key_Notas");
        let jsonNota = JSON.parse(notas);
        let idx = jsonNota.findIndex(x => x._id === newNota._id)
        jsonNota.splice(idx, 1, newNota)
        await AsyncStorage.setItem("@storage_Key_Notas", JSON.stringify(jsonNota))
        setControlRender(!controlRender)
        setNewNota({title: "", subtitle: "", descripcion: "" })
        setAddID(null)
      }else{
          let notas = await AsyncStorage.getItem("@storage_Key_Notas");
          let jsonNota = JSON.parse(notas);
          if(jsonNota===null){
          let Notas = []
          let a = generateUUID()
          let id ={_id: a}
          let object1 = Object.assign(id, newNota)
          Notas.push(object1)
          await AsyncStorage.setItem("@storage_Key_Notas", JSON.stringify(Notas))
          setControlRender(!controlRender)
          setNewNota({title: "", subtitle: "", descripcion: "" })
          }else{
          let b = generateUUID()
          let id ={_id: b}
          let object2 = Object.assign(id, newNota)
          jsonNota.unshift(object2)
          await AsyncStorage.setItem("@storage_Key_Notas", JSON.stringify(jsonNota))
          setControlRender(!controlRender)
          setNewNota({title: "", subtitle: "", descripcion: "" })
        }
      }
    }


    const inputChangeTitle = (val) => {
        setNewNota({
            ...newNota, title: val
        })
      };
    
      
      const inputChangeSubtitle = (val) => {
        setNewNota({
            ...newNota, subtitle: val
        })
      };
      
      const inputChangeDescription = (val) => {
        setNewNota({
            ...newNota, descripcion: val
        })
      }; 


    
    return (
      <View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              color: colors.text,
              marginLeft: 20,
              marginVertical: 20,
              fontSize: 18,
              fontFamily: "sans-serif-medium",
            }}
          >
            Notas
          </Text>

          <TouchableOpacity onPress={addNewNota}>
            <Text
              style={{
                color: colors.textNumber,
                marginRight: 20,
                marginVertical: 20,
              }}
            >
              Nueva nota
            </Text>
          </TouchableOpacity>
        </View>

        {estadoNewNota === false ? (
          <View
            style={[styles.boxContainer, { borderBottomColor: colors.text }]}
          >
            <TextInput
              onChangeText={(val) => inputChangeTitle(val)}
              style={{ color: colors.text, marginBottom: 5 }}
              placeholder="Titulo"
              placeholderTextColor={colors.inputHolder}
              defaultValue={newNota.title}
              //multiline={true}
              //numberOfLines={10}
              //textAlignVertical="top"
            />

            <TextInput
              onChangeText={(val) => inputChangeSubtitle(val)}
              style={{ color: colors.text, marginBottom: 5 }}
              placeholder="Subtitulo"
              placeholderTextColor={colors.inputHolder}
              defaultValue={newNota.subtitle}
              //multiline={true}
              //numberOfLines={10}
              //textAlignVertical="top"
            />
            <TextInput
              onChangeText={(val) => inputChangeDescription(val)}
              style={{ color: colors.text, marginBottom: 5 }}
              placeholder="Descripcion"
              placeholderTextColor={colors.inputHolder}
              defaultValue={newNota.descripcion}
              multiline={true}
              numberOfLines={5}
              textAlignVertical="top"
            />
            <TouchableOpacity onPress={saveNota}>
              <Text
                style={[
                  styles.butonEdit,
                  { backgroundColor: colors.boxTema, color: colors.text },
                ]}
              >
                Guardar
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ScrollView style={{ marginBottom: 70 }}>
            {getNotas !== null && (
              <>
                {getNotas.map((x) => (
                  <View
                    key={x._id}
                    style={[styles.boxNota, { backgroundColor: colors.header }]}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          color: colors.textNumber,
                          fontFamily: 'sans-serif-medium',
                          paddingBottom: 10,
                          fontSize: fontZize.fontsubtitle-4,
                          width: "90%"
                        }}
                      >
                        {x.title}
                      </Text>

                      {addID===x._id ? (
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            position: "absolute",
                            top: 0,
                            right:0,
                            backgroundColor: colors.background,
                            paddingHorizontal: 20,
                            paddingVertical:10,
                            borderRadius:10
                          }}
                        >
                          <TouchableOpacity onPress={()=>editNota(x._id)}>
                            <Ionicons
                              name="md-pencil"
                              size={16}
                              color={colors.text}
                              style={{ paddingRight:40 }}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity onPress={()=>deleteNota(x._id)}>
                            <Ionicons
                              name="trash-outline"
                              size={16}
                              color={colors.text}
                              style={{ paddingRight:40 }}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity onPress={threePoind2}>
                            <Ionicons
                              name="chevron-up"
                              size={16}
                              color={colors.text}
                              style={{ paddingRight:2 }}
                            />
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <TouchableOpacity onPress={() => threePoind(x._id)}>
                          <Ionicons
                            name="ellipsis-horizontal-sharp"
                            size={24}
                            color={colors.text}
                          />
                        </TouchableOpacity>
                      )}
                    </View>

                    {
                      x.subtitle===""?
                      <></>
                    :
                    <Text
                      style={{
                        color: colors.text,
                        fontFamily: 'sans-serif-thin',
                        paddingBottom: 8,
                        fontSize: fontZize.fontsubtitle-6,
                      }}
                    >
                      {x.subtitle}
                    </Text>
                    }

                    <Text
                      style={{
                        color: colors.text,
                        paddingBottom: 8,
                        fontSize: fontZize.fonttext-2,
                      }}
                    >
                      {x.descripcion}
                    </Text>
                  </View>
                ))}
              </>
            )}
          </ScrollView>
        )}
      </View>
    );
}

const styles = StyleSheet.create({
    textNewNota:{
        paddingHorizontal: 30,
        paddingVertical: 20
    },
    boxContainer:{
        //marginHorizontal: 2,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderWidth: 1
    },
    butonEdit: {
        paddingVertical: 6, 
        paddingHorizontal: 10,
        width: 100, 
        borderRadius: 12, 
        textAlign: "center"
      },
      boxNota:{
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginVertical: 5,
        marginHorizontal: 8
        
      },
      
})

export default Notas;