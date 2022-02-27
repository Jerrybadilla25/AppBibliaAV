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
import { userGetLikes } from "../api.manual";
import { UserContext } from "../Component/Context/contexUser";
import { Ionicons } from "@expo/vector-icons";
import { createTemaUser, getTemaUser, deleteTema, deleteLike} from "../api.manual";

const User = ({route, navigation: { navigate } }) => {
  const { colors } = useTheme();
  const { auth, setAuth } = useContext(UserContext);
  const [likes, setLikes] = useState(null);
  const [estado, setEstado] = useState("temas");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleTwo, setModalVisibleTwo] = useState(false);
  const [modalVisibleTree, setModalVisibleTree] = useState(false);
  const [temas, setTemas] = useState([]);
  const [title, setTitle]=useState(null);
  const [idLike, setIDLike]=useState(null);
  let data = "";

  const getUserLikes = async () => {
    const res = await userGetLikes(auth._id, auth.token);
    setLikes(res.data.userGetLike);
  };

  const SendLike = (id) => {
    navigate("Charter", { _id: id, idbook: "1" });
  };

  React.useEffect(() => {
    getUserLikes();
    getTemasUser();
  }, []);

  const changeEstado = () => {
    setEstado("temas");
  };
  const changeEstadoTemas = () => {
    setEstado("like");
  };

  const textInputChange = (val) => {
    data = val;
  };

  const getTemasUser = async () => {
    const res = await getTemaUser(auth._id, auth.token);
    setTemas(res.data.getTemasUser);
  };
  
  const saveTema = async () => {
    let userID = auth._id;
    const res = await createTemaUser(userID, data, auth.token);
    setTemas(res.data.createTema);
    setModalVisible(!modalVisible);
  };

  const ModalViewTema = async (tema)=>{
    navigate('Temas', {id: auth._id, title: tema});
  }

  const cerrarModalTwo = ()=>{
    setModalVisibleTwo(!modalVisibleTwo)
  }

  const cerrarModalTree = ()=>{
    setModalVisibleTree(!modalVisibleTree)
  }

  const openModal= (title)=>{
    setTitle(title);
    setModalVisibleTwo(!modalVisibleTwo);
  }

  const openModalTree= (id)=>{
    setIDLike(id);
    setModalVisibleTree(!modalVisibleTree);
  }

  const deleteIDLike = async ()=>{
    const res = await deleteLike(auth._id, idLike, auth.token)
    if(res.data.deleteLike){
      setModalVisibleTree(!modalVisibleTree)
      let like = likes
      let idx = like.findIndex(X => X._id === idLike)
      let cut = like.splice(idx, 1)
      setLikes(like)
      setIDLike(null)
    }
  }

  const deleteTemaUser = async ()=>{
    const res = await deleteTema(auth._id, title, auth.token)
    setTemas(res.data.deleteTema)
    setModalVisibleTwo(!modalVisibleTwo);
    setTitle(null);
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
            Capitulos que me gustan
          </Text>
          <ScrollView>
            <View style={styles.row}>
            {likes.map((x) => (
              <TouchableOpacity
                key={x._id}
                onPress={() => SendLike(x._id)}
                onLongPress={()=> openModalTree(x._id)}
                
              >
                <View style={[styles.button, { backgroundColor: colors.header }]}  >
                  <Text style={[styles.textCharter, { color: colors.text }]}>
                  {x.charter}
                </Text>
                <Text
                  style={[styles.textDetalles, { color: colors.textNumber }]}
                >
                  ver...
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
                  keyboardType="visible-password"
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
                      onPress={() => ModalViewTema(x.title)}
                      onLongPress={()=>openModal(x.title)}
                    >
                      <Text
                        key={x._id}
                        style={[styles.textCharter, { color: colors.text }]}
                      >
                        {x.title}
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

      <View style={[styles.flex1, { flex: 1, backgroundColor: colors.header, borderTopColor: colors.border }]}>
        <TouchableOpacity onPress={changeEstadoTemas}>
          <View style={styles.col}>
          <Ionicons name="heart-outline" size={20} color={colors.text} />
          <Text style={{ color: colors.text, fontSize: 10 }}>Me Gusta</Text>
          </View>
        
        </TouchableOpacity>

        <TouchableOpacity onPress={changeEstado}>
          <View style={styles.col}>
          <Ionicons name="clipboard-outline" size={20} color={colors.text} />
          <Text style={{ color: colors.text,  fontSize: 10}}>Mis temas</Text>
          </View>
        
        </TouchableOpacity>

        <TouchableOpacity onPress={redirectHelp}>
          <View style={styles.col}>
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
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderWidth: 1
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
      paddingBottom: 5,
      width: 70
    }
});

export default User;
