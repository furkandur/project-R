import { locationResolvers, locationSchema } from "./Location";
import { userSchema, userResolvers } from "./User";

export const typeDefs = [userSchema, locationSchema];

const resolvers = [userResolvers, locationResolvers];

const graphqlOptions = {
  typeDefs,
  resolvers,
};
export default graphqlOptions;
