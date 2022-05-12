
//const API = "http://api.biblia.av.hardsof.com/user/inicioAl";
const API = "http://192.168.0.10:3000/user/inicioAll";

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










export const AddUser = async (User)=>{
    const data = await fetch (`${API}`, {
        method: "POST",
        body: JSON.stringify(User),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    });
    const res = await data.json();
    return res;
}

export const GetUser = async (User)=>{
    const data = await fetch (`${APILOGIN}`, {
        method: "POST",
        body: JSON.stringify(User),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    });
    const res = await data.json();
    return res;
}

