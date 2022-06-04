import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  Share
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { UserContext } from "../Component/Context/contexUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from 'expo-status-bar';

//import * as Sharing from 'expo-sharing';

import Reina from "../Component/Biblias/ReinaValera/fullLibroReinaValera.json";
import Oso from "../Component/Biblias/Oso/fullLibroOso.json";

//componentes
import Loading from "../Component/Loading";
import Rewind from "../Component/boton/Rewind";
import Forward from "../Component/boton/Forward";
import Favorito from "../Component/boton/Favorito";
import Msj from "../Component/boton/Msj";


const Charter = ({ route }) => {
  const { fontZize, setfontZize, versionBook, setVersionBook } =
    useContext(UserContext); //en uso
  const { colors } = useTheme(); //en uso
  const [data, setData] = useState(null); //en uso
  const [modalVisible, setModalVisible] = useState(false);
  const [msj, setMsj] = useState(null);
  const [msjView, setMsjView] = useState(false);
  const [idVerse, setidVerse] = useState(null); // add versiculo seleccionado
  const [temas, setTemas] = useState([]);
  const [validateTema, setValidateTema] = useState(false);

  React.useEffect(() => {
    obtainCharte(route.params._id, route.params.version);
    obtainTemas();
    Historial(route.params._id)
  }, []);

  const Historial = async (id)=>{
    try {
      let historia = await AsyncStorage.getItem('@storage_Key_Historial')
      let historiaJson = JSON.parse(historia)
      if(historiaJson===null){
        let historial = []
        historial.unshift(id)
        await AsyncStorage.setItem('@storage_Key_Historial', JSON.stringify(historial))
      }else{
        if(historiaJson[0]===id){
          //no hacer nada
        }else{
          historiaJson.unshift(id)
          await AsyncStorage.setItem('@storage_Key_Historial', JSON.stringify(historiaJson))
        }
      }
    } catch (error) {
      //error
    }
  }

  const createTwoButtonAlert = (tema) =>
    Alert.alert("El versiculo ya pertenece al tema:", `${tema}`, [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);

  const obtainCharte = async (id, version) => {
    setData(null);
    setMsjView(false);
    setMsj(null);
    switch (version) {
      case "Reina_Valera_1960":
        let capitulo1 = Reina.find((x) => x._id === id);
        setData(capitulo1);
        break;
      case "Biblia_del_oso_1569":
        let capitulo2 = Oso.find((x) => x._id === id);
        setData(capitulo2);
        break;
    }
  };

  

  const getCharterRewinder = ({ variables }) => {
    setData(null);
    setMsjView(false);
    setMsj(null);
    let { _id, version } = variables;
    switch (version) {
      case "Reina_Valera_1960":
        let idx1 = Reina.findIndex((x) => x._id === _id);
        let newIdx1 = idx1 - 1;
        if (newIdx1 >= 0) {
          let newChacter1 = Reina[newIdx1];
          setData(newChacter1);
          Historial(newChacter1._id)
        } else {
          let newChacter1 = Reina[0];
          setData(newChacter1);
          Historial(newChacter1._id)
        }
        break;
      case "Biblia_del_oso_1569":
        let idx2 = Oso.findIndex((x) => x._id === _id);
        let newIdx2 = idx2 - 1;
        if (newIdx2 >= 0) {
          let newChacter2 = Oso[newIdx2];
          setData(newChacter2);
        } else {
          let newChacter2 = Oso[0];
          setData(newChacter2);
        }
        break;
    }
  };

  const getCharterForwar = ({ variables }) => {
    setData(null);
    setMsjView(false);
    setMsj(null);
    let { _id, version } = variables;
    switch (version) {
      case "Reina_Valera_1960":
        let idx1 = Reina.findIndex((x) => x._id === _id);
        let newIdx1 = idx1 + 1;
        if (newIdx1 <= 1188) {
          let newChacter1 = Reina[newIdx1];
          setData(newChacter1);
          Historial(newChacter1._id)
        } else {
          let newChacter1 = Reina[1188];
          setData(newChacter1);
          Historial(newChacter1._id)
        }
        break;
      case "Biblia_del_oso_1569":
        let idx2 = Oso.findIndex((x) => x._id === _id);
        let newIdx2 = idx2 + 1;
        if (newIdx2 <= 1188) {
          let newChacter2 = Oso[newIdx2];
          setData(newChacter2);
        } else {
          let newChacter2 = Oso[1188];
          setData(newChacter2);
        }
        break;
    }
  };

  const addFavorito = async ({ variables }) => {
    let ID = variables._id;
    let fav = await AsyncStorage.getItem("@storage_Key_Favorito");
    let FavJson = JSON.parse(fav);
    let filter1 = FavJson.find((x) => x._id === ID);
    if (filter1 === undefined) {
      FavJson.push(variables);
      await AsyncStorage.setItem(
        "@storage_Key_Favorito",
        JSON.stringify(FavJson)
      );
      setMsj("Capitulo agregado a favoritos");
      setMsjView(true);
    } else {
      setMsj("Este capitulo ya esta en favoritos");
      setMsjView(true);
    }
  };

  //seleccionar id versiculo
  const getIDverse = ({ variables }) => {
    setidVerse(variables);
    setModalVisible(!modalVisible);
  };

  //obtener los temas
  const obtainTemas = async () => {
    try {
      let fulltemas = await AsyncStorage.getItem("@storage_Key_Temas");
      let arrayTemasFull = JSON.parse(fulltemas);
      setTemas(arrayTemasFull);
      if (arrayTemasFull.length >= 1) {
        setValidateTema(false);
      } else {
        setValidateTema(true);
      }
    } catch (error) {}
  };

  //add versiculo al tema
  const addVerseTema = async (id) => {
    try {
      let temaSelect = temas.find((x) => x._id === id);
      let validar = temaSelect.addVerses.find((x) => x._id === idVerse._id);
      if (validar) {
        setModalVisible(!modalVisible);
        createTwoButtonAlert(temaSelect.tema);
        //console.log("el versiculo ya existe")
      } else {
        temaSelect.addVerses.push(idVerse);
        let idx = temas.findIndex((x) => x._id === id);
        temas.splice(idx, 1, temaSelect);
        await AsyncStorage.setItem("@storage_Key_Temas", JSON.stringify(temas));
        setModalVisible(!modalVisible);
      }
    } catch (error) {}
  };


  const onShared = async ()=>{
    let httpBAV = "https://play.google.com/store/apps/details?id=com.alientodevida.BibliaAV"
    let titulo = idVerse.originCharter.toUpperCase()
    let mensage =`
    ${titulo}

    ${idVerse.versiculo}

    ${httpBAV}
    `
    try {
      const result = await Share.share({
        message: 'BibliaAV',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          Share.share({
            title: titulo,
            message: mensage
          })
        } else {
          // shared
          Share.share({
            title: titulo,
            message: mensage
          })
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }

  // fin de lo nuevo

  if (!data) return <Loading />;
  //if (error) return `Error! ${error.message}`;

  if (data)
    return (
      <Preview
        colors={colors}
        data={data}
        getCharterRewinder={getCharterRewinder}
        getCharterForwar={getCharterForwar}
        fontZize={fontZize}
        addFavorito={addFavorito}
        msj={msj}
        msjView={msjView}
        getIDverse={getIDverse}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        temas={temas}
        addVerseTema={addVerseTema}
        validateTema={validateTema}
        setData={setData}
        onShared={onShared}
        idVerse={idVerse}
      ></Preview>
    );

  return <Text></Text>;
};

const Preview = ({
  data,
  colors,
  getCharterRewinder,
  getCharterForwar,
  fontZize,
  addFavorito,
  msj,
  msjView,
  getIDverse,
  setModalVisible,
  modalVisible,
  temas,
  addVerseTema,
  validateTema,
  setData,
  onShared,
  idVerse
}) => (
  <View style={[styles.container, { backgroundColor: colors.backgroundColor }]}>

    <ScrollView >
      <View style={styles.rowFlex}>
        <Rewind
          setData={setData}
          data={data}
          colors={colors}
          getCharterRewinder={getCharterRewinder}
        />
        <Text
          style={[
            styles.title,
            {
              color: colors.textNumber,
              fontSize: fontZize.fonttitle,
              fontFamily: 'sans-serif-thin',
              fontWeight: "bold"
            },
          ]}
        >
          {data.charter}
        </Text>
        <Forward
          data={data}
          colors={colors}
          getCharterForwar={getCharterForwar}
        />
      </View>

      {data.verses && (
        <View>
          {data.verses.map((item) => (
            <TouchableOpacity
              key={item._id}
              onLongPress={() =>
                getIDverse({
                  variables: {
                    _id: item._id,
                    numero: item.numero,
                    versiculo: item.versiculo,
                    originCharter: item.originCharter,
                    version: item.version,
                  },
                })
              }
            >
              <View>
                {/* 
                {
                  item.title && 
                  <Text style={{ color: colors.text, textAlign: "center", paddingBottom: 16, fontFamily: 'sans-serif-medium'  }}>
                  {item.title}
                </Text>
                }
                */}

                <View style={[styles.row, { paddingBottom: 16 }]}>
                  <Text
                    style={[
                      styles.numero,
                      { color: colors.textNumber, fontSize: fontZize.fonttext },
                    ]}
                  >
                    {item.numero} <Text></Text>
                    <Text
                      style={{
                        color: colors.text,
                        fontSize: fontZize.fonttext,
                      }}
                    >
                      {item.versiculo}
                    </Text>
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}

          {msjView ? (
            <Msj msj={msj} colors={colors} />
          ) : (
            <Favorito colors={colors} data={data} addFavorito={addFavorito} />
          )}
        </View>
      )}

      <View
        style={[styles.rowFlex, {  }]}
      >
        
        <View style={{ flexDirection: "column" }}>
          <Text
            style={[
              styles.title,
              { color: colors.text, fontSize: 16, textAlign: "center" },
            ]}
          >
            {data.testament}
          </Text>
          <Text
            style={{
              textAlign: "center",
              color: colors.textNumber,
              fontSize: 10,
              fontFamily: "monospace",
            }}
          >
            {data.version}
          </Text>
        </View>
       
        
      </View>
    </ScrollView>

   
    
      <PreviewModal
      setModalVisible={setModalVisible}
      modalVisible={modalVisible}
      colors={colors}
      temas={temas}
      addVerseTema={addVerseTema}
      validateTema={validateTema}
      onShared={onShared}
      idVerse
    />
          
    

    
  </View>
);

const PreviewModal = ({
  setModalVisible,
  modalVisible,
  colors,
  temas,
  addVerseTema,
  validateTema,
  onShared={onShared},
  idVerse={idVerse}
}) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      //Alert.alert("Modal has been closed.");
      setModalVisible(!modalVisible);
    }}
  >
    
 
    <View style={[styles.centeredView, { backgroundColor: colors.boxTema }]}>
       <Text style={{color:colors.text, textAlign: "center", fontSize: 12, paddingBottom: 16 }}>Que desea hacer con el versículo seleccionado.</Text>
      <TouchableOpacity onPress={onShared}>
        <View style={[styles.rowFlex, { marginBottom: 15, paddingTop: 15, borderTopColor: colors.header, borderTopWidth: 1 }]}>
          <Text
        style={{
          color: colors.text,
          fontFamily: "sans-serif-medium",
          fontSize: 16,
        }}
      >
        Compartir...
      </Text>

      <Ionicons 
      name="ios-share-social-outline" 
      size={24} 
      color={colors.text}
      />


        </View>
        
      </TouchableOpacity>
      
      <View style={[styles.rowFlex, { marginBottom: 25, paddingTop: 15, borderTopColor: colors.header, borderTopWidth: 1 }]}>
        {validateTema ? (
          <Text
            style={{
              color: colors.text,
              padding: 10,
              fontFamily: "sans-serif-medium",
              fontSize: 16,
            }}
          >
            No hay temas creados
          </Text>
        ) : (
          <Text
            style={{
              color: colors.text,
              padding: 10,
              fontFamily: "sans-serif-medium",
              fontSize: 16,
            }}
          >
        Agregarlo a un tema
          </Text>
        )}

        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
          <Text
            style={{
              color: colors.textNumber,
              backgroundColor: colors.background,
              padding: 10,
              borderRadius: 8,
            }}
          >
            Cancelar
          </Text>
        </TouchableOpacity>
      </View>

      

      <ScrollView>
        {temas && (
          <View>
            {temas.map((item) => (
              <TouchableOpacity
                key={item._id}
                style={styles.Item}
                onPress={() => addVerseTema(item._id)}
              >
                <Text
                  style={[
                    styles.textCharter,
                    { backgroundColor: colors.background, color: colors.text },
                  ]}
                >
                  {item.tema}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      

    </View>
  </Modal>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  numero: {
    paddingHorizontal: 5,
    fontFamily: "sans-serif-condensed",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    marginBottom: 8,
    fontWeight: "600",
    fontFamily: "sans-serif-medium",
  },
  rowFlex: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 5,
    paddingVertical: 4,
    marginVertical: 4,
  },
  rowFlexNo: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  socialText: {
    paddingHorizontal: 5,
  },
  testament: {
    flexDirection: "row",
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 10,
    paddingBottom: 20,
  },
  social: {
    fontSize: 14,
    marginHorizontal: 8,
  },
  centeredView: {
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
    maxHeight: 560,
    paddingHorizontal: 15,
    paddingBottom: 50,
    paddingTop:16,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
  Item: {
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  textCharter: {
    fontSize: 16,
    padding: 10,
    borderRadius: 10,
  },
});

export default Charter;
