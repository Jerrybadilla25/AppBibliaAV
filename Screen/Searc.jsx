import React, {useState, useContext} from "react";
import {View,Text, TouchableOpacity,StyleSheet,TextInput,ScrollView} from "react-native";
import { useTheme } from "@react-navigation/native";
import {searchCharter} from '../api.manual';
import {UserContext} from '../Component/Context/contexUser';
//import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";



const Searc = ({ route, navigation: { navigate } }) => {
  const {versionBook, setVersionBook} = useContext(UserContext);
  const { auth, setAuth } = useContext(UserContext);
  const { colors } = useTheme();
  const [data, setData]=useState(null);
  const [filter, setFilter]=useState(null);
  const [search, setSearch]=useState({});

  const SearchCharte = async version =>{
      const res = await searchCharter(version, auth.token);
      setData(res.data.SearchChapter);
  }

  const textInputChange = (val)=>{
    //let part2 = val.slice(1);
    //let part1 = val.slice(0, 1);;
    //let final= part1.toUpperCase() + part2;
    setSearch({
      ...search, nameSearch: val
    });
    filterSearch(val)
  }

  const filterSearch = (val)=>{
    let dataFilter = data.filter((x)=>x.charter.toUpperCase().includes(val.toUpperCase()));//convertir a miniscula
    setFilter(dataFilter);
  }

  const sendCharter =(id, idbook)=>{
    navigate('Charter', {_id: id, idbook: idbook});
  }


  React.useEffect(() => {
     SearchCharte(versionBook.versionBible);
  }, []);

  return (
    <View style={styles.container}>
      <View >
        <TextInput
          style={[styles.textInput, { borderColor: colors.border, color: colors.text }]}
          placeholder="Buscar capitulo"
          placeholderText={colors.text}
          placeholderTextColor={colors.inputHolder}
          onChangeText={(val) => textInputChange(val)}
        />
        <Text style={{ color: colors.textNumber, paddingTop: 5, fontSize: 10 }}>
          Ejemplo de busqueda
        </Text>
        <Text style={{ color: colors.text, fontSize: 14 }}>Mateo 24</Text>
      </View>

         {
           filter && 
           (
             <ScrollView style={[styles.col, {backgroundColor: colors.header}]}>
               <View>
                 {
                 filter.map(item => (
                   <TouchableOpacity key={item._id} onPress={()=> sendCharter(item._id, item.idBook)} >
                     <Text style={[styles.textFilter, {color: colors.text, borderBottomColor: colors.border, borderBottomWidth: 1}]} >{item.charter}</Text>
                   </TouchableOpacity>
                   
                 ))
               }
               </View>
               
             </ScrollView>
           )
         }
       
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 20,
  },
  col: {
    flex: 1,
    flexDirection: "column",
    padding: 10,
    marginVertical: 10,
    borderRadius: 10
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
  },
  textFilter:{
    paddingHorizontal: 20,
    paddingVertical: 10,
  }
});

export default Searc;
