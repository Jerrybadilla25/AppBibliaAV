import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { UserContext } from "../Component/Context/contexUser";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Reina from '../Component/Biblias/ReinaValera/fullLibroReinaValera.json';
import Oso from '../Component/Biblias/Oso/fullLibroOso.json';

//componentes
import Loading from "../Component/Loading";
import Rewind from "../Component/boton/Rewind";
import Forward from "../Component/boton/Forward";
import Favorito from "../Component/boton/Favorito";
import Msj from '../Component/boton/Msj';

const Charter = ({ route }) => {
  const { fontZize, setfontZize, versionBook, setVersionBook  } = useContext(UserContext);//en uso
  const { colors } = useTheme();//en uso
  const [data, setData] = useState([]);//en uso
  const [modalVisible, setModalVisible] = useState(false);
  const [msj, setMsj]=useState(null);
  const [msjView, setMsjView]=useState(false);
  const [idVerse, setidVerse]=useState({});// add versiculo seleccionado
  const [temas, setTemas]=useState([]);
  
  //let cod = "null";

  React.useEffect(() => {
    setData([]);
    obtainCharte(route.params._id, route.params.version);
    obtainTemas()
  }, []);

  const createTwoButtonAlert = (tema) =>
    Alert.alert(
      "El versiculo ya pertenece al tema:",
       `${tema}`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );

  const obtainCharte = async (id, version) => {
    setMsjView(false)
    setMsj(null)
    switch (version) {
      case "Reina_Valera_1960":
        let capitulo1 = Reina.find(x => x._id === id)
        setData(capitulo1)
        break;
      case "Biblia_del_oso_1569":
        let capitulo2 = Oso.find(x => x._id === id)
        setData(capitulo2)
        break;
    }
  };

  const getCharterRewinder = ({ variables }) => {
    setMsjView(false)
    setMsj(null)
    let { _id, version } = variables;
    switch (version) {
      case "Reina_Valera_1960":
        let idx1 = Reina.findIndex((x) => x._id === _id);
        let newIdx1 = idx1 - 1;
        if (newIdx1 >= 0) {
          let newChacter1 = Reina[newIdx1];
          setData(newChacter1);
        } else {
          let newChacter1 = Reina[0];
          setData(newChacter1);
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
    setMsjView(false)
    setMsj(null)
    let { _id, version } = variables;
    switch (version) {
      case "Reina_Valera_1960":
        let idx1 = Reina.findIndex((x) => x._id === _id);
        let newIdx1 = idx1 + 1;
        if (newIdx1 <= 1188) {
          let newChacter1 = Reina[newIdx1];
          setData(newChacter1);
        } else {
          let newChacter1 = Reina[1188];
          setData(newChacter1);
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

  const addFavorito = async ({variables})=>{
    let ID = variables._id
    let fav = await AsyncStorage.getItem('@storage_Key_Favorito')
    let FavJson = JSON.parse(fav)
    let filter1 = FavJson.find((x)=> x._id === ID)
    if(filter1===undefined){
      FavJson.push(variables)
      await AsyncStorage.setItem('@storage_Key_Favorito', JSON.stringify(FavJson))
      setMsj("Capitulo agregado a favoritos")
      setMsjView(true)
    }else{
      setMsj("Este capitulo ya esta en favoritos")
      setMsjView(true)
    } 
  }

  //seleccionar id versiculo
  const getIDverse =({variables})=>{
    setidVerse(variables);
    setModalVisible(!modalVisible);
  }

  //obtener los temas
  const obtainTemas= async ()=>{
    try {
      let fulltemas = await AsyncStorage.getItem('@storage_Key_Temas')
      let arrayTemasFull = JSON.parse(fulltemas)
      setTemas(arrayTemasFull)
    } catch (error) {

    }
  }

  //add versiculo al tema
  const addVerseTema = async id=>{
    try {
      let temaSelect = temas.find(x => x._id === id)
      let validar = temaSelect.addVerses.find(x => x._id === idVerse._id)
      if(validar){
        setModalVisible(!modalVisible);
        createTwoButtonAlert(temaSelect.tema)
        //console.log("el versiculo ya existe")
      }else{
        temaSelect.addVerses.push(idVerse)
        let idx = temas.findIndex(x => x._id === id)
        temas.splice(idx, 1, temaSelect)
        await AsyncStorage.setItem('@storage_Key_Temas', JSON.stringify(temas))
        setModalVisible(!modalVisible);
      }
      
    } catch (error) {
      
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
}) => (
  <View style={[styles.container, { backgroundColor: colors.backgroundColor }]}>
    <ScrollView>
      <View style={styles.rowFlex}>
        <Rewind
          data={data}
          colors={colors}
          getCharterRewinder={getCharterRewinder}
        />
        <Text
          style={[
            styles.title,
            { color: colors.text, fontSize: fontZize.fonttitle, fontWeight: "700" },
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
                
                <View style={[styles.row, {paddingBottom: 16}]}>
                  <Text
                    style={[
                      styles.numero,
                      { color: colors.textNumber, fontSize: fontZize.fonttext  },
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

      {/*<View style={styles.rowFlex}>
        <Rewind data={data} colors={colors} getCharterRewinder={getCharterRewinder} />*/}
      <Text
        style={[
          styles.title,
          { color: colors.text, fontSize: 16, textAlign: "center" },
        ]}
      >
        {data.testament}
      </Text>
      <Text style={{textAlign: "center", color: colors.textNumber, fontSize: 10, fontFamily: 'monospace'}}>{data.version}</Text>
      {/*<Forward data={data} colors={colors} getCharterForwar={getCharterForwar} />
      </View>*/}
    </ScrollView>
    <PreviewModal
      setModalVisible={setModalVisible}
      modalVisible={modalVisible}
      colors={colors}
      temas={temas}
      addVerseTema={addVerseTema}
    />
  </View>
);

const PreviewModal = ({setModalVisible, modalVisible, colors, temas, addVerseTema})=>(
  <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
    //Alert.alert("Modal has been closed.");
    setModalVisible(!modalVisible);
    }}
  >
    <View style={[styles.centeredView, {backgroundColor: colors.boxTema}]}>
      <View style={[styles.rowFlex, {marginBottom: 25}]}>
         <Text style={{color: colors.text}}>Seleccione un tema</Text>
         
         <TouchableOpacity
         onPress={()=>setModalVisible(!modalVisible)}
         >
            <Text style={{color: colors.textNumber}}>Cancelar</Text>
         </TouchableOpacity>
      </View>
      <ScrollView >
          {
            temas && (
              <View >
                {
                  temas.map( item => (

                    <TouchableOpacity 
                    key={item._id} style={styles.Item}
                    onPress={()=> addVerseTema(item._id)}
                    >
                      <Text style={[styles.textCharter, {backgroundColor: colors.background, color: colors.text}]} >{item.tema}</Text>
                    </TouchableOpacity>
                    
                  ))
                }
              </View>
            )
          }
          <Text 
          style={{
            marginTop: 10, 
            fontSize: 12, 
            textAlign: "center",
            borderColor: colors.header,
            borderWidth: 1,
            borderRadius: 8,
            padding: 8,
            color: colors.text
            }}>Agregue el versiculo a un tema</Text>
      </ScrollView>
    </View>

  </Modal>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  numero: {
    paddingHorizontal: 5,
    fontFamily: 'sans-serif-condensed'
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    marginBottom: 8,
    fontWeight: "600",
    fontFamily: 'sans-serif-medium',
  },
  rowFlex: {
    flexDirection: "row",
    //justifyContent: "space-between",
    justifyContent: "space-around",
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
    marginVertical: 100,
    marginHorizontal: 10,
    paddingHorizontal: 15,
    paddingVertical: 30,
    borderRadius: 10,
  },
  Item: {
    paddingHorizontal: 4,
    paddingVertical: 4,
    //marginVertical: 4,
    //marginHorizontal: 4,
    //borderRadius: 20,
  },
  textCharter: {
    fontSize: 16,
    //fontWeight: "bold",
    padding: 10,
    borderRadius: 10,
  },
});

export default Charter;
