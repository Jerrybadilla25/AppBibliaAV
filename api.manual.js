//const API = "http://api.biblia.av.hardsof.com/api/bible";

const API = "http://192.168.0.6:4001/api/bible";


//get versiones
export const getVersiones = async (_id, token)=>{
  const data = await fetch(`${API}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
       "Accept": "application/json",
       "x-access-token": token
    },
    body: JSON.stringify({
      query: `
       {
        getVersion(_id: "${_id}"){
          _id
          versionBible
          descripcion
          copyright
         }
       }
    `,
    }),
  });
  const date = await data.json();
  return date;
};


//obtener capitulo
export const getCharterVerses = async (id, idbook, cod, token) => {
  const data = await fetch(`${API}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-access-token": token
    },
    body: JSON.stringify({
      query: `
    {
      GetCharter(_id: "${id}", idbook: "${idbook}", cod: "${cod}"){
        idBook
        _id
        charter
        version
        like
        view
        testament
        verses{
          _id
          numero
          versiculo
        }
        
      }
    }
    `,
    }),
  });
  const date = await data.json();
  return date;
};

//fetch select Charter capitulos
export const getCharted = async (id, token) => {
  const data = await fetch(`${API}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-access-token": token
    },
    body: JSON.stringify({
      query: `
    {
      GetBookId(_id: "${id}"){
        _id
        book
        capitulos{
          _id
          order
          charter
        }
      }  
    }
    `,
    }),
  });
  const date = await data.json();
  return date;
};

//fetch traer libros todos
export const getBooks = async (version, token) => {
  const data = await fetch(`${API}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
       Accept: "application/json",
       "x-access-token": token
    },
    body: JSON.stringify({
      query: `
    {
      GetBooks(version: "${version}"){
        _id
        book
        nomenclatura
        testament
      }
    }
    `,
    }),
  });
  const date = await data.json();
  return date;
};

//agregar un me gusta
export const addLike = async (_id, userID, token) => {
  const data = await fetch(`${API}`, {
    method: "POST",
    body: JSON.stringify({
      query: `
    {
          Like(_id: "${_id}", userID: "${userID}"){
            like
            view
            _id
          }
    }
    `,
    }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-access-token": token
    },
  });
  const date = await data.json();
  return date;
};

//buscar capitulo
export const searchCharter = async (version, token) => {
  const data = await fetch(`${API}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-access-token": token
    },
    body: JSON.stringify({
      query: `
      {
        SearchChapter(version: "${version}"){
          _id
          charter
          idBook
        }
      }
   `,
    }),
  });
  const date = await data.json();
  return date;
};

//ver los capitulos me gustan
export const userGetLikes = async (_id, token) => {
  const data = await fetch(`${API}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-access-token": token
    },
    body: JSON.stringify({
      query: `
       {
        userGetLike(_id: "${_id}"){
           _id
           charter
         }
       }
    `,
    }),
  });
  const date = await data.json();
  return date;
};

//crear un tema nuevo
export const createTemaUser = async (id, title, token)=>{
  const data = await fetch(`${API}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
       Accept: "application/json",
       "x-access-token": token
    },
    body: JSON.stringify({
      query: `
       {
        createTema(_id: "${id}", title: "${title}"){
           title
           _id
           arrayTemas{
             subtitle
             verses
             numero
           }
         }
       }
    `,
    }),
  });
  const date = await data.json();
  return date;
};

//traer todos los temas de usuario
export const getTemaUser = async (id, token)=>{
  const data = await fetch(`${API}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
       Accept: "application/json",
       "x-access-token": token
    },
    body: JSON.stringify({
      query: `
       {
        getTemasUser(_id: "${id}"){
           title
           _id
           arrayTemas{
             subtitle
             verses
             numero
           }
         }
       }
    `,
    }),
  });
  const date = await data.json();
  return date;
};

//gaurdar verse en temas
export const addVersesTemas = async (id, title, verseID, token)=>{
  const data = await fetch(`${API}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
       Accept: "application/json",
       "x-access-token": token
    },
    body: JSON.stringify({
      query: `
       {
        addVersesTemas(_id: "${id}", title: "${title}", verseID: "${verseID}"){
           msj
         }
       }
    `,
    }),
  });
  const date = await data.json();
  return date;
};

//get temas verses
export const getVersesTemas = async (id, title, token)=>{
  const data = await fetch(`${API}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
       Accept: "application/json",
       "x-access-token": token
    },
    body: JSON.stringify({
      query: `
       {
        getfullTemas(_id: "${id}", title: "${title}"){
           title
           _id
           arrayTemas{
             subtitle
             verses
             numero
             _id
             originCharter
           }
         }
       }
    `,
    }),
  });
  const date = await data.json();
  return date;
};


//traer todos los temas de usuario en charter
export const getTemaUserCharter = async (id, token)=>{
  const data = await fetch(`${API}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
       Accept: "application/json",
       "x-access-token": token
    },
    body: JSON.stringify({
      query: `
       {
        getTemasUser(_id: "${id}"){
           title
           _id
         }
       }
    `,
    }),
  });
  const date = await data.json();
  return date;
};

//delete verse tema
export const deleteVerseTema = async (_id, title, idVerse, token)=>{
  const data = await fetch(`${API}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
       "Accept": "application/json",
       "x-access-token": token
    },
    body: JSON.stringify({
      query: `
       {
        deleteVerse(_id: "${_id}", title: "${title}", idVerse: "${idVerse}"){
           title
           _id
           arrayTemas{
             subtitle
             verses
             numero
             originCharter
           }
         }
       }
    `,
    }),
  });
  const date = await data.json();
  return date;
};

//delete tema
export const deleteTema = async (_id, title, token)=>{
  const data = await fetch(`${API}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
       "Accept": "application/json",
       "x-access-token": token
    },
    body: JSON.stringify({
      query: `
       {
        deleteTema(_id: "${_id}", title: "${title}"){
           title
           _id
         }
       }
    `,
    }),
  });
  const date = await data.json();
  return date;
};

//delete like
export const deleteLike = async (_id, idLike, token)=>{
  const data = await fetch(`${API}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
       "Accept": "application/json",
       "x-access-token": token
    },
    body: JSON.stringify({
      query: `
       {
        deleteLike(_id: "${_id}", idLike: "${idLike}"){
           like
         }
       }
    `,
    }),
  });
  const date = await data.json();
  return date;
};

