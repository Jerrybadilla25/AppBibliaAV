import React, { useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {AddUser} from '../../api.user';
import {UserContext} from '../../Component/Context/contexUser'


const tema = {
  background: "#DDDCF3",
  text: "#322437",
  errortext: "#322437",
  buton: "#2B9BF8",
  border: "#2B9BF8",
};

const Register = () => {
  const { auth, setAuth } = useContext(UserContext);
  const [validateSend, setValidateSend]=useState(false);
  const [User, setUser] = useState({});
  const [validateemal, setValidateEmail] = useState(
    "Correo electronico valido"
  );
  const [validatepassword, setValidatePassword] = useState(
    "Crear contraseña"
  );
  const [validateUser, setValidateUser] = useState(
    "Nombre"
  );

  const sendUser = async ()=>{
    const date = await AddUser(User);
    if(date.message){
      setValidateEmail("ESTE CORREO YA ESTA EN USO");
      setAuth(null);
    }else{
      setAuth(date);
    }
  }

  const textInputUserChange = (val)=>{
    let p1 = /[A-Za-z]/;
    let p2 = /[0-9]/;
    if(p1.test(val)){
      setValidateUser(val);
      setUser({ ...User, username: val });
    }
    if(p2.test(val)){
      setValidateUser("Solo se permiten letras");
    }
    
  }

  

  const textInputChange = (val) => {  
    let e = /[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,4}/;
    let e1  = /[\w._%+-]/;
    let e2 = /[\w._%+-]+@[\w.-]/;

      if (e1.test(val)) {
        setValidateEmail("Necesitas incluir un @ para ser valido");
      }
      if(e2.test(val)){
        setValidateEmail("Te falta incluir un . mas un dominio");
        
      }
      if(e.test(val)){
        setValidateEmail("Direccion de correo valida");
        setUser({ ...User, email: val.toLowerCase() });
        if(User.password){
          setValidateSend(true);
        }
      }
    };
  
  const passwordInputChange = (val) => {
    let p1 = /[a-z]/; //Mínimo ocho caracteres, al menos una letra y un número:
    let p2 = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/; //Mínimo ocho caracteres, al menos una letra, un número y un carácter especial:
    let p3 =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/; // Mínimo ocho caracteres, al menos una letra mayúscula, una letra minúscula y un número:
    let p4 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;  // Mínimo ocho caracteres, al menos una letra mayúscula, una letra minúscula, un número y un carácter especial:
    let p5 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/; //Mínimo ocho y máximo 10 caracteres, al menos una letra mayúscula, una letra minúscula, un número y un carácter especial:

    if (p1.test(val)) {
      setValidatePassword("Minimo 6 combina mayusculas y minusculas");
      //setUser({ ...User, pass: val });
    }
    if (p2.test(val)) {
      setValidatePassword("Bien estas incluyendo caracteres esp");
      setUser({ ...User, password: val });
      if(User.email){
        setValidateSend(true);
      }
      
    }
    if (p3.test(val)) {
      setValidatePassword("Bien incluistes Mayusculas minusculas numeros");
      setUser({ ...User, password: val });
      if(User.email){
        setValidateSend(true);
      }
    }
    if (p5.test(val)) {
      setValidatePassword("Has creado una contraseña fuerte");
      setUser({ ...User, password: val });
      if(User.email){
        setValidateSend(true);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={{ color: "#0051FF", fontSize: 20, textAlign: "center", fontWeight: "bold" }}>
          Registro
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
          <Ionicons name="at-outline" size={24}  style={styles.icon} />
        </View>

        <View style={styles.box}>
          <View style={styles.box2}>
          <Text style={styles.error}>{validateUser}</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="default"
              onChangeText={(val) => textInputUserChange(val)}
            />

            
          </View>
          <Ionicons name="person-outline" size={24}  style={styles.icon} />
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
           <Ionicons name="lock-closed-outline" size={24}  style={styles.icon}/>  
        </View>
        {
          validateSend===true ?
             <TouchableOpacity onPress={sendUser}>
                <Text style={styles.button}>Send</Text>
             </TouchableOpacity>
             :
             <View>
               <Text style={styles.button}>Send</Text>
             </View>

          
        }

        

        

        
      </View>
    </View>
  );
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
  box2:{
    flexDirection: "column"
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
  icon:{
      paddingHorizontal: 10,
      paddingVertical: 15,
      backgroundColor: tema.buton,
      color: "white",
      borderTopRightRadius: 12,
      borderBottomRightRadius: 12,
      //borderWidth: 1,
     // borderLeftColor: tema.border,
  }
});

export default Register;
