import React, { useState } from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  StatusBar,
  Easing,
} from "react-native";
import {
  createNativeStackNavigator,
  TransitionSpecs,
} from "@react-navigation/native-stack";
  
  
//archivos
import BibliaScreen from "./Screen/Biblia";
import SearchScreen from "./Screen/Searc";
import HomeScreen from "./Screen/Home";
import SelectCharter from "./Screen/SelectCharter";
import CharterScreen from "./Screen/Charter";
import SettingsScrean from "./Screen/Settings";
import UsuarioScreen from "./Screen/User";
import RenderTemas from './Screen/RenderTemas';
import Versiones from './Screen/Versiones';
import HelpScreen from './Screen/Help'
import PoliticaScreen from './Screen/Politica'
import SearchPalabra from './Screen/SearchPalabra';

import { UserContext } from "./Component/Context/contexUser";
import { Ionicons } from "@expo/vector-icons";



const Stack = createNativeStackNavigator();

const App = ({ navigation, children }) => {
  
  const [versionBook, setVersionBook] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const [fontZize, setfontZize] = useState(null);

  
    

  const CustomDefaultTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#f2f2f2",
      text: "#0E1218",
      card: "#ffffff",
      textNumber: "#FF001A",
      header: "#ffffff",
      headerAct: "##554270",
      textHeader: "#0E1218",
      boxseting: "#ffffff",
      boxTema: "#c2bcbc",
      border: "#5b4475",
      social: "#91B0F3",
      bar: "black",
      inputHolder: "#7c7e83",
    },
  };

  const CustomDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: "#140e1b",
      text: "#f3f4f6",
      card: "#231830",
      textNumber: "#e60017",
      header: "#241c30",
      headerAct: "#140e1b",
      textHeader: "#f3f4f6",
      boxseting: "#292032",
      boxTema: "#302640",
      border: "#5b4475",
      social: "#604589",
      bar: "#241c30",
      inputHolder: "#7c7e83",
    },
  };

  const config = {
    animation: "spring",
    config: {
      stiffness: 2000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };
  const closeConfig = {
    animation: "timing",
    config: {
      duration: 500,
      easing: Easing.linear,
    },
  };

  

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const Search = ({ navigation }) => (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity onPress={() => navigation.navigate("Search")}>
        <View style={styles.rowIcon}>
          <Ionicons name="search" size={24} color={theme.colors.text} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Buscar")}>
        <View style={styles.rowIcon}>
          <View style={{flexDirection: "column"}}>
            <Ionicons
            name="ios-search-circle-sharp"
            size={22}
            color={theme.colors.text}
          />
          <Text style={{fontSize: 6}}>Palabra</Text>
          </View>
          
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <View style={styles.rowIcon}>
          <Ionicons name="home-outline" size={24} color={theme.colors.text} />
        </View>
      </TouchableOpacity>
    </View>
  );



  const Version = ({ navigation }) => (
    <TouchableOpacity 
    onPress={() => navigation.navigate("Versiones")}
    style={{ width: 140 }}>
        <View style={{ paddingLeft: 50, paddingTop: 10 }}>
          <Text style={{ color: theme.colors.text }}>Versiones</Text>
        </View>
    </TouchableOpacity>
  );


    return (
      <UserContext.Provider
        value={{
          isDarkTheme,
          setIsDarkTheme,
          versionBook,
          setVersionBook,
          fontZize,
          setfontZize
        }}
      >
        <NavigationContainer theme={theme}>
          <StatusBar backgroundColor={theme.colors.bar} />
          <Stack.Navigator
            screenOptions={{
              headerMode: "screen",
              animation: "slide_from_left",
              gestureEnable: true,
              gestureDirecction: "horizontal",
              transitionSpec: {
                open: config,
                close: closeConfig,
              },
            }}
          >
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={({navigation})=>({
                headerTitle: "Inicio",
                headerStyle: { backgroundColor: theme.colors.header },
                headerTitleStyle: { color: theme.colors.textHeader },
                headerRight: () => <Version navigation={navigation} />,
              })}
            />

             <Stack.Screen
              name="Help"
              component={HelpScreen}
              options={({navigation})=>({
                headerTitle: "Ayuda",
                headerStyle: { backgroundColor: theme.colors.header },
                headerTitleStyle: { color: theme.colors.textHeader },
              })}
            />

             <Stack.Screen
              name="Versiones"
              component={Versiones}
              options={({navigation})=>({
                headerTitle: "Versiones",
                headerStyle: { backgroundColor: theme.colors.header },
                headerTitleStyle: { color: theme.colors.textHeader },
              })}
            />

            <Stack.Screen
              name="Usuario"
              component={UsuarioScreen}
              options={({navigation})=>({
                headerTitle: "Datos de usuario",
                headerStyle: { backgroundColor: theme.colors.header },
                headerTitleStyle: { color: theme.colors.textHeader },
                headerRight: () => (
                  <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                    <Ionicons
                      style={{ paddingEnd: 20 }}
                      name="home-outline"
                      size={24}
                      color={theme.colors.text}
                    />
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen
              name="Politica"
              component={PoliticaScreen}
              options={({navigation})=>({
                headerTitle: "Politica de Privacidad",
                headerStyle: { backgroundColor: theme.colors.header },
                headerTitleStyle: { color: theme.colors.textHeader },
                headerRight: () => (
                  <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                    <Ionicons
                      style={{ paddingEnd: 20 }}
                      name="home-outline"
                      size={24}
                      color={theme.colors.text}
                    />
                  </TouchableOpacity>
                ),
              })}
            />

            <Stack.Screen
              name="Search"
              component={SearchScreen}
              options={{
                headerTitle: "Buscar",
                headerStyle: { backgroundColor: theme.colors.header },
                headerTitleStyle: { color: theme.colors.textHeader },
              }}
            />

            <Stack.Screen
              name="Biblia"
              component={BibliaScreen}
              options={({ navigation }) => ({
                headerStyle: { backgroundColor: theme.colors.header },
                headerTitle: "Libros",
                headerTitleStyle: { color: theme.colors.textHeader },
                headerTintColor: `${theme.colors.text}`,
                headerRight: () => <Search navigation={navigation} />,
              })}
            />

              <Stack.Screen
              name="Temas"
              component={RenderTemas}
              options={({ navigation })=>({
                headerStyle: { backgroundColor: theme.colors.header },
                headerTitleStyle: { color: theme.colors.textHeader },
                headerRight: () => (
                  <View style={{flexDirection: "row"}}>
                    <TouchableOpacity onPress={() => navigation.navigate("Biblia")}>
                    <Ionicons
                      style={{ paddingEnd: 20 }}
                      name="ios-bookmarks-outline"
                      size={24}
                      
                      color={theme.colors.text}
                    />
                  </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                    <Ionicons
                      style={{ paddingEnd: 20 }}
                      name="home-outline"
                      size={24}
                      color={theme.colors.text}
                    />
                  </TouchableOpacity>

                  </View>
                  
                ),
              })}
            />

              <Stack.Screen
              name="Buscar"
              component={SearchPalabra}
              options={({ navigation })=>({
                headerStyle: { backgroundColor: theme.colors.header },
                headerTitle: "Buscar palabra",
                headerTitleStyle: { color: theme.colors.textHeader },
                headerRight: () => (
                  <View style={{flexDirection: "row"}}>
                    <TouchableOpacity onPress={() => navigation.navigate("Biblia")}>
                    <Ionicons
                      style={{ paddingEnd: 20 }}
                      name="ios-bookmarks-outline"
                      size={24}
                      
                      color={theme.colors.text}
                    />
                  </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                    <Ionicons
                      style={{ paddingEnd: 20 }}
                      name="home-outline"
                      size={24}
                      color={theme.colors.text}
                    />
                  </TouchableOpacity>

                  </View>
                  
                ),
              })}
            />

            <Stack.Screen
              name="SelectCharter"
              component={SelectCharter}
              options={({ navigation }) => ({
                headerStyle: { backgroundColor: theme.colors.header },
                headerTitle: "Capitulos",
                headerTitleStyle: { color: theme.colors.textHeader },
                headerTintColor: `${theme.colors.text}`,
                headerRight: () => <Search navigation={navigation} />,
              })}
            />

            <Stack.Screen
              name="Charter"
              component={CharterScreen}
              options={({ navigation }) => ({
                headerStyle: { backgroundColor: theme.colors.header },
                headerTitle: "Biblia AV",
                headerTitleStyle: { color: theme.colors.textHeader },
                headerTintColor: `${theme.colors.text}`,
                headerRight: () => (
                  <View style={{flexDirection: "row"}}>
                    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                    <Ionicons
                      style={{ paddingEnd: 20 }}
                      name="home-outline"
                      size={24}
                      color={theme.colors.text}
                    />
                  </TouchableOpacity>
                  {/* 
                  <TouchableOpacity onPress={() => navigation.navigate("Usuario")}>
                    <Ionicons
                      style={{ paddingEnd: 20 }}
                      name="md-heart-outline"
                      size={24}
                      color={theme.colors.text}
                    />
                  </TouchableOpacity>*/}
                  <TouchableOpacity onPress={() => navigation.navigate("Biblia")}>
                    <Ionicons
                      style={{ paddingEnd: 20 }}
                      name="ios-bookmarks-outline"
                      size={24}
                      color={theme.colors.text}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
                    <Ionicons
                      style={{ paddingEnd: 20 }}
                      name="ios-text"
                      size={24}
                      color={theme.colors.text}
                    />
                  </TouchableOpacity>

                  </View>
                  
                ),
                //headerRight: () => <Search navigation={navigation} />,
              })}
            />

            <Stack.Screen
              name="Settings"
              component={SettingsScrean}
              options={({ navigation }) => ({
                headerStyle: { backgroundColor: theme.colors.header },
                headerTitle: "Ajustes",
                headerTitleStyle: { color: theme.colors.textHeader },
                headerTintColor: `${theme.colors.text}`,
                headerRight: () => (
                  <View style={{flexDirection: "row"}}>
                    <TouchableOpacity onPress={() => navigation.navigate("Biblia")}>
                    <Ionicons
                      style={{ paddingEnd: 20 }}
                      name="ios-bookmarks-outline"
                      size={24}
                      color={theme.colors.text}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                    <Ionicons
                      style={{ paddingEnd: 20 }}
                      name="home-outline"
                      size={24}
                      color={theme.colors.text}
                    />
                  </TouchableOpacity>
                  </View>
                ),
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </UserContext.Provider>
    );
  
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginHorizontal: 5,
    borderRadius: 50,
  },
  rowIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
    borderRadius: 50,
  },
});

export default App;
