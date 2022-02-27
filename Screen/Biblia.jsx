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
import { getBooks } from "../api.manual";

//importar archivos
import Loading from "../Component/Loading";

function Biblia({ navigation: { navigate } }) {
  const { auth, setAuth } = useContext(UserContext);
  const { colors } = useTheme();
  const { versionBook, setVersionBook } = useContext(UserContext);
  const [data, setData] = useState([null]);

  const getFetchBooks = async (version) => {
    const res = await getBooks(version, auth.token);
    setData(res.data);
  };

  React.useEffect(() => {
    getFetchBooks(versionBook.versionBible);
  }, []);

  const getBookID = (id) => {
    navigate("SelectCharter", { _id: id });
  };

  return (
    <View>
      {data.GetBooks 
      ? <Preview colors={colors} data={data} getBookID={getBookID} />
      : <Loading />
      }
    </View>
  );
}


const Preview = ({ data, getBookID, colors }) => (
  <ScrollView
      
  >
    <View style={{flex: 1, padding: 20, backgroundColor: colors.background }}>
      <View style={styles.row}>
      {data.GetBooks.map((item) => (
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
    
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },

  span: {
    fontSize: 12,
    textAlign: "justify",
    paddingLeft: 10,
  },
  abrev: {
    fontSize: 10,
    textAlign: "justify",
    paddingLeft: 10,
  },
  title: {
    fontSize: 16,
    textAlign: "justify",
    paddingLeft: 10,
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
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 4,

    alignSelf: "flex-start",
    marginHorizontal: "1%",
    marginBottom: 6,
    minWidth: "48%",
  },
});

export default Biblia;
