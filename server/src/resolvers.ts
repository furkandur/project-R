import { Resolvers } from "./types/generated";

export const resolvers: Resolvers = {
  Mutation: {
    // create new User
    createUser: async (_, { username, email, password }, { dataSources }) => {
      return dataSources.users.create({
        username,
        email,
        password,
      });
    },
  },
  Query: {
    hello: () => {
      return "Hello World!";
    },
    // get all Users
    users: async (_, __, { dataSources }) => {
      return dataSources.users.getAll();
    },
  },
};
