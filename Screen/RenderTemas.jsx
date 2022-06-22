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
import { UserContext } from "../Component/Context/contexUser";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Rendertemas = ({ route, navigation: { navigate } }) => {
  const { fontZize, setfontZize } = useContext(UserContext);
  const { colors } = useTheme();
  //const [temasVerse, setTemasVerse] = useState({});
  const [arrayTema, setArrayTema] = useState(); //se llena con el tema y verses
  const [arrayState, setArrayState] = useState(false);
  const [editComent, setEditComent] = useState(false);
  const [editComentID, setEditComentID] = useState(null);
  const [temas, setTemas] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [idverse, setIdverse] = useState(null); // en uso
  const [comentario, setComentario]=useState("")
  //let comentario = "";

  React.useEffect(() => {
    getTemas(route.params._id);
  }, [arrayState]);

  
  const getTemas = async (id) => {
    try {
      let tema = await AsyncStorage.getItem("@storage_Key_Temas");
      let renderTema1 = JSON.parse(tema);
      let renderSelect = renderTema1.find((x) => x._id === id);
      //console.log(renderSelect.addVerses[0]);
      setArrayTema(renderSelect);
      if (renderTema1[0].addVerses.length === 0) {
        setTemas(false);
      } else {
      }
    } catch (error) {}
  };

  const addComent = async (id) => {
    try {
      let newarrayTema = arrayTema;
      let idx = newarrayTema.addVerses.findIndex((x) => x._id === id);
      let verse = newarrayTema.addVerses[idx];
      if (verse.comentario === undefined) {
        setEditComentID(`${id}`);
        let coment = { comentario: null };
        verse = Object.assign(verse, coment);
        newarrayTema.addVerses.splice(idx, 1, verse);
        let tema = await AsyncStorage.getItem("@storage_Key_Temas");
        let renderTema1 = JSON.parse(tema);
        let idx2 = renderTema1.findIndex((x) => x._id === route.params._id);
        renderTema1.splice(idx2, 1, newarrayTema);
        await AsyncStorage.removeItem("@storage_Key_Temas");
        await AsyncStorage.setItem(
          "@storage_Key_Temas",
          JSON.stringify(renderTema1)
        );
        setArrayState(!arrayState);
        setEditComent(true);
      } else {
        setEditComent(!editComent);
        setEditComentID(`${id}`);
        // no hacer nada
      }
    } catch (error) {}
  };

  const textInputChange3 = (val) => {
    //console.log(val)
    setComentario(val)
    //comentario = val;
  };

  const addComenMemory = async (id) => {
    try {
      let newarrayTema = arrayTema;
      let idx = newarrayTema.addVerses.findIndex((x) => x._id === id);
      let verse = newarrayTema.addVerses[idx];
      verse.comentario = comentario;
      newarrayTema.addVerses.splice(idx, 1, verse);
      let tema = await AsyncStorage.getItem("@storage_Key_Temas");
      let renderTema1 = JSON.parse(tema);
      let idx2 = renderTema1.findIndex((x) => x._id === route.params._id);
      renderTema1.splice(idx2, 1, newarrayTema);
      await AsyncStorage.removeItem("@storage_Key_Temas");
      await AsyncStorage.setItem(
        "@storage_Key_Temas",
        JSON.stringify(renderTema1)
      );
      setArrayState(!arrayState);
      setEditComent(!editComent);
      setEditComentID(null);
    } catch (error) {}
  };

  const editComentSave = (id) => {
    setEditComentID(`${id}`);
  };

  const deleteComenMemory = async (id)=>{
      try {
        let tema = await AsyncStorage.getItem("@storage_Key_Temas");
        let renderTema1 = JSON.parse(tema);
        let idx2 = renderTema1.findIndex((w) => w._id === route.params._id)
        let idx = renderTema1[idx2].addVerses.findIndex(x => x._id === id)
        let verse = renderTema1[idx2].addVerses[idx]
        delete verse.comentario
        renderTema1[idx2].addVerses.splice(idx, 1, verse)
        await AsyncStorage.setItem("@storage_Key_Temas", JSON.stringify(renderTema1))
        setArrayState(!arrayState);
      } catch (error) {
        
      }
  }

  //abrir modal elimanar versiculo
  const openModal = (id) => {
    setIdverse(id);
    setModalVisible(!modalVisible);
  };

  //delete versiculo
  const deleteverse = async () => {
    try {
      let fullTemas = await AsyncStorage.getItem("@storage_Key_Temas");
      let fullTemasJson = JSON.parse(fullTemas);
      let idx = fullTemasJson.findIndex((x) => x._id === arrayTema._id);
      let idxDel = arrayTema.addVerses.findIndex((x) => x._id === idverse);
      arrayTema.addVerses.splice(idxDel, 1);
      fullTemasJson.splice(idx, 1, arrayTema);
      await AsyncStorage.setItem(
        "@storage_Key_Temas",
        JSON.stringify(fullTemasJson)
      );
      setArrayTema(arrayTema);
      setModalVisible(!modalVisible);
    } catch (error) {}
  };

  return (
    <View
      style={[styles.container, { backgroundColor: colors.backgroundColor }]}
    >
      {arrayTema ? (
        <PreviewTemas
          arrayTema={arrayTema}
          colors={colors}
          editComent={editComent}
          openModal={openModal}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          deleteverse={deleteverse}
          fontZize={fontZize}
          temas={temas}
          addComent={addComent}
          textInputChange3={textInputChange3}
          addComenMemory={addComenMemory}
          editComentID={editComentID}
          editComentSave={editComentSave}
          deleteComenMemory={deleteComenMemory}
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
  editComent,
  openModal,
  modalVisible,
  setModalVisible,
  deleteverse,
  fontZize,
  temas,
  addComent,
  textInputChange3,
  addComenMemory,
  editComentID,
  editComentSave,
  deleteComenMemory
}) => (
  <View>
    <ScrollView>
      <View style={{ flexDirection: "column" }}>
        <Text
          style={{
            color: colors.text,
            paddingHorizontal: 10,
            fontSize: fontZize.fontsubtitle,
            fontFamily: "sans-serif-medium",
          }}
        >
          {arrayTema.tema}
        </Text>
        <Text
          style={{
            color: colors.text,
            fontSize: fontZize.fontsubtitle - 1,
            fontFamily: "sans-serif-condensed",
            paddingHorizontal: 16,
            marginBottom: 8,
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
          <View>
            <View style={[styles.row, { justifyContent: "space-between" }]}>
              <View style={{ flexDirection: "row" }}>
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
                    fontFamily: "sans-serif-medium",
                  }}
                >
                  {item.numero}
                </Text>
              </View>
              {item.comentario !== undefined ? (
                <TouchableOpacity onPress={() => editComentSave(item._id)}>
                  <Ionicons
                    name="repeat"
                    size={24}
                    color={colors.text}
                    style={{ paddingRight: 10 }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => addComent(item._id)}>
                  <Ionicons
                    name="chatbox-ellipses-outline"
                    size={24}
                    color={colors.text}
                    style={{ paddingRight: 10 }}
                  />
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity onLongPress={() => openModal(item._id)}>
              <Text
                style={{
                  color: colors.text,
                  fontSize: fontZize.fonttext,
                  textAlign: "left",
                  fontFamily: "sans-serif-condensed",
                }}
              >
                {item.versiculo}
              </Text>
            </TouchableOpacity>

            <Text
              style={{
                color: colors.text,
                fontSize: 10,
                textAlign: "right",
                paddingTop: 14,
                paddingBottom: 8,
              }}
            >
              {item.version}
            </Text>

            {item.comentario !== undefined && (
              <View
                style={{
                  backgroundColor: colors.background,
                  padding: 10,
                  borderRadius: 8,
                }}
              >
                <Text
                  style={{
                    color: colors.textNumber,
                    fontFamily: "sans-serif-thin",
                  }}
                >
                  Comentario:
                </Text>
                {editComentID === item._id ? (
                  <View>
                    <TextInput
                      onChangeText={(val) => textInputChange3(val)}
                      style={{ color: colors.text }}
                      placeholder="Agregue un comentario"
                      placeholderTextColor={colors.inputHolder}
                      defaultValue={item.comentario}
                      multiline={true}
                      numberOfLines={6}
                      textAlignVertical="top"
                    />
                    <View style={{flexDirection: "row", justifyContent: "space-around"}}>
                    <TouchableOpacity >
                      <Button
                      title="Guardar"
                      color={colors.header}
                      onPress={() => addComenMemory(item._id)}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity >
                      <Button
                      title="Eliminar"
                      color={colors.textNumber}
                      onPress={() => deleteComenMemory(item._id)}
                      />
                    </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <Text style={{ color: colors.text, fontSize: fontZize.fonttext-2 }}>{item.comentario}</Text>
                )}
              </View>
            )}
          </View>
        </View>
      ))}

      {temas ? (
        <View></View>
      ) : (
        <View
          style={[styles.box, { borderColor: colors.header, borderWidth: 1 }]}
        >
          <Text style={[styles.title, { color: colors.text }]}>
            Puedes agregar versículos a este tema, desde la pantalla de lectura
            de capítulos.
          </Text>
          <Text style={[styles.title, { color: colors.text }]}>
            Presiona el icono{" "}
            <Ionicons
              name="ios-bookmarks-outline"
              size={16}
              color={colors.text}
            />{" "}
            en la parte superior para dirigirte a la BibliaAV y agregar
            versículos.
          </Text>
        </View>
      )}
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
              marginBottom: 25,
              fontFamily: "sans-serif-medium",
              fontSize: 16,
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
    marginTop: 400,
    marginBottom: 50,
    marginHorizontal: 10,
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
    fontFamily: "sans-serif-thin",
  },
  textInput: {
    padding: 10,
    marginBottom: 40,
  },
  box: {
    padding: 30,
    marginHorizontal: 20,
  },
  butonEdit: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
    textAlign: "center",
    fontFamily: "sans-serif-medium",
    width: 150
  },
});

export default Rendertemas;
