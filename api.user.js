
//const API = "http://api.biblia.av.hardsof.com/user/inicioAll";
//const API = "https://api.service.bibliaav.ml/user/inicioAll";
const API = "http://192.168.0.10:4000";

const usuarioStandar = {token: "GFDCJJGJG45156@GYTDkhkhkgts"}

export const getStart = async ()=>{
  const data = await fetch(`${API}/user/inicioAll`, {
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


export const getImageClouddinary = async ()=>{
  const data = await fetch(`${API}/user/imagesCloudDinary`, {
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


