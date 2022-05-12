import React from 'react';
import {View, StyleSheet} from 'react-native';

const Like = ({colors, likes, SendLike, openModalTree}) => {
    return (
        <View>
            <Text style={[styles.title, { color: colors.text }]}>
            Favoritos
          </Text>
            <ScrollView>
            <View style={styles.row}>
            {likes.map((x) => (
              <TouchableOpacity
                key={x._id}
                onPress={() => SendLike({variables:{_id:x._id, version: x.version}})}
                onLongPress={()=> openModalTree(x._id)}
                
              >
                <View style={[styles.button, { backgroundColor: colors.header }]}  >
                  <Text style={[styles.textCharter, { color: colors.text }]}>
                  {x.charter}
                </Text>
                <Text
                  style={[styles.textDetalles, { color: colors.textNumber }]}
                >
                  ir...
                </Text>
                <Text
                  style={[styles.textVersion, { color: colors.text }]}
                >
                  {x.version}
                </Text>
                </View>
                
              </TouchableOpacity>
            ))}
            </View>
          </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({})

export default Like;

