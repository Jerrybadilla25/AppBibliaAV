
const API = "http://api.biblia.av.hardsof.com/user/inicioAll";
//const API = "http://api.bibliaav.ml/user/inicioAll";
//const API = "http://192.168.0.10:3000/user/inicioAll";

const usuarioStandar = {token: "GFDCJJGJG45156@GYTDkhkhkgts"}

export const getStart = async ()=>{
  const data = await fetch(`${API}`, {
    method: "POST",
    body: JSON.stringify(usuarioStandar),
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
  });
  const res = await data.json()
  return res
}


