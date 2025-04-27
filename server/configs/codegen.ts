import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  generates: {
    "./src/graphql/User/types.ts": {
      schema: "./src/graphql/User/schema.ts",
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "../types/context#Context",
        mappers: {
          User: "../models/User#IUser",
        },
      },
    },
  },
};

export default config;
