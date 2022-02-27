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

//import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

//archivos
import BibliaScreen from "./Screen/Biblia";
import SearchScreen from "./Screen/Searc";
import HomeScreen from "./Screen/Home";
import SelectCharter from "./Screen/SelectCharter";
import CharterScreen from "./Screen/Charter";
import SettingsScrean from "./Screen/Settings";
import UsuarioScreen from "./Screen/User";
import Register from "./Screen/Login/Register";
import Login from "./Screen/Login/Login";
import RenderTemas from './Screen/RenderTemas';
import Versiones from './Screen/Versiones';
import HelpScreen from './Screen/Help'
import PoliticaScreen from './Screen/Politica'

import { UserContext } from "./Component/Context/contexUser";
import { Ionicons } from "@expo/vector-icons";

//import { useContext } from "react/cjs/react.development";

const Stack = createNativeStackNavigator();

const App = ({ navigation, children }) => {
  const [auth, setAuth] = useState(null);
  const [versionBook, setVersionBook] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const [fontZize, setfontZize] = useState(null);
  


  const CustomDefaultTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#F2F2F2",
      text: "#0E1218",
      card: "#ffffff",
      textNumber: "#FF001A",
      header: "#ffffff",
      textHeader: "#0E1218",
      boxseting: "#DAD7D7",
      border: "#5b4475",
      social: "#91B0F3",
      bar: "black",
      inputHolder: "#D0D3DB",
    },
  };

  const CustomDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: "#140e1b",
      text: "#f3f4f6",
      card: "#231830",
      textNumber: "#FF001A",
      header: "#241c30",
      textHeader: "#f3f4f6",
      boxseting: "#292032",
      border: "#5b4475",
      social: "#604589",
      bar: "#241c30",
      inputHolder: "#3A3B3D",
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
    <TouchableOpacity
      style={{ width: 70 }}
      onPress={() => navigation.navigate("Search")}
    >
      <View style={styles.row}>
        <Ionicons name="search" size={24} color={theme.colors.text} />
      </View>
    </TouchableOpacity>
  );

  const Version = ({ navigation }) => (
    <TouchableOpacity 
    onPress={() => navigation.navigate("Versiones")}
    style={{ width: 140 }}>
      {auth.setting.versionesView ? (
        <View style={{ paddingLeft: 50, paddingTop: 10 }}>
          <Text style={{ color: theme.colors.text }}>Versiones</Text>
        </View>
      ) : (
        <Text></Text>
      )}
    </TouchableOpacity>
  );

  if (auth === null) {
    return (
      <UserContext.Provider value={{ auth, setAuth }}>
        <NavigationContainer>
          <StatusBar />
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
              name="Inicio"
              component={Login}
              options={{
                headerStyle: { backgroundColor: "#DDDCF3" },
                headerTitleStyle: { color: "#0051FF" },
              }}
            />
            <Stack.Screen
              name="Registro"
              component={Register}
              options={{
                headerStyle: { backgroundColor: "#DDDCF3" },
                headerTitleStyle: { color: "#0051FF" },
                headerTintColor: "#0051FF"
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </UserContext.Provider>
    );
  }

  if (auth.token) {
    return (
      <UserContext.Provider
        value={{
          isDarkTheme,
          setIsDarkTheme,
          versionBook,
          setVersionBook,
          fontZize,
          setfontZize,
          auth,
          setAuth,
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
                  <TouchableOpacity onPress={() => navigation.navigate("Usuario")}>
                    <Ionicons
                      style={{ paddingEnd: 20 }}
                      name="md-heart-outline"
                      size={24}
                      color={theme.colors.text}
                    />
                  </TouchableOpacity>
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
          </Stack.Navigator>
        </NavigationContainer>
      </UserContext.Provider>
    );
  }
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
});

export default App;
