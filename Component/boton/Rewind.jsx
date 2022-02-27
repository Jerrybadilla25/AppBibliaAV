import React from "react";
import { Ionicons } from '@expo/vector-icons';
//import Icon, { Stack } from '@mdi/react';
//import {mdiRewind,} from "@mdi/js";
import {TouchableOpacity} from "react-native";
  


const Rewind = ({data, getCharterCod, colors}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        getCharterCod({
          variables:{
            _id: data.GetCharter._id,
            idbook: data.GetCharter.idBook,
            cod: "Rewind",
          }
            
        })
      }
    >
      <Ionicons name="arrow-undo-outline" size={24} color={colors.text} />
     
    </TouchableOpacity>
  );
};

export default Rewind;
