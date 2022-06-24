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

const Notas = ({route, navigation}) => {
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
    receiveNota(route.params._id)
    //obtNotas();
  }, []);



  const receiveNota = async (id)=>{
    let arrayNotas = await AsyncStorage.getItem("@storage_Key_Notas");
    let jsonArrayNotas = JSON.parse(arrayNotas);
    if(jsonArrayNotas===null){
        setNewNota({ title: "", subtitle: "", descripcion: "", _id: id })
    }else{
        let oneNota = jsonArrayNotas.find((x) => x._id === id);
        if(oneNota===undefined){
            setNewNota({ title: "", subtitle: "", descripcion: "", _id: id })
        }else{
            setNewNota(oneNota)  
        }   
    }
  }

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


  const deleteNota = async () => {
    let notas = newNota;
    let Notas = await AsyncStorage.getItem("@storage_Key_Notas");
    let jsonNota = JSON.parse(Notas);
    let idx = jsonNota.findIndex((x) => x._id === notas._id)
    jsonNota.splice(idx, 1);
    await AsyncStorage.setItem("@storage_Key_Notas", JSON.stringify(jsonNota));
    setNewNota({ title: "", subtitle: "", descripcion: "", _id: null });
    navigation.navigate("Notas")
  };



  const threePoind = () => {
    setAddID(!addID);
  };

  const threePoind2 = () => {
    setAddID(!addID);
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

  if(newNota){
    return (
        <View style={[styles.container, {backgroundColor: colors.background}]}>
          
          <View style={{ paddingHorizontal: 4, paddingHorizontal:20, paddingVertical: 20 }}>
          <ScrollView>
          
            <TextInput
              onChangeText={(val) => inputChangeTitle(val)}
              style={{
                color: colors.textNumber,
                marginBottom: 5,
                fontSize: fontZize.fonttitle-3,
                fontFamily: "sans-serif-medium",
                width: "80%",
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
                fontSize: fontZize.fontsubtitle-4,
                fontFamily: "sans-serif-thin",
              }}
              placeholder="Subtitulo"
              placeholderTextColor={colors.inputHolder}
              defaultValue={newNota.subtitle}
              multiline={true}
              numberOfLines={2}
              //textAlignVertical="top"
            />
            <TextInput
              onChangeText={(val) => inputChangeDescription(val)}
              style={{
                color: colors.text,
                marginBottom: 5,
                marginTop: 8,
                fontSize: fontZize.fonttext-3,
                fontFamily: "sans-serif-medium",
              }}
              placeholder="Descripcion"
              placeholderTextColor={colors.inputHolder}
              defaultValue={newNota.descripcion}
              multiline={true}
              numberOfLines={5}
              //textAlignVertical="top"
            />
          
          </ScrollView>
          </View>
  
          <View
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              flexDirection: "row",
              justifyContent: "flex-end",
              paddingVertical: 10,
              paddingHorizontal: 20,
            }}
          >
            <TouchableOpacity onPress={threePoind}>
              <Ionicons
                name="ellipsis-horizontal-sharp"
                size={20}
                color={colors.text}
                //style={{padding: 2}}
              />
            </TouchableOpacity>
          </View>
  
  
          
          {addID === true && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                position: "absolute",
                top: 20,
                right: 0,
                backgroundColor: colors.background,
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

  return (<Text>Cargando</Text>)
    
  
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
  },
});

export default Notas;