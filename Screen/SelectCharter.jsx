import React, {useState, useContext} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import { useTheme } from '@react-navigation/native';
import {UserContext} from '../Component/Context/contexUser'

import Loading from '../Component/Loading';

import Oso from '../Component/Biblias/Oso/charterOso.json';
import Reina from '../Component/Biblias/ReinaValera/charterReinaValera.json';


const SelectCharter = ({route, navigation: { navigate }}) => {
  const { versionBook, setVersionBook} = useContext(UserContext);
  const { colors } = useTheme();
  const [data, setData]=useState();
  

  const ObtainCharter = async id =>{
    switch (versionBook) {
      case "Reina_Valera_1960":
        let date1 = Reina.find(x => x._id ===id)
        setData(date1)
        break;
      case "Biblia_del_oso_1569":
        let date2 = Oso.find(x => x._id ===id)
        setData(date2)
        break;
    }  
  };

  const getCharter =({variables})=>{
    const {_id, version}=variables
    navigate('Charter', {_id: _id, version: version});
  }


  React.useEffect(() => {
    ObtainCharter(route.params._id)
  }, []);


  if (!data) return <Loading/>;
  //if (error) return `Error! ${error.message}`;

  if(data) return (
    <Preview
    colors={colors}
    data={data}
    getCharter={getCharter}
    ></Preview>
  );
};

const Preview = ({data, getCharter, colors})=>(
   <ScrollView style={[styles.container, {backgroundColor: colors.background}]}>
       <Text style={[styles.title, {color: colors.text}]}>{data.book}</Text>
       <View style={styles.row}>
           {
               data.capitulos.map(item =>(
                   <TouchableOpacity
                   style={[styles.button, {backgroundColor: colors.card}]}
                   key={item._id}
                   onPress={()=> getCharter({
                     variables:{
                       _id: item._id,
                       version: item.version
                     }
                   })}
                   >
                    <Text style={[styles.charter, {color: colors.text}]}>{item.order}</Text>
                   </TouchableOpacity>
               ))
           }
       </View>
   </ScrollView>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start"
      },
      button: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 4,
        alignSelf: "flex-start",
        marginHorizontal: "2%",
        marginVertical: "2%",
        marginBottom: 6,
        minWidth: "20%",
      },
      charter: {
        fontSize: 16,
        textAlign: "center",
        fontFamily: 'sans-serif-condensed'
      },
      title:{
        textAlign: "center",
        marginBottom: 8,
        fontSize: 20,
        fontFamily: 'sans-serif-medium'
      }
})

export default SelectCharter;