import { Resolvers } from "./types";

export const resolvers: Resolvers = {
  Query: {
    hello: () => {
      return "Hello World!";
    },
  },
};
