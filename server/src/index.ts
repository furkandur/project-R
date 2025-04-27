import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { UserDatasource } from "./graphql/User/data";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { Context } from "./graphql/types/context";
import { JWT_SECRET, MONGO_URI } from "./utils/constants";
import User, { IUser } from "./graphql/User/model";
import { JWTPayload } from "./graphql/types";
import graphqlOptions from "./graphql";

const startApolloServer = async () => {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB");

  const server = new ApolloServer<Context>(graphqlOptions);

  const { url } = await startStandaloneServer(server, {
    context: async ({ req, res }) => {
      let currentUser: IUser | null = null;
      const auth = req.headers.authorization || null;
      if (auth && auth.startsWith("Bearer ")) {
        const decodedToken = jwt.verify(
          auth.substring(7),
          JWT_SECRET
        ) as JWTPayload;
        currentUser = await User.findById(decodedToken.id);
      }
      return {
        me: currentUser,
        dataSources: {
          users: new UserDatasource({ modelOrCollection: User }),
        },
      };
    },
    listen: { port: 4000 },
  });

  console.log(`🚀 Server ready at ${url}`);
};

startApolloServer().catch((err) => {
  console.error("Failed to start server: ", err);
});
