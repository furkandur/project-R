import { Resolvers } from "./types/generated";

export const resolvers: Resolvers = {
  Query: {
    hello: () => {
      return "Hello World!";
    },
    users: async (_, __, { services }) => {
      return services.users.getAll();
    },
  },
};
