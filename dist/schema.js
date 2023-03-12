const typeDefs = `
  type Book {
    _id: String
    title: String
    author: String
    datePublished: String
    description: String
    pageCount: Int
    genre: String
    publisher: String
    userId: String
  }

  type User {
    _id: String
    name: String
    email: String
    password: String
    token: String
  }

  type Query {
    books: [Book]
    book(id: String!): Book
    users: [User]
    user(id: String!): User 
    bookByUser(userId: String): Book
  }

  type Message {
    message: String
  }

  type Mutation {
    createBook(title: String!, author: String!, pageCount: Int!, genre: String!, publisher: String!, description: String): Book
    updateBook(_id: String, title: String, author: String, datePublished: String, description: String, pageCount: Int, genre: String, publisher: String): Boolean
    deleteBook(_id:String): Message
    createUser(email: String!, name: String!, password: String!): User
    loginUser(email: String!, password: String!): User
  }
`;
export default typeDefs;
