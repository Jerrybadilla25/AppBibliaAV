import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { getCharterVerses, addVersesTemas, getTemaUserCharter } from "../api.manual";
import { UserContext } from "../Component/Context/contexUser";

//componentes
import Loading from "../Component/Loading";
import Rewind from "../Component/boton/Rewind";
import Forward from "../Component/boton/Forward";
import Like from "../Component/boton/Like";

const Charter = ({ route }) => {
  const { fontZize, setfontZize } = useContext(UserContext);
  const { auth, setAuth } = useContext(UserContext);
  const { colors } = useTheme();
  const { _id, idbook } = route.params;
  const [data, setData] = useState([null]);
  const [modalVisible, setModalVisible] = useState(false);
  const [msj, setMsj]=useState(null);
  const [idVerse, setidVerse]=useState({});
  const [temas, setTemas]=useState();
  
  let cod = "null";

  const obtainCharte = async (id, idbook, cod) => {
    const res = await getCharterVerses(id, idbook, cod, auth.token);
    setData(res.data);
  };

  const getCharterCod = ({ variables }) => {
    setData([null]);
    let { _id, idbook, cod } = variables;
    obtainCharte(_id, idbook, cod);
  };

  const obtainTemas= async (id)=>{
    let res = await getTemaUserCharter(id, auth.token);
    setTemas(res.data.getTemasUser)
  }

  React.useEffect(() => {
    setData([null]);
    obtainCharte(_id, idbook, cod);
    obtainTemas(auth._id)
  }, []);

  const getIDverse = (id)=>{
    setidVerse(id);
    setModalVisible(!modalVisible);
  }

  const addVerseTema = async(title)=>{
    const res = await addVersesTemas(auth._id, title, idVerse, auth.token )
    if(res.data.addVersesTemas){
      setMsj("Versiculo agregado al tema");
      setModalVisible(!modalVisible);
    }
  }




  if (!data.GetCharter) return <Loading />;
  //if (error) return `Error! ${error.message}`;

  if (data.GetCharter)
    return (
      <Preview
        colors={colors}
        data={data}
        getCharterCod={getCharterCod}
        fontZize={fontZize}
        getIDverse={getIDverse}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        temas={temas}
        addVerseTema={addVerseTema}

      ></Preview>
    );

  return <Text></Text>;
};

const Preview = ({ data, colors, getCharterCod, fontZize, getIDverse, setModalVisible, modalVisible, temas, addVerseTema }) => (
  
    <View
      style={[styles.container, { backgroundColor: colors.backgroundColor }]}
    >
      
      <ScrollView>
      <View style={styles.rowFlex}>
        <Rewind data={data} colors={colors} getCharterCod={getCharterCod} />
        <Text
          style={[
            styles.title,
            { color: colors.text, fontSize: fontZize.fonttitle },
          ]}
        >
          {data.GetCharter.charter}
        </Text>
        <Forward data={data} colors={colors} getCharterCod={getCharterCod} />
      </View>

      {data.GetCharter.verses.map((item) => (
        <TouchableOpacity
        key={item._id}
        onLongPress={()=> getIDverse(item._id)}
        >
        <View  style={styles.row}>
          
          <Text
            style={[
              styles.numero,
              { color: colors.textNumber, fontSize: fontZize.fonttext },
            ]}
          >
            {item.numero}

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
        </TouchableOpacity>
      ))}

      <Text
        style={[
          styles.testament,
          { color: colors.textNumber, fontSize: fontZize.fonttext },
        ]}
      >
        {data.GetCharter.testament}
      </Text>

      <Like datos={data} colors={colors} />

      <View style={styles.rowFlex}>
        <Rewind data={data} colors={colors} getCharterCod={getCharterCod} />
        <Forward data={data} colors={colors} getCharterCod={getCharterCod} />
      </View>
      </ScrollView>
      <PreviewModal setModalVisible={setModalVisible} modalVisible={modalVisible} colors={colors} temas={temas} addVerseTema={addVerseTema}/>
    </View>
  
);

const PreviewModal = ({setModalVisible, modalVisible, colors, temas, addVerseTema})=>(
  <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
    Alert.alert("Modal has been closed.");
    setModalVisible(!modalVisible);
    }}
  >
    <View style={[styles.centeredView, {backgroundColor: colors.social}]}>
      <View style={[styles.rowFlex, {marginBottom: 25}]}>
         <Text style={{color: colors.text}}>Selecciones un tema</Text>
         
         <TouchableOpacity
         onPress={()=>setModalVisible(!modalVisible)}
         >
            <Text style={{color: colors.text}}>Cerrar</Text>
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
                    onPress={()=> addVerseTema(item.title)}
                    >
                      <Text style={[styles.textCharter, {backgroundColor: colors.background, color: colors.text}]} >{item.title}</Text>
                    </TouchableOpacity>
                    
                  ))
                }
              </View>
            )
          }
          <Text style={{marginTop: 10, fontSize: 12}}>Agregue el versiculo a un tema</Text>
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
  },
  row: {
    flexDirection: "row",
  },
  title: {
    marginBottom: 8,
    fontWeight: "bold",
  },
  rowFlex: {
    flexDirection: "row",
    justifyContent: "space-between",
    //justifyContent: "space-around",
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
    paddingHorizontal: 20,
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
