import gql from "graphql-tag";

export const typeDefs = gql`
  type Mutation {
    "Mutation to create a new User"
    createUser(username: String!, email: String!, password: String!): User!
  }

  type Query {
    hello: String!
    "Query to get all Users"
    users: [User!]!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
  }
`;
