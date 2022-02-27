import {gql} from "@apollo/client";


export const API = "http://localhost:4001/api/bible"


export const GET_BOOKS = gql `
    query allBooks($version: String!){
      GetBooks(version: $version){
        _id
        book
        nomenclatura
        testament
      }
  }
`
export const GET_BOOK_ID = gql `
query getBookID ($_id: ID!) {
  GetBookId(_id: $_id){
    _id
    book
    capitulos{
      _id
      order
      charter
    }
  }
}
`
export const GET_CHARTE = gql `
query getCharter($_id: ID!, $idbook: String!, $cod: String!) {
  GetCharter(_id: $_id, idbook: $idbook, cod: $cod){
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
`
