import { userSchema, userResolvers } from "./User";

export const typeDefs = [userSchema];

const resolvers = [userResolvers];

const graphqlOptions = {
  typeDefs,
  resolvers,
};
export default graphqlOptions;
