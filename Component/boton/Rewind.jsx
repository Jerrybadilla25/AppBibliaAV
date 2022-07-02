import React from "react";
import { Ionicons } from '@expo/vector-icons';
//import Icon, { Stack } from '@mdi/react';
//import {mdiRewind,} from "@mdi/js";
import {TouchableOpacity} from "react-native";
  


const Rewind = ({data, getCharterRewinder, colors}) => {
  return (
    <TouchableOpacity
      onPress={() =>
       getCharterRewinder({
          variables:{
            _id: data._id,
            version: data.version
          }
        })
      }
    >
      <Ionicons name="ios-play-back-outline" size={20} color={colors.text} />
      
     
    </TouchableOpacity>
  );
};

export default Rewind;
