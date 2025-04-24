import dotenv from "dotenv";

dotenv.config();

export const MONGO_URI =
  process.env.MONGO_URI ??
  (() => {
    throw new Error("MONGO_URI is not defined in environment variables");
  })();

export const JWT_SECRET =
  process.env.JWT_SECRET ??
  (() => {
    throw new Error("JWT_SECRET is not defined in environment variables");
  })();
