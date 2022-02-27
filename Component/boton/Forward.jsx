import React from "react";
import { Ionicons } from '@expo/vector-icons';
import {TouchableOpacity,} from "react-native";

const Forward = ({data, getCharterCod, colors}) => {
    return (
        <TouchableOpacity
      onPress={() =>
        getCharterCod({
           variables:{
             _id: data.GetCharter._id,
            idbook: data.GetCharter.idBook,
            cod: "Fordwar"
           }
            
        })
      }
    >
      <Ionicons name="arrow-redo-outline" size={24} color={colors.text} />
      
    </TouchableOpacity>
    );
}

export default Forward;

