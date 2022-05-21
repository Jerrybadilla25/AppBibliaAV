import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Modal
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { UserContext } from "../Component/Context/contexUser";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Versos from "../Component/Biblias/versosall.json";

const SearchPalabra = ({ route, navigation: { navigate } }) => {
  const { versionBook, setVersionBook,  fontZize, setfontZize } = useContext(UserContext);
  const { colors } = useTheme();
  const [filter, setFilter] = useState(null);
  const [palabra, setPalabra] = useState(null);
  const [estado, setEstado] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [temas, setTemas]=useState(null)
  const [verseNew, setVerseNew]=useState(null)

  React.useEffect(() => {
    obtainTemas()
  }, []);

  const textInputChange = (val) => {
    if (val.length === 0) {
      setEstado(false);
      setFilter(null)
    } else {
      setPalabra(val);
      setEstado(true);
    }
  };

  const buscarPalabra = () => {
    try {
      if (palabra.length === 0) {
        setEstado(false);
      } else {
        setFilter(null);
        let dataFilter = Versos.filter((x) =>
          x.versiculo.toUpperCase().includes(palabra.toUpperCase())
        );
        setFilter(dataFilter);
      }
    } catch (error) {}
  };

  const addTema = ({variables})=>{
    setVerseNew(variables)
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
      temaSelect.addVerses.push(verseNew)
      let idx = temas.findIndex(x => x._id === id)
      temas.splice(idx, 1, temaSelect)
      await AsyncStorage.setItem('@storage_Key_Temas', JSON.stringify(temas))
    //setMsj("Versiculo agregado al tema");
      setModalVisible(!modalVisible);
    } catch (error) {
      
    }
  }





  const PreviewModal = ({setModalVisible, colors, modalVisible} )=>(
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
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







  return (
    <View style={[styles.container,{padding: 10}]}>
      <View >
        <Text style={[styles.textTitle, { color: colors.text }]}>
          Buscar versiculos segun la siguiente palabra
        </Text>
        <TextInput
          style={[
            styles.textInput,
            { borderColor: colors.border, color: colors.text },
          ]}
          placeholder="Buscar palabra en toda la biblia"
          placeholderText={colors.text}
          placeholderTextColor={colors.inputHolder}
          onChangeText={(val) => textInputChange(val)}
        />

        {estado ? (
          <TouchableOpacity onPress={buscarPalabra}>
            <Text
              style={[
                styles.boton,
                { color: colors.header, backgroundColor: colors.text },
              ]}
            >
              Buscar
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <Text
              style={[
                styles.boton,
                { color: colors.header, backgroundColor: colors.text },
              ]}
            >
              Esperando palabra...
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {
        filter && <Text 
        style={{color: colors.text, fontSize: 14, textAlign: "center"}}
        >La palabra <Text style={{color: colors.textNumber}} >{palabra}</Text> aparece en <Text style={{color: colors.textNumber}}>{filter.length}</Text>  versiculos. </Text>
      }

      

      {filter && (
        <ScrollView style={[styles.col, {}]}>
          <View>
            {filter.map((item) => (
              <TouchableOpacity 
               key={item._id}
               onLongPress={()=>{
                 addTema({variables:{
                   numero: item.numero,
                   originCharter: item.originCharter,
                   versiculo: item.versiculo,
                   version: "Reina_Valera_1960",
                   _id: item._id,
                 }});
                 setModalVisible(!modalVisible);
                 }}
               >
              <View
                style={[styles.item, { backgroundColor: colors.header }]}
                
              >
                <Text
                  style={{
                    color: colors.text,
                    fontFamily: "sans-serif-medium",
                    paddingBottom: 6,
                    fontSize: fontZize.fontsubtitle
                  }}
                >
                  {item.originCharter}
                </Text>

                <Text style={{ color: colors.textNumber, fontSize: fontZize.fonttext }}>
                  {item.numero}
                  <Text> </Text>
                  <Text style={{ color: colors.text }}>{item.versiculo}</Text>
                </Text>
              </View>
              </TouchableOpacity>
            ))}
          </View>
        
            <PreviewModal
            setModalVisible={setModalVisible}
            modalVisible={modalVisible}
            colors={colors}
           />
           
        
          
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    //padding: 10,
  },
  col: {
    flex: 1,
    flexDirection: "column",
    //paddingHorizontal: 5,
    marginVertical: 10,
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
  },
  textFilter: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  textTitle: {
    fontFamily: "sans-serif-medium",
    paddingBottom: 20,
    fontSize: 14,
  },
  boton: {
    marginVertical: 10,
    fontSize: 14,
    height: 45,
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
    textAlign: "center",
    paddingVertical: 10,
  },
  item: {
    marginVertical: 10,
    padding: 12,
  },
  centeredView: {
    marginVertical: 100,
    marginHorizontal: 10,
    paddingHorizontal: 15,
    paddingVertical: 30,
    borderRadius: 10,
  },
  rowFlex: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 5,
    paddingVertical: 4,
    marginVertical: 4,
  },
  textCharter: {
    fontSize: 16,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  Item: {
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  
});

export default SearchPalabra;
