import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { UserService } from "./services/UserService";
import mongoose from "mongoose";
import { Context } from "./context";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { MONGO_URI } from "./utils/constants";

const userService = new UserService();

let apolloServer: ApolloServer<Context> | null = null;

const startApolloServer = async () => {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB");

  if (apolloServer) {
    console.log("Stopping existing Apollo Server...");
    await apolloServer.stop();
    apolloServer = null;
  }

  const server = new ApolloServer<Context>({
    typeDefs,
    resolvers,
  });

  apolloServer = server;

  const { url } = await startStandaloneServer(server, {
    context: async () => {
      return {
        services: {
          users: userService,
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
