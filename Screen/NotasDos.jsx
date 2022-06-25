import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { UserContext } from "../Component/Context/contexUser";

const Notas = ({ navigation }) => {
  const { colors } = useTheme(); //en uso
  const { fontZize, setfontZize } = useContext(UserContext); //en uso
  const [controlRender, setControlRender] = useState(false); //use efect renderiza al cambiar
  const [getNotas, setGetNOtas] = useState(null); //array de notas
  const [renderView, setRenderView] = useState(true); // true render lista de notas // false visualiza unica nota

  
  

  const generateUUID = () => {
    var d = new Date().getTime();
    var uuid = "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
    return uuid;
  };

  
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setControlRender(!controlRender)
      // Call any action
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);



  React.useEffect(() => {
    obtNotas();
  }, [controlRender]);

  const viewAllNote = (id) => {
    setControlRender(!renderView)
    navigation.navigate("Nota", {_id: id})
  };


  const addNewNota = () => {
    let id = generateUUID()
    setControlRender(!renderView)
    navigation.navigate("Nota", {_id: id})
  };

  const obtNotas = async () => {
    let arrayNotas = await AsyncStorage.getItem("@storage_Key_Notas");
    let jsonArrayNotas = JSON.parse(arrayNotas);
    if (jsonArrayNotas === null) {
      // no hacer nada
    } else {
      //await AsyncStorage.removeItem("@storage_Key_Notas")
      setGetNOtas(jsonArrayNotas);
    }
  };


  //render todas las notas
  
    return (
      <View style={{ flex: 1, paddingBottom: 8, paddingTop: 15, backgroundColor: colors.background }}>
        
          <ScrollView style={{ marginBottom: 8 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                flexWrap: "wrap",
              }}
            >
              {getNotas !== null && (
                <>
                  {getNotas.map((x) => (
                    <View
                      key={x._id}
                      style={[
                        styles.boxNota,
                        { borderColor: colors.text },
                      ]}
                    >
                      <TouchableOpacity onPress={() => viewAllNote(x._id)}>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text
                            style={{
                              color: colors.textNumber,
                              fontFamily: "sans-serif-medium",
                              paddingBottom: 5,
                              fontSize: fontZize.fontsubtitle - 4,
                              width: "90%",
                            }}
                          >
                            {x.title}
                          </Text>
                        </View>

                        {x.subtitle === "" ? (
                          <></>
                        ) : (
                          <Text
                            style={{
                              color: colors.text,
                              fontFamily: "sans-serif-thin",
                              paddingBottom: 10,
                              fontSize: fontZize.fontsubtitle - 7,
                            }}
                          >
                            {x.subtitle}
                          </Text>
                        )}

                        <View style={{maxHeight: 125, overflow: "hidden"}}>
                           <Text
                          style={{
                            color: colors.text,
                            paddingBottom: 12,
                            fontSize: fontZize.fonttext - 3,
                            
                          }}
                        >
                          {x.descripcion}
                        </Text> 
                        </View>

                        
                      </TouchableOpacity>
                    </View>
                  ))}
                </>
              )}
            </View>
          </ScrollView>
      

        <View
          style={{
            position: "absolute",
            bottom: 10,
            right: 20,
            paddingVertical: 6,
            paddingHorizontal: 30,
            backgroundColor: colors.background,
            borderRadius: 50,
            borderColor: colors.text,
            borderWidth: 3
          }}
        >
          <TouchableOpacity onPress={addNewNota}>
            <Ionicons name="add-circle-outline" size={40} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
    );
  

  
    
};

const styles = StyleSheet.create({
  textNewNota: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  boxContainer: {

    //marginHorizontal: 2,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
  },
  butonEdit: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    width: 100,
    borderRadius: 12,
    textAlign: "center",
  },
  boxNota: {
    width: "48%",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: "1%",
    marginHorizontal: "1%",
  },
  container: {
    flex: 1,
    padding: 20,
  },
});

export default Notas;

/*
linea 251
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
*/
