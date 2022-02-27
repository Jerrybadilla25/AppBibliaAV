import React, { useState, useContext } from "react";
//import Icon, { Stack } from '@mdi/react';
//import { mdiEyeArrowRightOutline, mdiHeartOutline, mdiHeart  } from "@mdi/js";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { addLike } from "../../api.manual";
import { Ionicons } from "@expo/vector-icons";
import { UserContext } from "../../Component/Context/contexUser";

const Like = ({ datos, colors }) => {
  const [like, setLike] = useState({});
  const { auth, setAuth } = useContext(UserContext);
  const [arrayLikes, setArrayLikes] = useState([]);

  const addLikeuser = async (_id) => {
    const userID = auth._id;
    if (arrayLikes.length === 0) {
      setArrayLikes([...arrayLikes, _id]);
      getLike(_id, userID);
    } else {
      let filte = arrayLikes.filter((x) => x === _id);
      if (filte.length === 0) {
        setArrayLikes([...arrayLikes, _id]);
        getLike(_id, userID);
      } else {
        //no hecer nada
      }
    }
  };

  const getLike = async (_id, userID) => {
    const res = await addLike(_id, userID, auth.token);
    setLike({
      like: res.data.Like.like,
      view: res.data.Like.view,
      id: res.data.Like._id,
    });
  };

  React.useEffect(() => {
    setArrayLikes(auth.Megusta);
    setLike({
      like: datos.GetCharter.like,
      view: datos.GetCharter.view,
      id: datos.GetCharter._id,
    });
  }, []);

  return (
    <View style={[styles.rowFlex, { backgroundColor: colors.social }]}>
      <View style={styles.rowFlexNo}>
        <Ionicons name="md-eye-outline" size={24} color={colors.text} />

        <Text style={[styles.social, { color: colors.text }]}>
          {" "}
          {like.view}
        </Text>
      </View>
      <View>
        <TouchableOpacity
          style={styles.rowFlexNo}
          onPress={() => addLikeuser(like.id)}
        >
          <Ionicons name="md-heart-outline" size={24} color={colors.text} />

          <Text style={[styles.social, { color: colors.text }]}>
            {like.like}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rowFlex: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 5,
    paddingVertical: 8,
    marginVertical: 8,
  },
  rowFlexNo: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  socialText: {
    paddingHorizontal: 5,
  },
  social: {
    fontSize: 14,
    marginHorizontal: 8,
    paddingBottom: 10,
  },
});

export default Like;
