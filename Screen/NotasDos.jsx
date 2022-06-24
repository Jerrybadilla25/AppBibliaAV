import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { UserContext } from "../Component/Context/contexUser";

const Notas = () => {
  const { colors } = useTheme(); //en uso
  const { fontZize, setfontZize } = useContext(UserContext); //en uso
  const [estadoNewNota, setEstadoNewNota] = useState(true); // boton new Nota
  const [controlRender, setControlRender] = useState(false); //use efect renderiza al cambiar
  const [getNotas, setGetNOtas] = useState(null); //array de notas
  const [renderView, setRenderView] = useState(true); // true render lista de notas // false visualiza unica nota
  const [addID, setAddID] = useState(false);

  const [newNota, setNewNota] = useState({
    title: "",
    subtitle: "",
    descripcion: "",
    _id: null,
  });

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
    obtNotas();
  }, [controlRender]);

  const viewAllNote = (id) => {
    let oneNota = getNotas.find((x) => x._id === id);
    setNewNota(oneNota);
    setRenderView(false);
  };

  const autoSaveNota = async () => {
    //await AsyncStorage.removeItem("@storage_Key_Notas")

    let notas = await AsyncStorage.getItem("@storage_Key_Notas");
    let jsonNota = JSON.parse(notas);
    if (jsonNota === null) {
      let arrayN = [];
      arrayN.push(newNota);

      await AsyncStorage.setItem("@storage_Key_Notas", JSON.stringify(arrayN));
    } else {
      let idx = jsonNota.findIndex((x) => x._id === newNota._id);
      if (idx >= 0) {
        jsonNota.splice(idx, 1, newNota);

        await AsyncStorage.setItem(
          "@storage_Key_Notas",
          JSON.stringify(jsonNota)
        );
      } else {
        jsonNota.unshift(newNota);
        await AsyncStorage.setItem(
          "@storage_Key_Notas",
          JSON.stringify(jsonNota)
        );
      }
    }
  };

  const obtNotas = async () => {
    let arrayNotas = await AsyncStorage.getItem("@storage_Key_Notas");
    let jsonArrayNotas = JSON.parse(arrayNotas);
    if (jsonArrayNotas === null) {
      // no hacer nada
    } else {
      setGetNOtas(jsonArrayNotas);
      //setEstadoNewNota(true)
    }
  };

  const deleteNota = async () => {
    let notas = getNotas;
    let idx = notas.findIndex((x) => x._id === newNota._id);
    notas.splice(idx, 1);
    await AsyncStorage.setItem("@storage_Key_Notas", JSON.stringify(notas));
    setRenderView(true);
    setControlRender(!controlRender);
    setNewNota({ title: "", subtitle: "", descripcion: "", _id: null });
  };

  const editNota = (id) => {
    let notas = getNotas;
    let idx = notas.findIndex((x) => x._id === id);
    let nota = notas[idx];
    setNewNota({
      _id: nota._id,
      descripcion: nota.descripcion,
      subtitle: nota.subtitle,
      title: nota.title,
    });
    setEstadoNewNota(!estadoNewNota);
  };

  const regresarNotas = () => {
    setAddID(false);
    setNewNota({ title: "", subtitle: "", descripcion: "", _id: null });
    setRenderView(true);
    setControlRender(!controlRender);
  };

  const threePoind = () => {
    setAddID(!addID);
  };

  const threePoind2 = () => {
    setAddID(!addID);
  };

  const addNewNota = () => {
    setAddID(false);
    setNewNota({ title: "", subtitle: "", descripcion: "", _id: null });
    setNewNota({
      ...newNota,
      _id: generateUUID(),
    });
    setRenderView(false);
    //setEstadoNewNota(!estadoNewNota)
  };

  const saveNota = async () => {
    if (newNota._id) {
      let notas = await AsyncStorage.getItem("@storage_Key_Notas");
      let jsonNota = JSON.parse(notas);
      let idx = jsonNota.findIndex((x) => x._id === newNota._id);
      jsonNota.splice(idx, 1, newNota);
      await AsyncStorage.setItem(
        "@storage_Key_Notas",
        JSON.stringify(jsonNota)
      );
      setControlRender(!controlRender);
      setNewNota({ title: "", subtitle: "", descripcion: "" });
      setAddID(null);
    } else {
      let notas = await AsyncStorage.getItem("@storage_Key_Notas");
      let jsonNota = JSON.parse(notas);
      if (jsonNota === null) {
        let Notas = [];
        let a = generateUUID();
        let id = { _id: a };
        let object1 = Object.assign(id, newNota);
        Notas.push(object1);
        await AsyncStorage.setItem("@storage_Key_Notas", JSON.stringify(Notas));
        setControlRender(!controlRender);
        setNewNota({ title: "", subtitle: "", descripcion: "" });
      } else {
        let b = generateUUID();
        let id = { _id: b };
        let object2 = Object.assign(id, newNota);
        jsonNota.unshift(object2);
        await AsyncStorage.setItem(
          "@storage_Key_Notas",
          JSON.stringify(jsonNota)
        );
        setControlRender(!controlRender);
        setNewNota({ title: "", subtitle: "", descripcion: "" });
      }
    }
  };

  const inputChangeTitle = (val) => {
    setNewNota({
      ...newNota,
      title: val,
    });
    autoSaveNota();
  };

  const inputChangeSubtitle = (val) => {
    setNewNota({
      ...newNota,
      subtitle: val,
    });
    autoSaveNota();
  };

  const inputChangeDescription = (val) => {
    setNewNota({
      ...newNota,
      descripcion: val,
    });
    autoSaveNota();
  };


  //render uno sola nota
  if (renderView === false) {
    return (
      <View style={[styles.container, {backgroundColor: colors.header}]}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            paddingVertical: 10,
            paddingHorizontal: 20,
          }}
        >
          <TouchableOpacity onPress={threePoind}>
            <Ionicons
              name="ellipsis-horizontal-sharp"
              size={24}
              color={colors.text}
              //style={{padding: 2}}
            />
          </TouchableOpacity>
        </View>
        <View style={{ paddingHorizontal: 4 }}>
          <TextInput
            onChangeText={(val) => inputChangeTitle(val)}
            style={{
              color: colors.textNumber,
              marginBottom: 5,
              fontSize: fontZize.fonttitle,
              fontFamily: "sans-serif-medium",
            }}
            placeholder="Titulo"
            placeholderTextColor={colors.inputHolder}
            defaultValue={newNota.title}
            multiline={true}
            //numberOfLines={10}
            //textAlignVertical="top"
          />
          <TextInput
            onChangeText={(val) => inputChangeSubtitle(val)}
            style={{
              color: colors.text,
              marginBottom: 5,
              fontSize: fontZize.fontsubtitle,
              fontFamily: "sans-serif-thin",
            }}
            placeholder="Subtitulo"
            placeholderTextColor={colors.inputHolder}
            defaultValue={newNota.subtitle}
            multiline={true}
            //numberOfLines={10}
            //textAlignVertical="top"
          />
          <TextInput
            onChangeText={(val) => inputChangeDescription(val)}
            style={{
              color: colors.text,
              marginBottom: 5,
              marginTop: 8,
              fontSize: fontZize.fonttext,
              fontFamily: "sans-serif-medium",
            }}
            placeholder="Descripcion"
            placeholderTextColor={colors.inputHolder}
            defaultValue={newNota.descripcion}
            multiline={true}
            numberOfLines={5}
            //textAlignVertical="top"
          />
        </View>

        <View
          style={{
            position: "absolute",
            bottom: 20,
            left: 0,
            //backgroundColor: colors.header,
            paddingHorizontal: 40,
            paddingVertical: 10,
            borderRadius: 10,
          }}
        >
          <TouchableOpacity
            onPress={regresarNotas}
            style={{ flexDirection: "row" }}
          >
            <Ionicons
              name="arrow-back-outline"
              size={24}
              color={colors.textNumber}
            />
            <Text
              style={{
                color: colors.textNumber,
                paddingLeft: 10,
                fontSize: 18,
                paddingBottom: 4,
              }}
            >
              Regresar
            </Text>
          </TouchableOpacity>
        </View>

        {addID === true && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              position: "absolute",
              top: 20,
              right: 30,
              backgroundColor: colors.header,
              paddingHorizontal: 40,
              paddingVertical: 10,
              borderRadius: 10,
            }}
          >
            <TouchableOpacity onPress={deleteNota}>
              <Ionicons
                name="trash-outline"
                size={20}
                color={colors.text}
                style={{ paddingRight: 40 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={threePoind2}>
              <Ionicons
                name="chevron-up"
                size={20}
                color={colors.text}
                style={{ paddingRight: 2 }}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }

  //render todas las notas
  if (renderView === true) {
    return (
      <View style={{ flex: 1, paddingBottom: 8, paddingTop: 15, backgroundColor: colors.header }}>
        
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
  }
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
