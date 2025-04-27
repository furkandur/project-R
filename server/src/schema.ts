import gql from "graphql-tag";

export const typeDefs = gql`
  type Mutation {
    "signup to create new User"
    signup(username: String!, email: String!, password: String!): Token
    "create Token for logged User"
    login(username: String!, password: String!): Token
  }

  type Query {
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
