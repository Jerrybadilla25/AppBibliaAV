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
import { getVersesTemas, deleteVerseTema } from "../api.manual";

const Rendertemas = ({ route, navigation: { navigate } }) => {
  const { fontZize, setfontZize } = useContext(UserContext);
  const { colors } = useTheme();
  const { auth, setAuth } = useContext(UserContext);
  const [temasVerse, setTemasVerse] = useState({});
  const [arrayTema, setArrayTema] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [idverse, setIdverse] = useState(null);

  const getTemas = async (id, title) => {
    let res = await getVersesTemas(id, title, auth.token);
    setTemasVerse({
      _id: res.data.getfullTemas._id,
      title: res.data.getfullTemas.title,
    });
    setArrayTema(res.data.getfullTemas.arrayTemas);
  };

  const deleteverse = async () => {
    let res = await deleteVerseTema(
      auth._id,
      temasVerse.title,
      idverse,
      auth.token
    );
    if (res.data.deleteVerse) {
      let idx = arrayTema.findIndex((x) => x._id === idverse);
      let cut = arrayTema.splice(idx, 1);
      setArrayTema(arrayTema);
      setModalVisible(!modalVisible);
    }
  };

  const openModal = (id) => {
    setIdverse(id);
    setModalVisible(!modalVisible);
  };

  React.useEffect(() => {
    getTemas(route.params.id, route.params.title);
  }, []);

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
          {temasVerse.title}
        </Text>
      </View>

      {arrayTema.map((item) => (
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
                {item.originCharter} :{" "}
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
              {item.verses}
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
