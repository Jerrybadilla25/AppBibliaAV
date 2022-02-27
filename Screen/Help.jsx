import React, { useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
} from "react-native";
import { useTheme } from "@react-navigation/native";


const Help = ({navigation: { navigate }}) => {
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <ScrollView>
      <View style={{ marginBottom: 70, marginTop: 20 }}>
        <View style={{ paddingHorizontal: 50, paddingBottom: 40 }}>
          <Text style={{ color: colors.text }}>
            Honra a Jehová con tus bienes, Y con las primicias de todos tus
            frutos; Y serán llenos tus graneros con abundancia, Y tus lagares
            rebosarán de mosto.
          </Text>
          <Text
            style={{ color: colors.text, marginTop: 15, textAlign: "center" }}
          >
            Proverbios 3: 9-10
          </Text>
        </View>

        <TouchableOpacity onPress={()=>setModalVisible(!modalVisible)}>
          <Text style={[styles.dona]}>¡ Colabora con Biblia AV !</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View>
          <Text
            style={{
              color: colors.text,
              marginBottom: 15,
              fontSize: 18,
              fontFamily: "Roboto",
            }}
          >
            Como crear un tema
          </Text>
          <Text style={{ color: colors.text }}>
            Para crear un tema necesita desplazarse hasta INICIO, USUARIO, MIS
            TEMAS y dar click sobre el texto "Crear tema"{" "}
          </Text>
          <Text style={{ color: colors.text }}>
            Posteriormente introducir el nombre del tema y dar click en guardar.{" "}
          </Text>
          <Text style={{ color: colors.text }}>
            Si no desea guardar puede darle click a cerrar.{" "}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            padding: 20,
            //backgroundColor: colors.text,
            padding: 10,
            marginVertical: 1,
          }}
        >
          <Image
            style={styles.tinyLogo}
            source={{
              uri: "https://res.cloudinary.com/dyeds74sp/image/upload/v1645835076/Biblia_AV/Screenshot_1645833774_lgur3y.png",
            }}
          />
        </View>
        <View>
          <Text
            style={{
              color: colors.text,
              marginBottom: 15,
              fontSize: 18,
              fontFamily: "Roboto",
            }}
          >
            Como asignar un versiculo
          </Text>
          <Text style={{ color: colors.text }}>
            Para asignar un versiculo a un tema especifico, dirigase a INICIO,
            luego a BIBLIA y luego seleccione un libro, capitulo.
          </Text>
          <Text style={{ color: colors.text }}>
            Mantenga precionado el versiculo por dos segundos, posteriormente
            seleccione un tema para agregar el versiculo. Puede agregar todos
            los que desee.
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            padding: 20,
            //backgroundColor: colors.text,
            padding: 10,
            marginVertical: 1,
          }}
        >
          <Image
            style={styles.logo}
            source={{
              uri: "https://res.cloudinary.com/dyeds74sp/image/upload/v1645835749/Biblia_AV/Screenshot_1645835706_dmxjal.png",
            }}
          />
        </View>
        <View>
          <Text
            style={{
              color: colors.text,
              marginBottom: 15,
              fontSize: 18,
              fontFamily: "Roboto",
            }}
          >
            Eliminar versiculos y temas
          </Text>
          <Text style={{ color: colors.text }}>
            Puede eliminar un versiculo de un tema manteniendo presionado por
            dos segundos, cuando aparece la ventana de dialogo, seleccionar
            eliminar versiculo.
          </Text>
          <Text style={{ color: colors.text }}>
            Use el mismo procedimiento para elimanar completamente un tema.
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            //backgroundColor: colors.text,
            padding: 10,
            marginVertical: 10,
          }}
        >
          <Image
            style={styles.tinyLogo3}
            source={{
              uri: "https://res.cloudinary.com/dyeds74sp/image/upload/v1645836652/Biblia_AV/Screenshot_1_li2r7h.png",
            }}
          />
        </View>
        <TouchableOpacity
        onPress={()=> navigate("Politica")}
        >
          <Text style={{textAlign: "center", paddingVertical: 20, fontFamily: "Roboto", color:colors.text}}>Politica de privacidad</Text>
        </TouchableOpacity>
      </View>
      <PreviewModalDonate
      modalVisible={modalVisible}
      colors={colors}
      setModalVisible={setModalVisible}
      />
    </ScrollView>
  );
};

const PreviewModalDonate = ({ modalVisible, colors, setModalVisible }) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      setModalVisible(!modalVisible);
    }}
  >
    <ScrollView>
    <View style={[styles.containerModal, { backgroundColor: "white" }]}>
      <View style={{padding: 20}}>
        <Text style={[styles.title, {marginBottom: 15}]}>Por que Donar?</Text>
        <Text style={{fontFamily: "serif", paddingBottom: 5}}>Biblia Aliento de Vida nace como una necesidad de ofrecer al público amante de la palabra de Dios una aplicación limpia y con propósito,  sin incomodos anuncios que en muchas ocasiones obstaculizan el propósito para lo cual fue desarrollada dicha aplicación.</Text>
        <Text style={{fontFamily: "serif", paddingBottom: 5}}>Para mantener activa esta aplicación es necesario contratar una gran infraestructura de red ya que nuestros servidores se encuentran en plataformas privativas y dicha información es guardada en dichos sistemas informáticos. La base de datos de nuestros usuarios es guardada y cifrada para proteger y garantizar la persistencia de tus datos. </Text>
        <Text style={{fontFamily: "serif", paddingBottom: 5}}>Por eso nos vemos en la necesitada a solicitar contribuciones a nuestros usuarios con el fin de costear los gastos de operación y garantizar la NO monetización a través de anuncios comerciales.</Text>
      </View>
      
      <Text style={[styles.title]}>Suscribirse</Text>
      <Text style={{ color: colors.textNumber, marginTop: 30 }}>
        Quiero colaborar con...
      </Text>
      <Text style={[styles.dona, { width: 350 }]}>
        $1 dolar americano por mes
      </Text>
      <Text style={[styles.dona, { width: 350 }]}>
        $3 dolares americanos por mes
      </Text>
      <Text style={{ color: colors.textNumber, marginTop: 30 }}>
        Quiero donar
      </Text>
      <Text style={[styles.dona, { width: 350 }]}>
        $10 dolores americanos una unica vez
      </Text>
      <Text style={{ fontFamily: "serif", marginVertical: 15 }}>Nota: </Text>
      <Text style={{ fontFamily: "serif" }}>
        Usamos los servicios de Google para administrar los pagos, de manera que
        Biblia AV, no almacena datos relacionados con tu medio de pago.
      </Text>

      <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
        <Text
          style={[styles.title, { fontFamily: "serif", marginTop: 110, marginBottom: 100 }]}
        >
          Regresar
        </Text>
      </TouchableOpacity>
      <Text style={{marginBottom: 200}}></Text>
    </View>
    </ScrollView>
  </Modal>
);

const styles = StyleSheet.create({
    container: {
      paddingTop: 30,
      paddingHorizontal: 20
    },
    tinyLogo: {
      width: 350,
      height: 300,
     
    },
    tinyLogo3: {
        width: 300,
        height: 265,
        
        
      },
    logo: {
      width: 300,
      height: 600,
      
    },
    dona:{
      padding: 15,
      textAlign: "center",
      backgroundColor: "#F18418",
      fontFamily: "Roboto",
      fontSize: 18,
      marginVertical: 10,
      color: "#1D0B26"
    },
    containerModal:{
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
      padding: 20
    },
   title:{
     fontFamily: 'sans-serif-medium',
     fontSize: 18
   }
  });



export default Help;
