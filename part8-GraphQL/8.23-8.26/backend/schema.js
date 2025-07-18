const typeDefs = `
  type User {
    username: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
  }
  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks: [Book!]!
    findBooksByAuthor(author: String): [Book!]!
    findBooksByGenre(genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
  type Mutation {
    addBook(title: String!, author: String!, published: Int!, genres: [String!]!): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!): User
    login(username: String!, password: String!): Token
  }
  type Subscription {
    bookAdded: Book!
  }
`
module.exports = typeDefs