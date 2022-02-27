import React, { useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {UserContext} from '../../Component/Context/contexUser';
import {GetUser} from '../../api.user';
import AsyncStorage from '@react-native-async-storage/async-storage';



const tema = {
  background: "#DDDCF3",
  text: "#322437",
  errortext: "#322437",
  buton: "#2B9BF8",
  border: "#2B9BF8",
};

const Login = ({ navigation: { navigate }}) => {
  const { auth, setAuth } = useContext(UserContext);
  const [validateSend, setValidateSend]=useState(false);
  const [User, setUser] = useState({});
  const [loading, setLoading]=useState(null);
  const [validateemal, setValidateEmail] = useState(
    "Ingrese su correo electronico"
  );
  const [validatepassword, setValidatePassword] = useState(
    "digite su contraseña"
  );
  
  const textInputChange = val =>{
    let e = /[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,4}/;
    if(e.test(val)){
      setUser({ ...User, email: val.toLowerCase() });
      if(User.password){
        setValidateSend(true)
      }
    }
  }

  const passwordInputChange = val =>{
     setUser({...User, password: val});
     if(User.email){
      setValidateSend(true)
     }
  }

  const loginUser = async ()=>{
    const date = await GetUser(User);
    if(date.message){
      setValidateEmail("EL USUARIO NO EXISTE");
    }
    if(date.messagepass){
      setValidatePassword("LA CONTRASEÑA NO COINCIDE");
    }
    if(date.token){
      setAuth(date);
      storeDataUser(User)
    } 
  }

  const loginUserStorage = async (valueJson)=>{
    const date = await GetUser(valueJson);
    if(date.message){
      setValidateEmail("EL USUARIO NO EXISTE");
    }
    if(date.messagepass){
      setValidatePassword("LA CONTRASEÑA NO COINCIDE");
    }
    if(date.token){
      setAuth(date);
    } 
  }

  React.useEffect(() => {
    getDataUser();
  }, []);

  //udateuser storage
  const getDataUser = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key_User');
      let valueJson = JSON.parse(value);
      if(valueJson !== null) {
        loginUserStorage(valueJson);
      }else{
        setLoading(true)
      }
    } catch(e) {
      // error reading value
    }
  }


  //setuser storage
  const storeDataUser = async (value) => {
    try {
      let valueJson = JSON.stringify(value)
      await AsyncStorage.setItem('@storage_Key_User', valueJson)
    } catch (e) {
      // saving error
    }
  }

  if(loading===null){
    return (
      <View style={styles.container}>
        <Text style={{color: tema.text, fontSize: 22}}>Cargando.....</Text>
      </View>
    )
  }else{
    return (
      <View style={styles.container}>
        <View>
          <Text style={{ color: "#0051FF", fontSize: 20, textAlign: "center", fontWeight: "bold" }}>
            Login
          </Text>
          <View style={styles.box}>
            <View style={styles.box2}>
              <Text style={styles.error}>{validateemal}</Text>
              <TextInput
                style={styles.textInput}
                keyboardType="email-address"
                autoFocus={true}
                onChangeText={(val) => textInputChange(val)}
              />
            </View>
            <Ionicons
              name="at-outline"
              size={24}
              color="black"
              style={styles.icon}
            />
          </View>
          <View style={styles.box}>
            <View style={styles.box2}>
              <Text style={styles.error}>{validatepassword}</Text>
              <TextInput
                style={styles.textInput}
                keyboardType="visible-password"
                onChangeText={(val) => passwordInputChange(val)}
              />
            </View>
            <Ionicons
              name="lock-closed-outline"
              size={24}
              color="black"
              style={styles.icon}
            />
          </View>
          {
            validateSend===true ?
                <TouchableOpacity onPress={loginUser}>
                    <Text style={styles.button}>Send</Text>
                </TouchableOpacity>
                :
                <View >
                <Text style={styles.button}>Send</Text>
            </View>
  
  
            
          }
  
          
          <TouchableOpacity onPress={()=> navigate("Registro")}>
             <View style={{marginTop: 30}}>
            <Text style={{color: "#0051FF", textAlign: "center"}}>No tengo una cuenta</Text>
        </View> 
          </TouchableOpacity>
          
        </View>
        
      </View>
    );
  }



  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: tema.background,
  },
  error: {
    color: tema.errortext,
    paddingHorizontal: 20,
    fontSize: 12,
  },
  box: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    borderRadius: 15,
    backgroundColor: tema.background,
    width: 340,
    height: 60,
    borderWidth: 2,
    borderColor: tema.border,
  },
  box2: {
    flexDirection: "column",
  },
  textInput: {
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,

    //marginVertical: 10,
    color: tema.text,
    //fontSize: 17,
    fontWeight: "bold"
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderRadius: 15,
    backgroundColor: tema.buton,
    marginVertical: 10,
    borderWidth: 3,
    borderColor: tema.border,
    color: "white",
    textAlign: "center",
  },
  icon: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: tema.buton,
    color: "white",
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    //borderWidth: 1,
    //borderLeftColor: tema.border,
  },
});

export default Login;
