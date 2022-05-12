import React, { useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { createTemaUser, getTemaUser, deleteTema, deleteLike} from "../api.manual";

import AsyncStorage from "@react-native-async-storage/async-storage";

const User = ({route, navigation: { navigate } }) => {
  const { colors } = useTheme(); //en uso
  const [likes, setLikes] = useState([]); // en uso
  const [estado, setEstado] = useState("temas"); //en uso
  const [estadoAct, setEstadoAct] = useState(true); //en uso
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleTwo, setModalVisibleTwo] = useState(false);
  const [modalVisibleTree, setModalVisibleTree] = useState(false);
  const [temas, setTemas] = useState([]);
  const [title, setTitle]=useState(null); //guarda id tema
  const [idLike, setIDLike]=useState(null);//id like a borrar
  let data = "";

  //generar id unico

  const generateUUID =()=>{
    var d = new Date().getTime();
    var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }



  //en uso
  React.useEffect(() => {
    getUserLikes();
    getTemasUser();
  }, []);


  //en uso
  const getUserLikes = async () => {
    try {
      let fav = await AsyncStorage.getItem('@storage_Key_Favorito')
      let favJson = JSON.parse(fav)
      setLikes(favJson)
    } catch (error) {
      //no hacer nada
    }
  };

  //en uso
  const SendLike = ({variables}) => {
    const {_id, version}=variables
    navigate("Charter", { _id: _id, version: version });
  };

  //abre modal para eliminar capitulo
  const openModalTree= (id)=>{
    setIDLike(id);
    setModalVisibleTree(!modalVisibleTree);
  }
  //elimina capitulo
  const deleteIDLike = async ()=>{
    try {
      let delfav = await AsyncStorage.getItem('@storage_Key_Favorito')
      let arrayFav = JSON.parse(delfav)
      let idx = arrayFav.findIndex((x)=> x._id === idLike)
      arrayFav.splice(idx, 1)
      setLikes(arrayFav)
      setIDLike(null)
      setModalVisibleTree(!modalVisibleTree)
      await AsyncStorage.setItem('@storage_Key_Favorito', JSON.stringify(arrayFav))
    } catch (error) {
      
    }
  }
  // cerrar modal de eliminar capitulo
  const cerrarModalTree = ()=>{
    setModalVisibleTree(!modalVisibleTree)
  }

  //crear tema nuevo
  const saveTema = async () => {
    try {
      let ID = generateUUID()
      let temas =await AsyncStorage.getItem('@storage_Key_Temas')
      let arrayTemas = JSON.parse(temas)
      let temaNew = {
        _id: ID,
        tema: data,
        addVerses : []
      }
      arrayTemas.push(temaNew)
      await AsyncStorage.setItem('@storage_Key_Temas', JSON.stringify(arrayTemas))
      setTemas(arrayTemas);
      setModalVisible(!modalVisible);
    } catch (error) {
      console.log(error)
    }
  };
  
  //llamar a temas
  const getTemasUser = async () => {
    try {
      let tema = await AsyncStorage.getItem('@storage_Key_Temas')
      let arrayTemasjson = JSON.parse(tema)
      setTemas(arrayTemasjson);
    } catch (error) {
      
    }
    
  };

  //ver detalle de tema
  const ModalViewTema = (id)=>{
    navigate('Temas', {_id: id});
  }


  //abrir modal borrar tema
  const openModal= (id)=>{
    setTitle(id);
    setModalVisibleTwo(!modalVisibleTwo);
  }

  //borrar tema
  const deleteTemaUser = async ()=>{
    let idx = temas.findIndex(x => x._id ===title)
    temas.splice(idx, 1)
    setTemas(temas)
    setModalVisibleTwo(!modalVisibleTwo)
    setTitle(null)
    await AsyncStorage.setItem('@storage_Key_Temas', JSON.stringify(temas))
  }


  //fin revision




  const changeEstado = () => {
    setEstado("temas");
    setEstadoAct(true);

  };
  const changeEstadoTemas = () => {
    setEstado("like");
    setEstadoAct(false);
  };

  const textInputChange = (val) => {
    data = val;
  };

  
  
  

  

  const cerrarModalTwo = ()=>{
    setModalVisibleTwo(!modalVisibleTwo)
  }

  

  



  const redirectHelp = ()=>{
    navigate('Help');
  }

  const PreviewModalTree = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisibleTree}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisibleTwo(!modalVisibleTree);
      }}
    >
      <View style={styles.modalView}>
        <View style={[styles.buton2, { backgroundColor: colors.text }]}>
          <TouchableOpacity onPress={deleteIDLike} >
            <Text
              style={{
                color: colors.background,
                textAlign: "center",
                marginBottom: 15,
              }}
            >
              Quitar de me gusta
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={cerrarModalTree}>
            <Text style={{ color: colors.textNumber, textAlign: "center" }}>
              Cancelar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );


  const PreviewModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisibleTwo}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisibleTwo(!modalVisibleTwo);
      }}
    >
      <View style={styles.modalView}>
        <View style={[styles.buton2, { backgroundColor: colors.text }]}>
          <TouchableOpacity onPress={deleteTemaUser}>
            <Text
              style={{
                color: colors.background,
                textAlign: "center",
                marginBottom: 15,
              }}
            >
              Eliminar tema
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={cerrarModalTwo}>
            <Text style={{ color: colors.textNumber, textAlign: "center" }}>
              Cancelar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const Preview = ({ textInputChange }) => {
    if (estado === "like") {
      return (
        <View style={styles.homeLike}>
          <Text style={[styles.title, { color: colors.text }]}>
            Favoritos
          </Text>
          <ScrollView>
            <View style={styles.row}>
            {likes.map((x) => (
              <TouchableOpacity
                key={x._id}
                onPress={() => SendLike({variables:{_id:x._id, version: x.version}})}
                onLongPress={()=> openModalTree(x._id)}
                
              >
                <View style={[styles.button, { backgroundColor: colors.header }]}  >
                  <Text style={[styles.textCharter, { color: colors.text }]}>
                  {x.charter}
                </Text>
                <Text
                  style={[styles.textDetalles, { color: colors.textNumber }]}
                >
                  ir...
                </Text>
                <Text
                  style={[styles.textVersion, { color: colors.text }]}
                >
                  {x.version}
                </Text>
                </View>
                
              </TouchableOpacity>
            ))}
            </View>
          </ScrollView>
          <PreviewModalTree modalVisibleTree={modalVisibleTree}/>
        </View>
      );
    }
    if (estado === "temas") {
      return (
        <View style={[styles.homeLike, { borderBottomColor: colors.border }]}>
          {modalVisible ? (
            <View style={[styles.modal, { backgroundColor: colors.social }]}>
              <Text style={[styles.title, { color: colors.text }]}>
                Nombre de tema nuevo
              </Text>
              <View>
                <TextInput
                  onChangeText={(val) => textInputChange(val)}
                  style={[
                    styles.textInput,
                    { backgroundColor: colors.header, color: colors.text },
                  ]}
                  
                  placeholder="su tema aqui"
                  placeholderTextColor={colors.inputHolder}
                />
                <View style={styles.close}>
                  <TouchableOpacity onPress={saveTema}>
                    <Text style={[styles.boton, { color: colors.text }]}>
                      Guardar
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={[styles.boton, { color: colors.text }]}>
                      Cerrar
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text style={{fontSize: 12, marginTop: 15}}>Puedo agregar versiculos individuales desde la pantalla de capitulos, presionando por dos segundos el versiculo.</Text>
              </View>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              style={{ flexDirection: "row", justifyContent: "flex-end" }}
            >
              <Text style={[styles.newtema, { color: colors.text }]}>
                Crear tema
              </Text>
            </TouchableOpacity>
          )}
          <View style={styles.homeLike}>
            <ScrollView>
              {temas && (
                <View >
                  {temas.map((x) => (
                    <TouchableOpacity
                      key={x._id}
                      style={[styles.Item, { backgroundColor: colors.header }]}
                      onPress={() => ModalViewTema(x._id)}
                      onLongPress={()=>openModal(x._id)}
                    >
                      <Text
                        key={x._id}
                        style={[styles.textCharter, { color: colors.text }]}
                      >
                        {x.tema}
                      </Text>
                      <Text
                        style={[
                          styles.textDetalles,
                          { color: colors.textNumber },
                        ]}
                      >
                        ver...
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </ScrollView>
          </View>
          <PreviewModal
          modalVisibleTwo={modalVisibleTwo}
          />
        </View>
      );
    }
  };



  return (
    <View style={styles.container}>
      <View style={{ flex: 17, backgroundColor: colors.background }}>
        {likes && <Preview textInputChange={textInputChange} />}
      </View>

      <View style={[styles.flex1, { backgroundColor: colors.header }]}>
        <TouchableOpacity onPress={changeEstadoTemas}>
          {
            estadoAct 
            ? 
            <View style={[styles.col, { backgroundColor: colors.header}]}>
              <Ionicons name="heart-outline" size={20} color={colors.text} />
              <Text style={{ color: colors.text, fontSize: 10 }}>Me Gusta</Text>
            </View>
            :
            <View style={[styles.col, { backgroundColor: colors.header}]}>
              <Ionicons name="heart-outline" size={20} color={colors.textNumber} />
              <Text style={{ color: colors.textNumber, fontSize: 10 }}>Me Gusta</Text>
            </View>

          }
          
        </TouchableOpacity>

        <TouchableOpacity onPress={changeEstado}>
          {
            estadoAct 
            ? 
            <View style={[styles.col, { backgroundColor: colors.header}]}>
              <Ionicons name="clipboard-outline" size={20} color={colors.textNumber} />
              <Text style={{ color: colors.textNumber,  fontSize: 10}}>Mis temas</Text>
            </View>
           :
            <View style={[styles.col, { backgroundColor: colors.header}]}>
              <Ionicons name="clipboard-outline" size={20} color={colors.text} />
              <Text style={{ color: colors.text,  fontSize: 10}}>Mis temas</Text>
            </View>
          }
        </TouchableOpacity>

        <TouchableOpacity onPress={redirectHelp}>
          <View style={[styles.col, { backgroundColor: colors.header}]}>
          <Ionicons name="md-help-circle-outline" size={20} color={colors.text} />
          <Text style={{ color: colors.text,  fontSize: 10 }}>Ayuda</Text>
          </View>
        
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex1: {
    flexDirection: "row",
    justifyContent: "space-around",
    //justifyContent: "space-evenly",
    //justifyContent: "space-between",
    //paddingHorizontal: 20,
    //paddingVertical: 12,
  },
  homeLike: {
    //paddingHorizontal: 10,
    paddingBottom: 40
    //borderWidth: 1
  },
  title: {
    paddingVertical: 20,
    textAlign: "center"
  },
  Item: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginVertical: 4,
    marginHorizontal: 8,
    borderRadius: 10,
  },
  row:{
    flex:1,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 10,
    marginBottom: 24

    
  },
  textCharter: {
    fontSize: 16,
    fontWeight: "bold",
  },
  textDetalles: {
    //paddingHorizontal: 20,
    fontSize: 16,
  },
  textVersion: {
    //paddingHorizontal: 20,
    fontSize: 8,
  },
  textInput: {
    borderRadius: 8,
    padding: 10,
  },
  boton: {
    borderRadius: 8,
    padding: 10,
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 10,
    alignContent: "center",
    //alignSelf: "flex-start",
    marginHorizontal: "1%",
    marginBottom: 6,
    //width: 150,
    minWidth: "48%",
  },
  modal: {
    margin: 15,
    paddingHorizontal: 15,
    paddingVertical: 30,
    borderRadius: 10,
  },
  modal2: {
    flex: 1,
    
    margin: 10,
    paddingHorizontal: 15,
    paddingVertical: 30,
    borderRadius: 10,
  },
  close: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  newtema: {
    //borderWidth: 1,
    //borderRadius: 10,
    textAlign: "center",
    padding: 7,
    width: "50%",
    marginHorizontal: 30,
    marginVertical: 15
  },
    modalView: {
      marginVertical: 100,
      marginHorizontal: 75,
      paddingHorizontal: 10,
      paddingVertical: 30,
      borderRadius: 10,
    },
    buton2:{
      borderRadius: 10,
      padding: 20,
      
    },
    col:{
      flexDirection: "column",
      alignItems: "center",
      paddingVertical: 10,
      paddingHorizontal: 10,
      marginBottom: 10,
      width: 100,
    },
});

export default User;
