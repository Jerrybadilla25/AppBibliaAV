import React, { useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Button
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";


import AsyncStorage from "@react-native-async-storage/async-storage";
import TemaEdit from './UsurData/TemaEdit';
import Notas from './UsurData/Notas';

const User = ({route, navigation: { navigate } }) => {
  const { colors } = useTheme(); //en uso
  const [likes, setLikes] = useState([]); // en uso
  const [estado, setEstado] = useState("temas"); //en uso
  const [estadoAct, setEstadoAct] = useState("temas"); //true pinta rojo temas, false pinta rojo likes
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleTwo, setModalVisibleTwo] = useState(false);
  const [modalVisibleTree, setModalVisibleTree] = useState(false);
  const [temas, setTemas] = useState(null);
  const [title, setTitle]=useState(null); //guarda id tema
  const [titleBoolean, setTitleBoolen]=useState(false); //si existe msj titulo en blanco
  const [Msjtitle, setMsjtitle]=useState(null); //guarda id tema
  const [idLike, setIDLike]=useState(null);//id like a borrar
  const [noLikes, setNolikes]=useState(true)
  let data = "";
  let descripcion = ""

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
    //deleteAll()
    getUserLikes();
    getTemasUser();
  }, []);

  /*
  const deleteAll = async ()=>{
    await AsyncStorage.removeItem("@storage_Key_Temas")
  }
  */


  //en uso
  const getUserLikes = async () => {
    try {
      let fav = await AsyncStorage.getItem('@storage_Key_Favorito')
      let favJson = JSON.parse(fav)
      setLikes(favJson)
      if(favJson.length===0){
        setNolikes(false)
      }
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
      if(data.length>0){
        let ID = generateUUID()
        let temas =await AsyncStorage.getItem('@storage_Key_Temas')
        let arrayTemas = JSON.parse(temas)
        let temaNew = {
          _id: ID,
          tema: data,
          description: descripcion,
          comentario: "",
          addVerses : []
        }
        if(arrayTemas===null){
          let arrayTema = []
          arrayTema.push(temaNew)
          await AsyncStorage.setItem('@storage_Key_Temas', JSON.stringify(arrayTema))
          setTemas(arrayTema);
          setMsjtitle(null)
          setTitleBoolen(false)
          setModalVisible(!modalVisible);
        }else{
          arrayTemas.push(temaNew)
          await AsyncStorage.setItem('@storage_Key_Temas', JSON.stringify(arrayTemas))
          setTemas(arrayTemas);
          setMsjtitle(null)
          setTitleBoolen(false)
          setModalVisible(!modalVisible);
        }
    
      }else{
        setMsjtitle("El tema es requerido")
        setTitleBoolen(true)
      }   
    } catch (error) {
      console.log(error)
    }
  };
  
  //llamar a temas
  const getTemasUser = async () => {
    try {
      let tema = await AsyncStorage.getItem('@storage_Key_Temas')
      let arrayTemasjson = JSON.parse(tema)
      if(arrayTemasjson===null){
        //setTemas([{_id: "1", tema: "ejemplo", description: "description"}])
      }else{
        setTemas(arrayTemasjson);
      }
      
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
    setEstadoAct("temas");
  };

  const rediretNotas = ()=>{ 
    navigate('Notas')
  }




  const changeEstadoTemas = () => {
    setEstado("like");
    setEstadoAct("like");
    
  };

  const textInputChange = (val) => {
    data = val;
  };

  const textInputChange2 = (val) => {
    descripcion = val;
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
        //Alert.alert("Modal has been closed.");
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
                marginBottom: 25,
                fontFamily: 'sans-serif-medium',
                fontSize: 16
              }}
            >
              Quitar de favoritos
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
        //Alert.alert("Modal has been closed.");
        setModalVisibleTwo(!modalVisibleTwo);
      }}
    >
      <View style={styles.modalView}>
        <View style={[styles.buton2, { backgroundColor: colors.text }]}>
          <TouchableOpacity onPress={deleteTemaUser} >
            <Text
              style={{
                color: colors.header,
                textAlign: "center",
                marginBottom: 25,
                fontFamily: 'sans-serif-medium',
                fontSize: 16
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

  const Preview = () => {
    if(estado ==="editar"){
      return (
        <TemaEdit temas={temas} setTemas={setTemas} setEstado={setEstado} colors={colors}/>
      )
    }


    if (estado === "like") {
      return (
        <View style={{paddingBottom: 8}}>
          <Text style={[styles.title, { color: colors.text }]}>
            Favoritos
          </Text>
          <ScrollView style={styles.homeLike}>
            <View style={styles.row}>
            {likes.map((x) => (
              <TouchableOpacity
                key={x._id}
                onPress={() => SendLike({variables:{_id:x._id, version: x.version}})}
                onLongPress={()=> openModalTree(x._id)}
                
              >
                <View style={[styles.button, { backgroundColor: colors.header }]}  >
                  <Text style={[styles.textCharter, { color: colors.text, fontFamily: 'sans-serif-medium' }]}>
                  {x.charter}
                </Text>
                <Text
                  style={[styles.textDetalles, { color: colors.textNumber, fontFamily: 'sans-serif-medium' }]}
                >
                  ir...
                </Text>
                <Text
                  style={[styles.textVersion, { color: colors.text, fontFamily: 'sans-serif-medium' }]}
                >
                  {x.version}
                </Text>
                </View>
                
              </TouchableOpacity>
            ))}
            </View>
          </ScrollView>
          {
        noLikes ? <View></View>
        :
        <View style={[styles.box, {borderColor: colors.header, borderWidth: 1}]}>
              <Text
              style={[styles.title1,{color:colors.text }]}
              >Puedes agregar capítulos a esta sección, desde la pantalla de lectura de capítulos.</Text>
              <Text
              style={[styles.title1,{color:colors.text }]}
              >Presiona el icono  <Ionicons
              name="ios-bookmarks-outline"
              size={16}
              
              color={colors.text}
            />  en la parte superior, para dirigirte a la BibliaAV y presionar en Agregar a favoritos</Text>
        </View>
      }
          <PreviewModalTree modalVisibleTree={modalVisibleTree}/>
        </View>
      );
    }
    if (estado === "temas") {
      return (
        <View style={[styles.homeLike, { borderBottomColor: colors.border }]}>
          {modalVisible ? (
            <View style={[styles.modal, { backgroundColor: colors.boxTema }]}>

              {
                titleBoolean ? <Text style={[styles.title, { color: colors.textNumber }]}>
                {Msjtitle} 
              </Text> :
              <Text style={[styles.title, { color: colors.text }]}>
               Nombre de tema nuevo
            </Text>
              }

              
              <View>
                <TextInput
                  onChangeText={(val) => textInputChange(val)}
                  style={[
                    styles.textInput,
                    { backgroundColor: colors.header, color: colors.text },
                  ]}
                  
                  placeholder="Nombre Tema"
                  placeholderTextColor={colors.inputHolder}
                />
                
                <TextInput
                  onChangeText={(val) => textInputChange2(val)}
                  style={[
                    styles.textInput,
                    { backgroundColor: colors.header, color: colors.text, marginTop: 10 },
                  ]}
                  
                  placeholder="Descripcion..."
                  placeholderTextColor={colors.inputHolder}
                />
                
                <View style={styles.close}>
                  <TouchableOpacity onPress={saveTema}>
                    <Text style={[styles.boton, { color: colors.textNumber, backgroundColor: colors.background }]}>
                      Guardar
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(!modalVisible),
                      setTitleBoolen(false), setTitle(true)}}
                  >
                    <Text style={[styles.boton, { color: colors.text, backgroundColor: colors.background }]}>
                      Cerrar
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text style={{
                  fontSize: 12, 
                  marginTop: 15, 
                  padding: 20,
                  borderColor: colors.background,
                  borderWidth: 1,
                  borderRadius: 8,
                  color: colors.text
                  }}>Puedo agregar versículos individuales desde la pantalla de capítulos, presionando por dos segundos el versículo.</Text>
              </View>
            </View>
          ) : (
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                <TouchableOpacity
                 onLongPress={() => setEstado("editar")}
                   style={{ flexDirection: "row", justifyContent: "flex-end" }}
                 >
                  
                   <Text style={[styles.newtema, { color: colors.text }]}>
                   <Ionicons name="ios-document-text-outline" size={14} color={colors.text} />
                   <Text>  </Text>
                    Editar tema
                   </Text>
                </TouchableOpacity>
                <TouchableOpacity
                   onPress={() => setModalVisible(!modalVisible)}
                   style={{ flexDirection: "row", justifyContent: "flex-end" }}
                >
                    <Text style={[styles.newtema, { color: colors.text }]}>
                    <Ionicons name="create-outline" size={14} color={colors.text} />
                    <Text>  </Text>
                    Crear tema
                    </Text>
                </TouchableOpacity>
            </View>
            
          )}

          {
            modalVisible 
            ?
            <View></View>
            
          :
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
                        style={[styles.textCharter, { color: colors.text, fontFamily: 'sans-serif-medium' }]}
                      >
                        {x.tema}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={[
                          styles.textDetalles,
                          { color: colors.textNumber },
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
          

          }
          
          <PreviewModal
          modalVisibleTwo={modalVisibleTwo}
          />
        </View>
      );
    }

    
    if(estado === "notas"){
      return <Notas/>
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
            estadoAct === "like"
            ? 
            <View style={[styles.col, { backgroundColor: colors.header}]}>
              <Ionicons name="heart-outline" size={20} color={colors.textNumber} />
              <Text style={{ color: colors.textNumber, fontSize: 10 }}>Favoritos</Text>
            </View>
            :
            <View style={[styles.col, { backgroundColor: colors.header}]}>
              <Ionicons name="heart-outline" size={20} color={colors.text} />
              <Text style={{ color: colors.text, fontSize: 10 }}>Favoritos</Text>
            </View>

          }
          
        </TouchableOpacity>

        <TouchableOpacity onPress={changeEstado}>
          {
            estadoAct === "temas"
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

        <TouchableOpacity onPress={rediretNotas}>
          {
            estadoAct === "notas"
            ? 
            <View style={[styles.col, { backgroundColor: colors.header}]}>
              <Ionicons name="pricetag-outline" size={20} color={colors.textNumber} />
              <Text style={{ color: colors.textNumber,  fontSize: 10}}>Notas</Text>
            </View>
           :
            <View style={[styles.col, { backgroundColor: colors.header}]}>
              <Ionicons name="pricetag-outline" size={20} color={colors.text} />
              <Text style={{ color: colors.text,  fontSize: 10}}>Notas</Text>
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
    marginBottom: 74
  },
  title: {
    paddingVertical: 20,
    fontSize: 18,
    textAlign: "center",
    fontFamily: 'sans-serif-medium'
  },
  title1: {
    fontSize: 14,
    padding: 10,
    textAlign: "left",
    fontFamily: 'sans-serif-thin',
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
    //paddingBottom: 15
    //marginBottom: 12,
    

    
  },
  textCharter: {
    fontSize: 15,
    fontWeight: "800",
  },
  textDetalles: {
    //paddingHorizontal: 20,
    fontSize: 16,
    fontFamily: 'sans-serif-thin',
    fontWeight: "400"
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
    fontFamily: 'sans-serif',
    fontSize: 16,
    width: 100,
    textAlign: "center"
  },
  button: {
    paddingHorizontal: 6,
    paddingVertical: 8,
    borderRadius: 10,
    alignContent: "center",
    //alignSelf: "flex-start",
    marginHorizontal: "1%",
    marginVertical: "1%",
    marginBottom: 6,
    //width: 150,
    minWidth: "48%",
  },
  modal: {
    marginVertical: 15,
    paddingHorizontal: 15,
    paddingVertical: 30,
    //borderRadius: 10,
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
    marginTop: 30,
  },
  newtema: {
    padding: 7,
    marginHorizontal: 30,
    marginVertical: 15,
    fontFamily: 'Roboto'
  },
    modalView: {
      marginTop: 400,
      marginBottom: 50,
      marginHorizontal: 10,
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
    box: {
      padding: 30,
      marginHorizontal: 20
    }
});

export default User;
