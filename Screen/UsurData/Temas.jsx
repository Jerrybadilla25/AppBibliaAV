import React from "react";
import { View, StyleSheet, Modal } from "react-native";


const PreviewModal = () => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisibleTwo}
    onRequestClose={() => {
      Alert.alert("Modal has been closed.");
      setModalVisibleTwo(!modalVisibleTwo);
    }}
  >
    <View style={styles.modalView}>
      <View style={[styles.buton2, { backgroundColor: colors.text }]}>
        <TouchableOpacity onPress={deleteTemaUser}>
          <Text
            style={{
              color: colors.background,
              textAlign: "center",
              marginBottom: 15,
            }}
          >
            Eliminar tema
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={cerrarModalTwo}>
          <Text style={{ color: colors.textNumber, textAlign: "center" }}>
            Cancelar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const Temas = ({ Msjtitle, textInputChange, textInputChange2, setModalVisible, setTitleBoolen, setTitle, titleBoolean, modalVisible, saveTema , temas, ModalViewTema, openModal }) => {


  return (
    <View style={[styles.homeLike, { borderBottomColor: colors.border }]}>
      {modalVisible ? (
        <View style={[styles.modal, { backgroundColor: colors.boxTema }]}>
          {titleBoolean ? (
            <Text style={[styles.title, { color: colors.textNumber }]}>
              {Msjtitle}
            </Text>
          ) : (
            <Text style={[styles.title, { color: colors.text }]}>
              Nombre de tema nuevo
            </Text>
          )}

          <View>
            <TextInput
              onChangeText={(val) => textInputChange(val)}
              style={[
                styles.textInput,
                { backgroundColor: colors.header, color: colors.text },
              ]}
              placeholder="Nombre Tema"
              placeholderTextColor={colors.inputHolder}
            />
            <Text
              style={{
                color: colors.text,
                fontSize: 12,
                fontFamily: "monospace",
                paddingHorizontal: 10,
              }}
            >
              El tema es requerido
            </Text>
            <TextInput
              onChangeText={(val) => textInputChange2(val)}
              style={[
                styles.textInput,
                {
                  backgroundColor: colors.header,
                  color: colors.text,
                  marginTop: 10,
                },
              ]}
              placeholder="Descripcion..."
              placeholderTextColor={colors.inputHolder}
            />
            <Text
              style={{
                color: colors.text,
                fontSize: 12,
                fontFamily: "monospace",
                paddingHorizontal: 10,
              }}
            >
              La descripcion es opcional
            </Text>
            <View style={styles.close}>
              <TouchableOpacity onPress={saveTema}>
                <Text style={[styles.boton, { color: colors.textNumber }]}>
                  Guardar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible),
                    setTitleBoolen(false),
                    setTitle(true);
                }}
              >
                <Text style={[styles.boton, { color: colors.text }]}>
                  Cerrar
                </Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{
                fontSize: 12,
                marginTop: 15,
                padding: 20,
                borderColor: colors.background,
                borderWidth: 1,
                borderRadius: 8,
                color: colors.text,
              }}
            >
              Puedo agregar versiculos individuales desde la pantalla de
              capitulos, presionando por dos segundos el versiculo.
            </Text>
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

      {modalVisible ? (
        <View></View>
      ) : (
        <View style={styles.homeLike}>
          <ScrollView>
            {temas && (
              <View>
                {temas.map((x) => (
                  <TouchableOpacity
                    key={x._id}
                    style={[styles.Item, { backgroundColor: colors.header }]}
                    onPress={() => ModalViewTema(x._id)}
                    onLongPress={() => openModal(x._id)}
                  >
                    <Text
                      key={x._id}
                      style={[
                        styles.textCharter,
                        { color: colors.text, fontFamily: "sans-serif-medium" },
                      ]}
                    >
                      {x.tema}
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
      )}

      <PreviewModal modalVisibleTwo={modalVisibleTwo} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Temas;
