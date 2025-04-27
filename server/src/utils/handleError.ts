import { GraphQLError } from "graphql";
import { MongoServerError } from "mongodb";
import mongoose from "mongoose";

export const handleError = (error: unknown) => {
  if (error instanceof mongoose.Error) {
    console.error("Mongoose error: ", error.message);

    throw new GraphQLError(error.message, {
      extensions: {
        code: "BAD_USER_INPUT",
      },
    });
  }
  if (typeof error === "object" && error !== null && "code" in error) {
    const mongoError = error as MongoServerError;
    if (mongoError.code === 11000) {
      const field = Object.keys(mongoError.keyValue || {})[0] || "unknown";

      throw new GraphQLError(`Duplicate value for field: ${field}`, {
        extensions: {
          code: "DUPLICATE_KEY",
          field: field,
        },
      });
    }

    throw new GraphQLError(mongoError.message, {
      extensions: {
        code: "INTERNAL_SERVER_ERROR",
      },
    });
  }

  console.error("Unknown error:", error);

  throw new GraphQLError("An unknown error occurred", {
    extensions: {
      code: "INTERNAL_SERVER_ERROR",
    },
  });
};
