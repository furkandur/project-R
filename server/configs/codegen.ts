import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  generates: {
    "./src/graphql/User/types.ts": {
      schema: "./src/graphql/User/schema.ts",
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "../types/context#Context",
        mappers: {
          User: "./model#IUser",
        },
      },
    },
    "./src/graphql/Location/types.ts": {
      schema: "./src/graphql/Location/schema.ts",
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "../types/context#Context",
        mappers: {
          Location: "./model#ILocation",
        },
      },
    },
  },
};

export default config;
