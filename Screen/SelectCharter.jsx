import React, {useState, useContext} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import { useTheme } from '@react-navigation/native';
import {getCharted} from '../api.manual';
import {UserContext} from '../Component/Context/contexUser'

import Loading from '../Component/Loading';





const SelectCharter = ({route, navigation: { navigate }}) => {
  const { auth, setAuth } = useContext(UserContext);
  const { colors } = useTheme();
  const [data, setData]=useState([null]);

  const ObtainCharter = async id =>{
    const res = await getCharted(id, auth.token);
    setData(res.data)
  };

  React.useEffect(() => {
    ObtainCharter(route.params._id)
  }, []);


  if (!data.GetBookId) return <Loading/>;
  //if (error) return `Error! ${error.message}`;

  const getCharter =id=>{
    navigate('Charter', {_id: id, idbook: route.params._id});
  }
    
  if(data.GetBookId) return (
    <Preview
    colors={colors}
    data={data}
    getCharter={getCharter}
    ></Preview>
  );
};

const Preview = ({data, getCharter, colors})=>(
   <ScrollView style={[styles.container, {backgroundColor: colors.background}]}>
       <Text style={[styles.title, {color: colors.text}]}>{data.GetBookId.book}</Text>
       <View style={styles.row}>
           {
               data.GetBookId.capitulos.map(item =>(
                   <TouchableOpacity
                   style={[styles.button, {backgroundColor: colors.card}]}
                   key={item._id}
                   onPress={()=> getCharter(item._id)}
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
      },
      title:{
        textAlign: "center",
        marginBottom: 8,
        fontSize: 20,
      }
})

export default SelectCharter;