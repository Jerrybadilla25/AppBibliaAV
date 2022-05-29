import React, { useContext, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../Component/Context/contexUser";
import {getStart} from '../api.user';

import * as InAppPurchases from 'expo-in-app-purchases';
import * as NavigationBar from 'expo-navigation-bar';


const Home = ({ navigation: { navigate } }) => {
  
  
  const [inicio, setInicio] = useState(null);
  const { isDarkTheme, setIsDarkTheme } = useContext(UserContext);
  const { fontZize, setfontZize } = useContext(UserContext);
  const { versionBook, setVersionBook } = useContext(UserContext);
  const { colors } = useTheme();
  NavigationBar.setBackgroundColorAsync(`${colors.header}`);


  const verseDayDefault = {_id:"622439e198d3618ac7bb1b1c",originCharter:"Genesis 2",numero:7,versiculo:" Entonces Jehová Dios formó al hombre del polvo de la tierra, y sopló en su nariz aliento de vida, y fue el hombre un ser viviente. \n",version:"Reina_Valera_1960",userCreator:"JerryBD",testament:"Antiguo testamento",like:0,view:0,__v:0}

  
  //const items = ['basico', 'premiun']


  React.useEffect(() => {
    iniStart()
    getDataSize()
    getVersion()
    createFavorito()
    createTemas()
  }, []);

  const createFavorito = async ()=>{
    try {
      let fav = await AsyncStorage.getItem('@storage_Key_Favorito')
      let temajson = JSON.parse(fav)
      if(temajson===null){
        let favoritos = []
        await AsyncStorage.setItem('@storage_Key_Favorito', JSON.stringify(favoritos))
      }else{
        //favorito ya esta creado
      }
    } catch (error) {
      console.log(error)
    }
  }

  const createTemas = async ()=>{
    try {
      let tema = await AsyncStorage.getItem('@storage_Key_Temas')
      let temajson = JSON.parse(tema)
      if(temajson===null){
        let temas = []
        await AsyncStorage.setItem('@storage_Key_Temas', JSON.stringify(temas))
      }else{
        //temas ya esta creado
      }
    } catch (error) {
      console.log(error)
    }
  }

  const iniStart = async  ()=>{
    try {
      const data = await getStart()
      setInicio(data)
    } catch (error) {
      setInicio(verseDayDefault)
    }
    
  }

  
  //recuperar version
  const getVersion = async () => {
    try {
      const value = await AsyncStorage.getItem("@storage_Key_version");
      let valueJson = JSON.parse(value);
      if (valueJson === null) {
        let versionDefault = "Reina_Valera_1960"
        setVersionBook(versionDefault);
      } else {
        setVersionBook(valueJson);
      }
    } catch (e) {
      // error reading value
    }
  };

  const getDataSize = async () => {
    try {
      const value = await AsyncStorage.getItem("@storage_Key_Zize");
      let valueJson = JSON.parse(value);
      if (valueJson !== null) {
        setfontZize(valueJson);
      } else {
        setfontZize({
          fonttitle: 22,
          fontsubtitle: 18,
          fonttext: 18,
        });
      }
    } catch (e) {
      // error reading value
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 14, backgroundColor: colors.background, flexDirection: "column", justifyContent: "space-around" }}>

        
        <View style={[styles.box]}>
            <Text style={[styles.boxText, { color: colors.text, fontFamily: 'sans-serif-medium' }]}>Biblia</Text>
            <Text style={[styles.boxsubtext, { color: colors.text, fontFamily: 'monospace' }]}>
              Aliento de Vida
            </Text>
          </View>
          
          <View style={[styles.boxVer]}>
          <ScrollView>
              {inicio && (
                <View style={{ paddingVertical: 10 }}>
                  <Text style={{ paddingVertical: 10, color: colors.text, fontFamily: 'sans-serif-medium', fontSize: fontZize.fontsubtitle }}>
                    {inicio.originCharter}
                  </Text>
                  
                  <Text style={{ paddingVertical: 10, color: colors.text, fontFamily: 'sans-serif-condensed', fontSize: fontZize.fonttext }}>
                  <Text style={{color: colors.textNumber}}> {inicio.numero}</Text>  {inicio.versiculo}
                  </Text>
                  <Text style={{ paddingVertical: 10, color: colors.textNumber, fontFamily: 'Roboto' }}>
                    {inicio.testament}
                  </Text>
                  <Text style={{ paddingVertical: 10, color: colors.text }}>
                    {inicio.title}
                  </Text>
                </View> 
              )}
           </ScrollView>
          </View>
          
        
       
          <Text style={{ paddingVertical: 10, color: colors.text, textAlign: "center", fontFamily: 'monospace' }}>
            {versionBook}
          </Text>

       
      </View>

     
      
      



      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-around",
          paddingVertical: 8,
          minWidth: "32%",
          backgroundColor: colors.header,
        }}
      >
        <TouchableOpacity onPress={() => navigate("Biblia")}>
          <View style={styles.col}>
            <Ionicons
              name="ios-bookmarks-outline"
              size={24}
              color={colors.text}
            />

            <Text style={{ color: colors.textHeader, fontSize: 12 }}>
              Biblia
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate("Usuario")}>
          <View style={styles.col}>
            <Ionicons name="md-heart-outline" size={24} color={colors.text} />

            <Text style={{ color: colors.textHeader, fontSize: 12 }}>
              Favoritos
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate("HistorialScreen")}>
          <View style={styles.col}>
            <Ionicons name="ios-timer-outline" size={24} color={colors.text} />

            <Text style={{ color: colors.textHeader, fontSize: 12 }}>
              Historial
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate("Settings")}>
          <View style={styles.col}>
            <Ionicons
              name="ios-settings-outline"
              size={24}
              color={colors.text}
            />

            <Text style={{ color: colors.textHeader, fontSize: 12 }}>
              Ajustes
            </Text>
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
  col: {
    //flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: 12,
  },
  box: {
    //marginTop: 20,
    flexDirection: "column",
    alignItems: "center",
  },
  boxText: {
    fontSize: 40,
    fontWeight: "bold",
    letterSpacing: 1
  },
  boxsubtext: {
    fontSize: 14,
    
  },
  boxVer: {
    //marginTop: 60,
    padding: 20,
    
  },
});

export default Home;

/*
tipos de fontfamily

<Text style={{fontFamily: 'normal'}}>  normal </Text>
        <Text style={{fontFamily: 'notoserif'}}>  notoserif </Text>
        <Text style={{fontFamily: 'sans-serif'}}>  sans-serif </Text>
        <Text style={{fontFamily: 'sans-serif-light'}}>  sans-serif-light </Text>
        <Text style={{fontFamily: 'sans-serif-thin'}}>  sans-serif-thin </Text>
        <Text style={{fontFamily: 'sans-serif-condensed'}}>  sans-serif-condensed </Text>
        <Text style={{fontFamily: 'sans-serif-medium'}}>  sans-serif-medium </Text>
        <Text style={{fontFamily: 'serif'}}>  serif </Text>
        <Text style={{fontFamily: 'Roboto'}}>  Roboto </Text>
        <Text style={{fontFamily: 'monospace'}}>  monospace </Text> 

*/
