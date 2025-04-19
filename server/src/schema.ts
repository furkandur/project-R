import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    hello: String!
  }

  type Test {
    id: ID!
    text: String!
  }
`;
