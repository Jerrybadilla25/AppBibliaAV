
//const API = "http://api.biblia.av.hardsof.com/user/userCreate";
//const APILOGIN = "http://api.biblia.av.hardsof.com/user/userLogin";

const API = "http://192.168.0.6:4001/user/userCreate";
const APILOGIN = "http://192.168.0.6:4001/user/userLogin";

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

export const versionDefault = {
    copyright: "No tiene derechos de autor",
    descripcion: "La Biblia del Oso es un libro traducido del latín al castellano cuya importancia radica en que buscaba acerca la religión, en este entonces controlada y manejada únicamente por los sectores religiosos, a la gente del común. La traducción la realizó Casiodoro de Reina y se publicó en el año 1569, en Basilea, alcanzando los 2.660 ejemplares. Así, la versión oficial y en latín de Jerónimo de Estridón comenzó a circular en otros sectores y para un nuevo público.",
    versionBible: "Biblia_del_oso_1569",
    _id: "61e39b79081c8c50141668bf"
}