import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { UserDatasource } from "./graphql/User/data";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { Context } from "./graphql/types/context";
import { JWT_SECRET, MONGO_URI } from "./utils/constants";
import User, { IUser } from "./graphql/User/model";
import { CurrentUser, JWTPayload } from "./graphql/types";
import graphqlOptions from "./graphql";
import Location from "./graphql/Location/model";
import { LocationDatasource } from "./graphql/Location/data";

const startApolloServer = async () => {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB");

  const server = new ApolloServer<Context>(graphqlOptions);

  const { url } = await startStandaloneServer(server, {
    context: async ({ req, res }) => {
      let currentUser: CurrentUser = null;
      const auth = req.headers.authorization || null;
      if (auth && auth.startsWith("Bearer ")) {
        const decodedToken = jwt.verify(
          auth.substring(7),
          JWT_SECRET
        ) as JWTPayload;
        currentUser = { id: decodedToken.id };
      }
      return {
        me: currentUser,
        dataSources: {
          users: new UserDatasource({ modelOrCollection: User }),
          locations: new LocationDatasource({ modelOrCollection: Location }),
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
