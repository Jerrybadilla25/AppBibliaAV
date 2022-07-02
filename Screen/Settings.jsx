import React, { useContext, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Switch, ScrollView } from "react-native";
import { useTheme } from "@react-navigation/native";
import { UserContext } from "../Component/Context/contexUser";
import { Ionicons } from "@expo/vector-icons";
import Ejm from "../Component/boton/ejmSetting";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Slider from "@react-native-community/slider";


const Setting = ({ navigation: { navigate } }) => {
  const { colors } = useTheme();
  const {
    isDarkTheme,
    setIsDarkTheme,
    viewBiblia,
    setViewBiblia,
    fontZize,
    setfontZize,
  } = useContext(UserContext);

  const setValueText = (val1) => {
    setfontZize({
      fonttitle: fontZize.fonttitle,
      fontsubtitle: fontZize.fontsubtitle,
      fonttext: val1,
    });
    storeDataZize();
  };

  const setValueTitle = (val2) => {
    setfontZize({
      fonttitle: val2,
      fontsubtitle: fontZize.fontsubtitle,
      fonttext: fontZize.fonttext,
    });
    storeDataZize();
  };

  const setValueSubTitle = (val3) => {
    setfontZize({
      fonttitle: fontZize.fonttitle,
      fontsubtitle: val3,
      fonttext: fontZize.fonttext,
    });
    storeDataZize();
  };

  const toggleSwitch = () => {
    setIsDarkTheme((isDarkTheme) => !isDarkTheme);
    storeData(!isDarkTheme);
  };

  const toggleSwitchView = async (vista) => {
    setViewBiblia(!viewBiblia);
    await AsyncStorage.setItem(
      "@storage_Key_View",
      JSON.stringify(!viewBiblia)
    );
  };

  const storeData = async (theme) => {
    try {
      let valueJson = JSON.stringify(theme);
      await AsyncStorage.setItem("@storage_Key_thema", valueJson);
    } catch (e) {
      // saving error
    }
  };

  const storeDataZize = async () => {
    try {
      let valueJson = JSON.stringify(fontZize);
      await AsyncStorage.setItem("@storage_Key_Zize", valueJson);
    } catch (e) {
      // saving error
    }
  };
  

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 2 }}>
        <Ejm fontZize={fontZize} />
      </View>

      <View
        style={[styles.box, { flex: 3, backgroundColor: colors.boxseting }]}
      >
        <ScrollView>
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
                style={[styles.rowseting, { marginTop: 14, paddingBottom: 14 }]}
              >
                {isDarkTheme ? (
                  <Text style={{ color: colors.text }}>
                    Cambiar vista a modo claro
                  </Text>
                ) : (
                  <Text style={{ color: colors.text }}>
                    Cambiar vista a modo oscuro
                  </Text>
                )}

                <Switch
                  trackColor={{ false: "#140e1b", true: "#ffffff" }}
                  thumbColor={isDarkTheme ? "#f5dd4b" : "#f4f3f4"}
                  //ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isDarkTheme}
                />
              </View>
              <View style={[styles.rowseting, { paddingBottom: 10 }]}>
                {viewBiblia ? (
                  <Text style={{ color: colors.text }}>
                    Cambiar a vista lista
                  </Text>
                ) : (
                  <Text style={{ color: colors.text }}>
                    Cambiar a vista cuadricula
                  </Text>
                )}

                <Switch
                  trackColor={{ false: "#140e1b", true: "#ffffff" }}
                  thumbColor={viewBiblia ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitchView}
                  value={viewBiblia}
                />
              </View>
            </View>

            <View style={{ paddingBottom: 6, paddingTop: 8 }}>
              <Text style={{ color: colors.text, textAlign: "center" }}>
                Tamaño de letra titulos{" "}
                {fontZize.fonttitle && fontZize.fonttitle + 1}
              </Text>
              <Slider
                style={{ width: 300, height: 40 }}
                step={1}
                {...fontZize.fonttitle}
                minimumValue={14}
                maximumValue={52}
                minimumTrackTintColor={colors.text}
                maximumTrackTintColor={colors.textNumber}
                onValueChange={(val2) => setValueTitle(val2)}
              />
            </View>

            <View style={{ paddingBottom: 6 }}>
              <Text style={{ color: colors.text, textAlign: "center" }}>
                Tamaño de letra subtitulo{" "}
                {fontZize.fontsubtitle && fontZize.fontsubtitle + 1}
              </Text>
              <Slider
                style={{ width: 300, height: 40 }}
                step={1}
                {...fontZize.fontsubtitle}
                minimumValue={12}
                maximumValue={48}
                minimumTrackTintColor={colors.text}
                maximumTrackTintColor={colors.textNumber}
                onValueChange={(val3) => setValueSubTitle(val3)}
              />
            </View>

            <View style={{ paddingBottom: 6 }}>
              <Text style={{ color: colors.text, textAlign: "center" }}>
                Tamaño de letra texto{" "}
                {fontZize.fonttext && fontZize.fonttext + 1}
              </Text>
              <Slider
                style={{ width: 300, height: 40 }}
                step={1}
                {...fontZize.fonttext}
                minimumValue={10}
                maximumValue={40}
                minimumTrackTintColor={colors.text}
                maximumTrackTintColor={colors.textNumber}
                onValueChange={(val1) => setValueText(val1)}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

/*

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
    paddingBottom: 10,
  },
  rowseting: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowBox: {
    borderTopWidth: 1,
  },
});

export default Setting;
