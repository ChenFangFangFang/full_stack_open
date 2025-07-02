import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`
export const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
      __typename
      title
      author {
        __typename
        name
        born
      }
      published
      genres
  }
`
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`
export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
    query {
        allBooks {
            __typename
            title
            author {
                __typename
                name
                born
            }
            published
            genres
        }
    }
`;

export const FIND_BOOKS_BY_GENRE = gql`
    query findBooksByGenre($genre: String) {
        findBooksByGenre(genre: $genre) {
          ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`;

export const ADD_BOOK = gql`
    mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
        addBook(title: $title, author: $author, published: $published, genres: $genres) {
            title
            author {
                name
                born
            }
            published
            genres
        }
    }
`;

export const UPDATE_AUTHOR = gql`
mutation updateAuthor($name: String!, $setBornTo: Int!) {
  editAuthor(name: $name, setBornTo: $setBornTo) {
    name
    born
  }
}
`
