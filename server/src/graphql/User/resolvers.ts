import { GraphQLError } from "graphql";
import bcrypt from "bcrypt";
import { createToken } from "../../utils/helpers";
import { validatePassword } from "../../utils/validations";
import { Resolvers } from "./types";

export const resolvers: Resolvers = {
  Mutation: {
    // create new User
    signup: async (_, { username, email, password }, { dataSources }) => {
      validatePassword(password);
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await dataSources.users.create({
        username,
        email,
        password: hashedPassword,
      });

      if (user) {
        const userForToken = {
          id: user.id,
          username: user.username,
          email: user.email,
        };

        return createToken(userForToken);
      }
      return null;
    },
    login: async (_, { username, password }, { dataSources }) => {
      const user = await dataSources.users.findOne({ username: username });

      if (!user) {
        throw new GraphQLError("User not found", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }
      const passwordCorrect = await bcrypt.compare(password, user.password);
      if (!passwordCorrect) {
        throw new GraphQLError("Incorrect password", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      const userForToken = {
        id: user.id,
        username: user.username,
      };

      return createToken(userForToken);
    },
  },
  Query: {
    // get all Users
    users: async (_, __, { dataSources }) => {
      const users = await dataSources.users.getAll();
      return users || [];
    },
    // get User by ID
    user: async (_, { id }, { dataSources }) => {
      const user = await dataSources.users.findOneById(id);
      return user || null;
    },
    // Currently logged user
    me: (_, __, { me }) => me,
  },
};
