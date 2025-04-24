import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
import { Resolvers } from "./types/generated";
import { JWT_SECRET } from "./utils/constants";
import bcrypt from "bcrypt";

export const resolvers: Resolvers = {
  Mutation: {
    // create new User
    createUser: async (_, { username, email, password }, { dataSources }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      return dataSources.users.create({
        username,
        email,
        password: hashedPassword,
      });
    },
    login: async (_, { username, password }, { dataSources }) => {
      const user = await dataSources.users.findOne({ username: username });

      if (!user || (await !bcrypt.compare(password, user.password))) {
        throw new GraphQLError("Wrong credentials", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      const userForToken = {
        id: user.id,
        username: user.username,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
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
    // Currently logged user
    me: (_, __, { me }) => me,
  },
};
