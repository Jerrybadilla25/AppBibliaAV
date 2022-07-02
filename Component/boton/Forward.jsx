import React from "react";
import { Ionicons } from '@expo/vector-icons';
import {TouchableOpacity,} from "react-native";

const Forward = ({data, getCharterForwar, colors}) => {
    return (
        <TouchableOpacity
      onPress={() =>
        getCharterForwar({
          variables:{
            _id: data._id,
            version: data.version
          }
            
        })
      }
    >
      <Ionicons name="ios-play-forward-outline" size={20} color={colors.text}  />
     
     
      
    </TouchableOpacity>
    );
}

export default Forward;

