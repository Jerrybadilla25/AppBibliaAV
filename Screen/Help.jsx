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
import { UserContext } from "../Component/Context/contexUser";
import {getImageClouddinary} from '../api.user';

const Help = ({ navigation: { navigate } }) => {
  const { colors } = useTheme();
  const { isDarkTheme, setIsDarkTheme } = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [ligth, setLigth]=useState()
  const [dark, setDark]=useState()
  const [estado, setEstado]=useState(null)

  const ligth1 = [
    "https://res.cloudinary.com/dyeds74sp/image/upload/v1652555521/Biblia_AV/creartema_skjvsi.jpg",
    "https://res.cloudinary.com/dyeds74sp/image/upload/v1653434955/Biblia_AV/Screenshot_20220524_172155_com.alientodevida.BibliaAV_jotzhr.jpg",
    "https://res.cloudinary.com/dyeds74sp/image/upload/v1653417613/Biblia_AV/Screenshot_20220524_121817_host.exp.exponent_cc99lb.jpg",
    "https://res.cloudinary.com/dyeds74sp/image/upload/v1652555148/Biblia_AV/deletetema_xgs2rs.jpg",
    "https://res.cloudinary.com/dyeds74sp/image/upload/v1652555150/Biblia_AV/editar_kzfipw.jpg",
    "https://res.cloudinary.com/dyeds74sp/image/upload/v1652555150/Biblia_AV/selectEdit_rs9bdt.jpg",
    "https://res.cloudinary.com/dyeds74sp/image/upload/v1652555150/Biblia_AV/deletefavorito_xqhj28.jpg",
    "https://res.cloudinary.com/dyeds74sp/image/upload/v1653434954/Biblia_AV/Screenshot_20220524_172348_com.alientodevida.BibliaAV_nu4vqg.jpg",
    "https://res.cloudinary.com/dyeds74sp/image/upload/v1653412376/Biblia_AV/bible_lista_dark_rp1bua.jpg",
    "https://res.cloudinary.com/dyeds74sp/image/upload/v1653412373/Biblia_AV/bible_cuadricula_dark_b4glsh.jpg"
  ];
  const dark2 = [
    "https://res.cloudinary.com/dyeds74sp/image/upload/v1653412377/Biblia_AV/craer_tema_ligth_saivhv.jpg",
    "https://res.cloudinary.com/dyeds74sp/image/upload/v1653412376/Biblia_AV/add_verse_a_tema_ligth_j0bmgg.jpg",
    "https://res.cloudinary.com/dyeds74sp/image/upload/v1653412379/Biblia_AV/quitar_verse_ligth_knc384.jpg",
    "https://res.cloudinary.com/dyeds74sp/image/upload/v1653412378/Biblia_AV/quitar_tema_ligth_ch0ulp.jpg",
    "https://res.cloudinary.com/dyeds74sp/image/upload/v1653412378/Biblia_AV/edit_tema_ligth_dgg4oo.jpg",
    "https://res.cloudinary.com/dyeds74sp/image/upload/v1653412378/Biblia_AV/edit_ligth_jpepvu.jpg",
    "https://res.cloudinary.com/dyeds74sp/image/upload/v1653414151/Biblia_AV/quitar_de_favoritos_ojjhmc.jpg",
    "https://res.cloudinary.com/dyeds74sp/image/upload/v1653412374/Biblia_AV/ajustes_ligth_sxa7u7.jpg",
    "https://res.cloudinary.com/dyeds74sp/image/upload/v1653412375/Biblia_AV/biblia_lista_ligth_kwfsrl.jpg",
    "https://res.cloudinary.com/dyeds74sp/image/upload/v1653412377/Biblia_AV/bible_cuadricula_ligth_bpnywx.jpg"
  ];

  React.useEffect(() => {
    getImages()
  }, []);

  const getImages = async  ()=>{
    try {
      const data = await getImageClouddinary()
      if(data){
        setLigth(data[0].ligth)
        setDark(data[1].dark)
        setEstado(true)
      }else{
        setLigth(ligth1)
        setDark(dark2)
        setEstado(true)
      }
    } catch (error) {
       setLigth(ligth1)
       setDark(dark2)
       setEstado(true)
    }
    
  }



  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Text
            style={[styles.textTitle, {color: colors.text}]}> Como crear un tema</Text>
            
          <Text style={[styles.textText,{ color: colors.text }]}>
            Para crear un tema necesita desplazarse hasta INICIO, USUARIO, MIS
            TEMAS y dar clic sobre el texto "Crear tema"

          </Text>
          <Text style={[styles.textText,{ color: colors.text }]}>
          Posteriormente introducir el nombre del tema y dar clic en guardar.
          </Text>
          <Text style={[styles.textText,{ color: colors.text }]}>
          Si no desea guardar, puede darle clic a cerrar.
          </Text>
        </View>
        {
          estado && 
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
          {isDarkTheme ? (
            <Image
              style={styles.logo}
              source={{
                uri: dark[0],
              }}
            />
          ) : (
            <Image
              style={styles.logo}
              source={{
                uri: ligth[0],
              }}
            />
          )}
        </View>
        }
        
        <View>
          <Text style={[styles.textTitle, {color: colors.text}]}
          >
            Como asignar un versículo
          </Text>
          <Text style={[styles.textText,{ color: colors.text }]}>
            Para asignar un versículo, a un tema específico, diríjase a INICIO,
            luego a BIBLIA y luego seleccione un libro y capitulo.

          </Text>
          <Text style={[styles.textText,{ color: colors.text }]}>
           Mantenga presionado el versículo por dos segundos, posteriormente
            seleccione un tema para agregar el versículo. Puede agregar todos
            los que desee.

          </Text>
        </View>
        {
          estado &&
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
          {isDarkTheme ? (
            <Image
              style={styles.logo}
              source={{
                uri: dark[1],
              }}
            />
          ) : (
            <Image
              style={styles.logo}
              source={{
                uri: ligth[1],
              }}
            />
          )}
        </View>
        }
        
      
          <Text style={[styles.textTitle, {color: colors.text}]}>
            Eliminar versiculos y temas
          </Text>
          <Text style={[styles.textText,{ color: colors.text }]}>
            Puede eliminar un versículo de un tema, manteniendo presionado por
            dos segundos, cuando aparece la ventana de dialogo, seleccionar
            eliminar versículo.

          </Text>
         
        
        {
          estado && 
          <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            padding: 20,
            //backgroundColor: colors.text,
            padding: 10,
            marginVertical: 10,
          }}
        >
          {isDarkTheme ? (
            <Image
              style={styles.logo}
              source={{
                uri: dark[2],
              }}
            />
          ) : (
            <Image
              style={styles.logo}
              source={{
                uri: ligth[2],
              }}
            />
          )}
        </View>
        }
        

        <Text style={[styles.textText,{ color: colors.text }]}>
        Use el mismo procedimiento para eliminar completamente un tema.
        </Text>
        {
          estado &&
          <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            //backgroundColor: colors.text,
            padding: 10,
            marginVertical: 10,
          }}
        >
          {isDarkTheme ? (
            <Image
              style={styles.logo}
              source={{
                uri: dark[3],
              }}
            />
          ) : (
            <Image
              style={styles.logo}
              source={{
                uri: ligth[3],
              }}
            />
          )}
        </View>
        }
        

        <Text style={[styles.textTitle, {color: colors.text}]} >
          Como editar un tema{" "}
        </Text>
        <Text style={[styles.textText,{ color: colors.text }]}>
        Diríjase a Favoritos, en la pestaña mis temas, mantenga presionado por
        dos segundos la leyenda "Editar Tema"

        </Text>

        {
          estado &&
          <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            //backgroundColor: colors.text,
            padding: 10,
            marginVertical: 10,
          }}
        >
          {isDarkTheme ? (
            <Image
              style={styles.logo}
              source={{
                uri: dark[4],
              }}
            />
          ) : (
            <Image
              style={styles.logo}
              source={{
                uri: ligth[4],
              }}
            />
          )}
        </View>
        }

        
        <Text style={[styles.textText,{ color: colors.text }]}>
        Posteriormente seleccione el tema a editar, presionando la pantalla.
        Y luego sobrescriba el data a editar, y luego presionar Guardar.

          
        </Text>
        {
          estado && 
          <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            //backgroundColor: colors.text,
            padding: 10,
            marginVertical: 10,
          }}
        >
          {isDarkTheme ? (
            <Image
              style={styles.logo}
              source={{
                uri: dark[5],
              }}
            />
          ) : (
            <Image
              style={styles.logo}
              source={{
                uri: ligth[5],
              }}
            />
          )}
        </View>
        }
        

        <Text style={[styles.textTitle, {color: colors.text}]}>
          Como eliminar capitulos de Favoritos
        </Text>
        <Text style={[styles.textText,{ color: colors.text }]}>
          Para quitar un capítulo de Favoritos, basta con presionar por dos
          segundos el recuadro con el capítulo y presionar en el texto quitar de
          favoritos.

        </Text>

        {
          estado &&
          <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            //backgroundColor: colors.text,
            padding: 10,
            marginVertical: 10,
          }}
        >
          {isDarkTheme ? (
            <Image
              style={styles.logo}
              source={{
                uri: dark[6],
              }}
            />
          ) : (
            <Image
              style={styles.logo}
              source={{
                uri: ligth[6],
              }}
            />
          )}
        </View>
        }
        
        <Text style={[styles.textTitle, {color: colors.text}]}>
          Como cambiar la vista cuadricula o lista en Biblia.
        </Text>
        <Text style={[styles.textText,{ color: colors.text }]}>
          En ajustes deslizar la barra cambiar a vista cuadricula o lista.
        </Text>

        {
          estado &&
          <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            //backgroundColor: colors.text,
            padding: 10,
            marginVertical: 10,
          }}
        >
          {isDarkTheme ? (
            <Image
              style={styles.logo}
              source={{
                uri: dark[7],
              }}
            />
          ) : (
            <Image
              style={styles.logo}
              source={{
                uri: ligth[7],
              }}
            />
          )}
        </View>
        }
        
        <Text style={[styles.textText,{ color: colors.text }]}>
            Vista lista.
          </Text>
          {
            estado &&
           <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            //backgroundColor: colors.text,
            padding: 10,
            marginVertical: 10,
          }}
        >
          {isDarkTheme ? (
            <Image
              style={styles.logo}
              source={{
                uri: dark[8],
              }}
            />
          ) : (
            <Image
              style={styles.logo}
              source={{
                uri: ligth[8],
              }}
            />
          )}
        </View> 
          }
        
        <Text style={[styles.textText,{ color: colors.text }]}>
            Vista cuadricula.
          </Text>

          {
            estado &&
           <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            //backgroundColor: colors.text,
            padding: 10,
            marginVertical: 10,
            marginBottom: 60
          }}
        >
          {isDarkTheme ? (
            <Image
              style={styles.logo}
              source={{
                uri: dark[9],
              }}
            />
          ) : (
            <Image
              style={styles.logo}
              source={{
                uri: ligth[9],
              }}
            />
          )}
        </View> 
          }
        
        

        <TouchableOpacity onPress={() => navigate("Politica")}>
          <Text
            style={{
              textAlign: "center",
              paddingVertical: 20,
              fontFamily: "Roboto",
              color: colors.text,
              borderTopColor: colors.text,
              borderWidth: 1,
            }}
          >
            Politica de privacidad
          </Text>
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
        <View style={{ padding: 20 }}>
          <Text style={[styles.title, { marginBottom: 15 }]}>
            Por que Donar?
          </Text>
          <Text style={{ fontFamily: "serif", paddingBottom: 5 }}>
            Biblia Aliento de Vida nace como una necesidad de ofrecer al público
            amante de la palabra de Dios una aplicación limpia y con propósito,
            sin incomodos anuncios que en muchas ocasiones obstaculizan el
            propósito para lo cual fue desarrollada dicha aplicación.
          </Text>
          <Text style={{ fontFamily: "serif", paddingBottom: 5 }}>
            Para mantener activa esta aplicación es necesario contratar una gran
            infraestructura de red ya que nuestros servidores se encuentran en
            plataformas privativas y dicha información es guardada en dichos
            sistemas informáticos. La base de datos de nuestros usuarios es
            guardada y cifrada para proteger y garantizar la persistencia de tus
            datos.{" "}
          </Text>
          <Text style={{ fontFamily: "serif", paddingBottom: 5 }}>
            Por eso nos vemos en la necesitada a solicitar contribuciones a
            nuestros usuarios con el fin de costear los gastos de operación y
            garantizar la NO monetización a través de anuncios comerciales.
          </Text>
        </View>

        <Text style={[styles.title]}>Adquirir Version Pro</Text>
        <Text style={{ color: colors.textNumber, marginTop: 30 }}>
          Adquirir version Pro por:
        </Text>
        <Text style={[styles.dona, { width: 350 }]}>
          $3 dolares americanos por unica vez
        </Text>
        <Text style={{ color: colors.textNumber, marginTop: 30 }}>
          Quiero donar y adquirir version Pro por:
        </Text>
        <Text style={[styles.dona, { width: 350 }]}>
          $6 dolores americanos una sola vez
        </Text>
        <Text style={{ fontFamily: "serif", marginVertical: 15 }}>Nota: </Text>
        <Text style={{ fontFamily: "serif" }}>
          Usamos los servicios de Google para administrar los pagos, de manera
          que Biblia AV, no almacena datos relacionados con tu medio de pago.
        </Text>

        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
          <Text
            style={[
              styles.title,
              { fontFamily: "serif", marginTop: 110, marginBottom: 100 },
            ]}
          >
            Regresar
          </Text>
        </TouchableOpacity>
        <Text style={{ marginBottom: 200 }}></Text>
      </View>
    </ScrollView>
  </Modal>
);

const styles = StyleSheet.create({
  container: {
    paddingTop: 2,
    paddingHorizontal: 20,
  },
  logo: {
    width: 300,
    height: 600,
  },
  dona: {
    padding: 15,
    textAlign: "center",
    backgroundColor: "#F18418",
    fontFamily: "Roboto",
    fontSize: 18,
    marginVertical: 10,
    color: "#1D0B26",
  },
  containerModal: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontFamily: "sans-serif-medium",
    fontSize: 18,
  },
  textTitle:{
    marginVertical: 15,
    fontSize: 19,
    fontFamily: "sans-serif-medium",
    paddingHorizontal: 10
  },
  textText:{
    paddingHorizontal: 10,
    fontSize: 16,
    fontFamily: "sans-serif-condensed",
  }
});

export default Help;
