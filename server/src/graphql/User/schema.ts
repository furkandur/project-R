import gql from "graphql-tag";

const schema = gql`
  type Mutation {
    "signup to create new User"
    signup(username: String!, email: String!, password: String!): Token
    "create Token for logged User"
    login(username: String!, password: String!): Token
  }

  type Query {
    "Query to get all Users"
    users: [User!]!
    "Query to get User by ID"
    user(id: ID!): User
    "Currently logged user"
    me: CurrentUser
  }

  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
  }

  type CurrentUser {
    "Currently logged User ID"
    id: ID!
  }

  "Token model"
  type Token {
    "Token for logged User"
    value: String!
  }
`;

export default schema;
