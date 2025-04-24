import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { UserDatasource } from "./datasources/UserDatasource";
import mongoose from "mongoose";
import { Context } from "./types/context";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { MONGO_URI } from "./utils/constants";
import User from "./models/User";

const startApolloServer = async () => {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB");

  const server = new ApolloServer<Context>({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    context: async () => {
      return {
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
