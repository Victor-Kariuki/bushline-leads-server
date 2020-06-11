const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    _id: ID!
    username: String
    phone: String
    email: String
    isAdmin: Boolean,
  }

  type Token {
    token: String!
  }

  input LoginInput {
    email: String
    password: String
  }

  input RegisterInput {
    username: String
    phone: String
    email: String
    password: String
  }

  input UpdateInput {
    username: String
    phone: String
    email: String
  }

  extend type Query {
    fetchAllUsers: [User]
    fetchUserById(id: ID): User
  }

  extend type Mutation {
    createUser(user: RegisterInput): Token!
    authenticateUser(user: LoginInput): Token!
    updateUser(id: ID, user: UpdateInput): User
    deleteUser(id: ID): Boolean!
  }
`;
