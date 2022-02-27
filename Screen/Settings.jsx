import React, { useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { useTheme } from "@react-navigation/native";
import { UserContext } from "../Component/Context/contexUser";
import { Ionicons } from "@expo/vector-icons";
import Ejm from "../Component/boton/ejmSetting";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Setting = ({ navigation: { navigate } }) => {
  const { colors } = useTheme();
  const { isDarkTheme, setIsDarkTheme } = useContext(UserContext);
  const { fontZize, setfontZize } = useContext(UserContext);
  const { auth, setAuth } = useContext(UserContext);

  const closeSesscion = ()=>{
    setAuth(null)
    removeValue()
  }

  const toggleSwitch = () => {
    setIsDarkTheme((isDarkTheme) => !isDarkTheme);
    storeData(!isDarkTheme);
  };

  //borrar datos de inicio del storage
  const storeDataUser = async () => {
    try {
      let valueJson = JSON.stringify("123")
      await AsyncStorage.setItem('@storage_Key_User', valueJson)
    } catch (e) {
      // saving error
    }
  }

  const storeData = async (theme) => {
    try {
      let valueJson = JSON.stringify(theme)
      await AsyncStorage.setItem('@storage_Key_thema', valueJson)
    } catch (e) {
      // saving error
    }
  }

  //guardar tema en memoria del dispositivo
  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('@storage_Key_User')
    } catch(e) {
      // remove error
    }
    console.log('Done.')
  }
 

  const storeDataZize = async () => {
    try {
      let valueJson = JSON.stringify(fontZize);
      await AsyncStorage.setItem("@storage_Key_Zize", valueJson);
    } catch (e) {
      // saving error
    }
  };
  //

  const changeFont = (variable) => {
    if (variable === "addtitle") {
      if (fontZize.fonttitle < 52) {
        setfontZize({
          fonttitle: fontZize.fonttitle + 2,
          fontsubtitle: fontZize.fontsubtitle,
          fonttext: fontZize.fonttext,
        });
        storeDataZize();
      }
    }
    if (variable === "lesstitle") {
      if (fontZize.fonttitle > 14) {
        setfontZize({
          fonttitle: fontZize.fonttitle - 2,
          fontsubtitle: fontZize.fontsubtitle,
          fonttext: fontZize.fonttext,
        });
        storeDataZize();
      }
    }

    if (variable === "addtext") {
      if (fontZize.fonttext < 42) {
        setfontZize({
          fonttitle: fontZize.fonttitle,
          fontsubtitle: fontZize.fontsubtitle,
          fonttext: fontZize.fonttext + 1,
        });
        storeDataZize();
      }
    }
    if (variable === "lesstext") {
      if (fontZize.fonttext > 10) {
        setfontZize({
          fonttitle: fontZize.fonttitle,
          fontsubtitle: fontZize.fontsubtitle,
          fonttext: fontZize.fonttext - 1,
        });

        storeDataZize();
      }
    }

    if (variable === "addsubtitle") {
      if (fontZize.fontsubtitle < 48) {
        setfontZize({
          fonttitle: fontZize.fonttitle,
          fontsubtitle: fontZize.fontsubtitle + 1,
          fonttext: fontZize.fonttext,
        });

        storeDataZize();
      }
    }
    if (variable === "lesssubtitle") {
      if (fontZize.fontsubtitle > 12) {
        setfontZize({
          fonttitle: fontZize.fonttitle,
          fontsubtitle: fontZize.fontsubtitle - 1,
          fonttext: fontZize.fonttext,
        });

        storeDataZize();
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 2 }}>
        <Ejm fontZize={fontZize} />
      </View>

      <View
        style={[styles.box, { flex: 2, backgroundColor: colors.boxseting }]}
      >
        <View style={styles.container}>
          <View style={styles.row}>
            <Ionicons
              name="ios-settings-outline"
              size={24}
              color={colors.text}
            />

            <Text style={{ color: colors.text, marginHorizontal: 10 }}>
              Ajustes
            </Text>
          </View>
          <View style={[styles.rowBox, { borderTopColor: colors.border }]}>
            <View
              style={[styles.rowseting, { marginTop: 15, marginBottom: 15 }]}
            >
              {isDarkTheme ? (
                <Text style={{ color: colors.text }}>Cambiar a modo claro</Text>
              ) : (
                <Text style={{ color: colors.text }}>
                  Cambiar a modo oscuro
                </Text>
              )}

              <Switch
                trackColor={{ false: "#140e1b", true: "#ffffff" }}
                thumbColor={isDarkTheme ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isDarkTheme}
              />
            </View>
          </View>

          <View>
            <View style={styles.rowseting}>
              <Text style={{ color: colors.text, paddingBottom: 4 }}>
                Tamaña del titulo-{fontZize.fonttitle}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={() => changeFont("lesstitle")}>
                  <Text
                    style={[
                      styles.boxButton,
                      { color: colors.text, borderColor: colors.text },
                    ]}
                  >
                    -
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => changeFont("addtitle")}>
                  <Text
                    style={[
                      styles.boxButton,
                      { color: colors.text, borderColor: colors.text },
                    ]}
                  >
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View>
            <View style={styles.rowseting}>
              <Text style={{ color: colors.text, paddingBottom: 4 }}>
                Tamaña del subtitulo-{fontZize.fontsubtitle}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={() => changeFont("lesssubtitle")}>
                  <Text
                    style={[
                      styles.boxButton,
                      { color: colors.text, borderColor: colors.text },
                    ]}
                  >
                    -
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => changeFont("addsubtitle")}>
                  <Text
                    style={[
                      styles.boxButton,
                      { color: colors.text, borderColor: colors.text },
                    ]}
                  >
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View>
            <View style={styles.rowseting}>
              <Text style={{ color: colors.text, paddingBottom: 4 }}>
                Tamaña del texto-{fontZize.fonttext}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={() => changeFont("lesstext")}>
                  <Text
                    style={[
                      styles.boxButton,
                      { color: colors.text, borderColor: colors.text },
                    ]}
                  >
                    -
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => changeFont("addtext")}>
                  <Text
                    style={[
                      styles.boxButton,
                      { color: colors.text, borderColor: colors.text },
                    ]}
                  >
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          
          <TouchableOpacity onPress={closeSesscion}>
             <Text style={{
               color: colors.textNumber,
                textAlign: "center",
                fontSize: 18,
                fontFamily: 'Roboto',
                marginTop: 15
               }}>Cerrar session</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

/*
 <View >
            <View style={styles.rowseting}>
              <Text style={{ color: colors.text, paddingBottom: 4 }}>
                Tamaña del numero-{fontZize.fontsubtitle}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={() => changeFont("lessnumber")}>
                  <Text
                    style={[
                      styles.boxButton,
                      { color: colors.text, borderColor: colors.text },
                    ]}
                  >
                    -
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => changeFont("addnumber")}>
                  <Text
                    style={[
                      styles.boxButton,
                      { color: colors.text, borderColor: colors.text },
                    ]}
                  >
                    +
                  </Text>
                </TouchableOpacity>

                
              </View>
            </View>
          </View>
*/

const styles = StyleSheet.create({
  box: {
    borderTopRightRadius: 60,
    borderTopLeftRadius: 60,
    marginHorizontal: 2,
  },
  boxButton: {
    width: 50,
    height: 30,
    marginHorizontal: 5,
    borderRadius: 5,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    borderWidth: 1,
  },
  container: {
    flex: 1,
    margin: 20,
    padding: 6,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 20,
  },
  rowseting: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 5,
    paddingTop: 5,
  },
  rowBox: {
    borderTopWidth: 1,
  },
});

export default Setting;
