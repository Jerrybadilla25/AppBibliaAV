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
}) => (
  <View>
    <ScrollView>
      <View>
        <Text
          style={{
            color: colors.text,
            textAlign: "center",
            fontSize: fontZize.fontsubtitle,
          }}
        >
          {arrayTema.tema}
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
      Alert.alert("Modal has been closed.");
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
});

export default Rendertemas;
