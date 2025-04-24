import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/schema.ts",
  generates: {
    "./src/types/generated.ts": {
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
