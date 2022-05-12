import React from 'react';
import {View, StyleSheet} from 'react-native';

const Temas = () => {
    return (
        <View style={[styles.homeLike, { borderBottomColor: colors.border }]}>
          {modalVisible ? (
            <View style={[styles.modal, { backgroundColor: colors.social }]}>
              <Text style={[styles.title, { color: colors.text }]}>
                Nombre de tema nuevo
              </Text>
              <View>
                <TextInput
                  onChangeText={(val) => textInputChange(val)}
                  style={[
                    styles.textInput,
                    { backgroundColor: colors.header, color: colors.text },
                  ]}
                  keyboardType="visible-password"
                  placeholder="su tema aqui"
                  placeholderTextColor={colors.inputHolder}
                />
                <View style={styles.close}>
                  <TouchableOpacity onPress={saveTema}>
                    <Text style={[styles.boton, { color: colors.text }]}>
                      Guardar
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={[styles.boton, { color: colors.text }]}>
                      Cerrar
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text style={{fontSize: 12, marginTop: 15}}>Puedo agregar versiculos individuales desde la pantalla de capitulos, presionando por dos segundos el versiculo.</Text>
              </View>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              style={{ flexDirection: "row", justifyContent: "flex-end" }}
            >
              <Text style={[styles.newtema, { color: colors.text }]}>
                Crear tema
              </Text>
            </TouchableOpacity>
          )}
          <View style={styles.homeLike}>
            <ScrollView>
              {temas && (
                <View >
                  {temas.map((x) => (
                    <TouchableOpacity
                      key={x._id}
                      style={[styles.Item, { backgroundColor: colors.header }]}
                      onPress={() => ModalViewTema(x.title)}
                      onLongPress={()=>openModal(x.title)}
                    >
                      <Text
                        key={x._id}
                        style={[styles.textCharter, { color: colors.text }]}
                      >
                        {x.title}
                      </Text>
                      <Text
                        style={[
                          styles.textDetalles,
                          { color: colors.textNumber },
                        ]}
                      >
                        ver...
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </ScrollView>
          </View>
          <PreviewModal
          modalVisibleTwo={modalVisibleTwo}
          />
        </View>
    );
}

const styles = StyleSheet.create({})

export default Temas;

