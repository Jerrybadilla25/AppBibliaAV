import React, { useContext, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../Component/Context/contexUser";
import { getVersiones } from "../api.manual";

const Versiones = ({navigation: { navigate }}) => {
  const { versionBook, setVersionBook } = useContext(UserContext);
  const { colors } = useTheme();
  const { auth, setAuth } = useContext(UserContext);
  const [version, setVersion] = useState([]);

  const getVersion = async () => {
    const res = await getVersiones(auth._id, auth.token);
    setVersion(res.data.getVersion);
  };

  const selectVersion = (id)=>{
    let data  = version.find(x => x._id ===id)
    setVersionBook(data)
    storeVersion(data)
    navigate('Home');

  }

   //guardar tema en memoria del dispositivo
   const storeVersion = async (value) => {
    try {
      let valueJson = JSON.stringify(value);
      await AsyncStorage.setItem("@storage_Key_version", valueJson);
    } catch (e) {
      // saving error
    }
  };

  React.useEffect(() => {
    getVersion();
  }, []);

  return (
    <ScrollView>
      {version.length >= 1 && (
        <View style={styles.container}>
          <ScrollView>
            {version.map((item) => (
              <TouchableOpacity
              onPress={()=>selectVersion(item._id)}
              key={item._id}
              >
                <View
                  
                  style={[styles.row, { backgroundColor: colors.header }]}
                >
                  <Text style={[styles.versionTitle, { color: colors.text }]}>
                    Version : {item.versionBible}
                  </Text>
                  <Text style={[styles.versionText, { color: colors.text }]}>
                    Copyright : {item.copyright}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      alignItems: "center"
      
    },
   row:{
       paddingHorizontal: 50,
       paddingVertical: 10,
       marginVertical: 5,
       borderRadius: 10
   },
   versionTitle:{
       fontSize: 16
   },
   versionText:{
    fontSize: 12
}
  });

export default Versiones;
