import { Resolvers } from "./types/generated";

export const resolvers: Resolvers = {
  Mutation: {
    // create new User
    createUser: async (_, { username, email, password }, { services }) => {
      return services.users.create({
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
    users: async (_, __, { services }) => {
      return services.users.getAll();
    },
  },
};
