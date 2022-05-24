import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { useTheme } from "@react-navigation/native";
import { UserContext } from "../Component/Context/contexUser";



import Reina from '../Component/Biblias/ReinaValera/booksReinaValera.json';
import Oso from '../Component/Biblias/Oso/booksOso.json';

//importar archivos
import Loading from "../Component/Loading";

function Biblia({ navigation: { navigate } }) {
  const { colors } = useTheme();
  const { versionBook, setVersionBook, viewBiblia, setViewBiblia } = useContext(UserContext);
  const [data, setData] = useState([]);
  

  const printLibros = () => {
    switch (versionBook) {
      case "Reina_Valera_1960":
        setData(Reina);
        break;
      case "Biblia_del_oso_1569":
        setData(Oso);
        break;
    }
  };

  React.useEffect(() => {
    printLibros();
  }, []);

  const getBookID = (id) => {
    navigate("SelectCharter", { _id: id });
  };

  
 
  return (
    <View>
      {data
      ? <Preview colors={colors} data={data} getBookID={getBookID} viewBiblia={viewBiblia} />
      : <Loading />
      }
    </View>
  );
}


const Preview = ({ data, getBookID, colors, viewBiblia }) => (
  <ScrollView
      
  >
    {
      viewBiblia ?
      <View style={{flex: 1,  marginVertical: 16, backgroundColor: colors.background }}>
      <View style={styles.row}>
      {data.map((item) => (
        <TouchableOpacity
          key={item._id}
          onPress={() => getBookID(item._id)}
          style={[styles.button, { backgroundColor: colors.card }]}
        >
          <Text style={[styles.title, { color: colors.text }]}>
            {item.book}
          </Text>
          <Text style={[styles.span, { color: colors.textNumber }]}>
            <Text>Abrev:</Text> {item.nomenclatura}
          </Text>
          <Text style={[styles.abrev, { color: colors.text }]}>
            {item.testament}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
    </View>
    :
    <View style={{flex: 1,  marginVertical: 16, backgroundColor: colors.background }}>
      <View style={styles.cols}>
      {data.map((item, idx) => (
        <TouchableOpacity
          key={item._id}
          onPress={() => getBookID(item._id)}
          style={[styles.buttonCols, { backgroundColor: colors.card }]}
        >
          <Text style={{ color: colors.text, fontFamily: 'sans-serif-medium' }}>
            {idx+1}{"    "}{item.book}
          </Text>
          
          <Text style={{ color: colors.textNumber, textAlign: "right", fontSize: 12, fontFamily: 'sans-serif-thin' }}>
            {item.testament}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
    </View>

    }
    
    
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flex: 1,
  },

  span: {
    fontSize: 12,
    textAlign: "justify",
    paddingLeft: 10,
    fontFamily: 'sans-serif',
    fontWeight: "200"
  },
  abrev: {
    fontSize: 10,
    textAlign: "justify",
    paddingLeft: 10,
    fontFamily: 'monospace'
  },
  title: {
    fontSize: 17,
    paddingLeft: 10,
    fontFamily: 'sans-serif-medium'
  },
  item: {
    backgroundColor: "#f80202",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  
  button: {
    paddingHorizontal: 4,
    paddingVertical: 8,
    borderRadius: 4,
    alignSelf: "flex-start",
    marginHorizontal: "1%",
    marginBottom: 6,
    minWidth: "48%",
  },
  cols: {
    flexDirection: "column",
    marginHorizontal: 12,
   // paddingVertical: 30
    //flexWrap: "wrap",
    //justifyContent: "flex-start",
  },
  buttonCols: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 4,
    //alignSelf: "flex-start",
    marginVertical: "1%",
    //marginBottom: 6,
    //minWidth: "48%",
  },
});

export default Biblia;
