import gql from "graphql-tag";

export const typeDefs = gql`
  type Mutation {
    "create a new User"
    createUser(username: String!, email: String!, password: String!): User!
    "create Token for logged User"
    login(username: String!, password: String!): Token
  }

  type Query {
    hello: String!
    "Query to get all Users"
    users: [User!]!
    "Currently logged user"
    me: User
  }

  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
  }

  type Token {
    value: String!
  }
`;
