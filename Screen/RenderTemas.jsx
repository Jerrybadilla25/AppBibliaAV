import React, { useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { UserContext } from "../Component/Context/contexUser";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Rendertemas = ({ route, navigation: { navigate } }) => {
  const { fontZize, setfontZize } = useContext(UserContext);
  const { colors } = useTheme();
  const [temasVerse, setTemasVerse] = useState({});
  const [arrayTema, setArrayTema] = useState(); //se llena con el tema y verses
  const [temas, setTemas]=useState(true)
  const [modalVisible, setModalVisible] = useState(false);
  const [idverse, setIdverse] = useState(null); // en uso
  

  

  React.useEffect(() => {
    getTemas(route.params._id);
  }, []);

  const getTemas = async (id) => {
    try {
      let tema = await AsyncStorage.getItem('@storage_Key_Temas')
      let renderTema1 = JSON.parse(tema)
      let renderSelect = renderTema1.find(x => x._id === id)
      setArrayTema(renderSelect)
      if(renderTema1[0].addVerses.length===0){
        setTemas(false)
      }else{

      }
    } catch (error) {  
    }
  };

  


  //abrir modal elimanar versiculo
  const openModal = id => {
    setIdverse(id)
    setModalVisible(!modalVisible)
  };

  //delete versiculo
  const deleteverse = async () => {
    let fullTemas = await AsyncStorage.getItem('@storage_Key_Temas')
    let fullTemasJson = JSON.parse(fullTemas)
    let idx = fullTemasJson.findIndex(x => x._id===arrayTema._id)
    let idxDel = arrayTema.addVerses.findIndex(x => x._id ===idverse)
    arrayTema.addVerses.splice(idxDel, 1)
    fullTemasJson.splice(idx, 1, arrayTema)
    await AsyncStorage.setItem('@storage_Key_Temas', JSON.stringify(fullTemasJson))
    setArrayTema(arrayTema)
    setModalVisible(!modalVisible);
  };

  

  

  return (
    <View
      style={[styles.container, { backgroundColor: colors.backgroundColor }]}
    >
      {arrayTema ? (
        <PreviewTemas
          arrayTema={arrayTema}
          colors={colors}
          temasVerse={temasVerse}
          openModal={openModal}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          deleteverse={deleteverse}
          fontZize={fontZize}
          temas={temas}
          
        />
      ) : (
        <PreviewText colors={colors} />
      )}
    </View>
  );
};

const PreviewTemas = ({
  arrayTema,
  colors,
  temasVerse,
  openModal,
  modalVisible,
  setModalVisible,
  deleteverse,
  fontZize,
  temas
  
}) => (
  <View>
    <ScrollView >
        <View style={{flexDirection: "column"}}>
        <Text
          style={{
            color: colors.text,
            textAlign: "center",
            fontSize: fontZize.fontsubtitle,
            fontFamily: 'sans-serif-medium'
          }}
        >
          {arrayTema.tema}
        </Text>
        <Text
          style={{
            color: colors.text,
            textAlign: "left",
            fontSize: fontZize.fontsubtitle-1,
            fontFamily: 'sans-serif-condensed',
            paddingHorizontal: 10,
            marginBottom: 8
          }}
        >
          {arrayTema.description}
        </Text>
        </View>
      


      



      
      {arrayTema.addVerses.map((item) => (
        <View
          key={item._id}
          style={[styles.boxverse, { backgroundColor: colors.header }]}
        >
          <TouchableOpacity onLongPress={() => openModal(item._id)}>
            <View style={styles.row}>
              <Text
                style={{
                  color: colors.textNumber,
                  fontSize: fontZize.fonttext,
                }}
              >
                {item.originCharter}- 
              </Text>
              <Text
                style={{
                  color: colors.textNumber,
                  fontSize: fontZize.fonttext,
                  fontFamily: 'sans-serif-medium'
                }}
              >
                 {item.numero}
              </Text>
            </View>
            <Text
              style={{
                color: colors.text,
                fontSize: fontZize.fonttext,
                textAlign: "left",
                fontFamily: 'sans-serif-condensed'
              }}
            >
              {item.versiculo}
            </Text>
            <Text
              style={{
                color: colors.text,
                fontSize: 10,
                textAlign: "right",
                paddingTop: 14,
                paddingBottom: 8
              }}
            >
              {item.version}
            </Text>
          </TouchableOpacity>
        

        

        </View>

      ))}

      {
        temas ? <View></View>
        :
        <View style={[styles.box, {borderColor: colors.header, borderWidth: 1}]}>
              <Text
              style={[styles.title,{color:colors.text }]}
              >Puedes agregar versículos a este tema, desde la pantalla de lectura de capítulos.</Text>
              <Text
              style={[styles.title,{color:colors.text }]}
              >Presiona el icono  <Ionicons
              name="ios-bookmarks-outline"
              size={16}
              
              color={colors.text}
            />  en la parte superior para dirigirte a la BibliaAV y agregar versículos.</Text>
        </View>
      }
      
    </ScrollView>

    <ModalDelete
      setModalVisible={setModalVisible}
      modalVisible={modalVisible}
      colors={colors}
      deleteverse={deleteverse}
    />
  </View>
);

const PreviewText = ({ colors }) => (
  <View>
    <Text style={{ color: colors.text }}>No hay versiculos asociados</Text>
  </View>
);

const ModalDelete = ({
  setModalVisible,
  modalVisible,
  colors,
  deleteverse,
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
    <View style={styles.modalView}>
      <View style={[styles.buton, { backgroundColor: colors.text }]}>
        <TouchableOpacity onPress={deleteverse}>
          <Text
            style={{
              color: colors.background,
              textAlign: "center",
              marginBottom: 15,
              fontFamily: 'sans-serif-medium',
              fontSize: 16
            }}
          >
            Eliminar versiculo
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
          <Text style={{ color: colors.textNumber, textAlign: "center" }}>
            Cancelar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
  },
  row: {
    flexDirection: "row",
    paddingBottom: 15,
  },
  boxverse: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginTop: 10,
    //borderRadius: 10
  },
  modalView: {
    marginVertical: 100,
    marginHorizontal: 75,
    paddingHorizontal: 10,
    paddingVertical: 30,
    borderRadius: 10,
  },
  buton: {
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 14,
    padding: 10,
    textAlign: "left",
    fontFamily: 'sans-serif-thin',
  },
  textInput: {
    padding: 10,
    marginBottom: 40
  },
  box: {
    padding: 30,
    marginHorizontal: 20
  }
});

export default Rendertemas;
