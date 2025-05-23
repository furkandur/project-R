import { Days, ILocation } from "./model";
import { Resolvers } from "./types";
import { isValidDay } from "../../utils/validations";
import { GraphQLError } from "graphql";

export const resolvers: Resolvers = {
  Mutation: {
    createLocation: async (
      _,
      { name, description, openDays },
      { dataSources, me }
    ) => {
      if (!me) {
        throw new GraphQLError("Unauthorized", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        });
      }

      const newLocation: ILocation = {
        name,
        description,
        openDays: openDays.map((day) => ({
          day: isValidDay(day.day) ? (day.day as Days) : Days.MONDAY,
          startHour: day.startHour,
          endHour: day.endHour,
        })),
        createdAt: new Date(),
        createdBy: me.id,
      };

      const location = await dataSources.locations.create(newLocation);
      return location || null;
    },
  },
  Query: {
    // get all Locations
    locations: async (_, __, { dataSources }) => {
      const locations = await dataSources.locations.getAll();
      return locations || [];
    },

    // get Location by ID
    location: async (_, { id }, { dataSources }) => {
      const location = await dataSources.locations.findOneById(id);
      return location || null;
    },
  },
  Location: {
    createdBy: async (location, _, { dataSources }) => {
      if (!location.createdBy) {
        throw new GraphQLError("User not found", {
          extensions: {
            code: "NOT_FOUND",
          },
        });
      }
      const user = await dataSources.users.findOne({
        id: location.createdBy,
      });
      if (!user) {
        throw new GraphQLError("User not found", {
          extensions: {
            code: "NOT_FOUND",
          },
        });
      }
      if (!user.id) {
        throw new GraphQLError("User ID is missing", {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
          },
        });
      }
      return {
        ...user,
        id: user.id,
      };
    },
  },
};
