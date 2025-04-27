import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./constants";

export const createToken = (user: object) => {
  const token = jwt.sign(user, JWT_SECRET, {
    expiresIn: "1d",
  });
  return { value: token };
};
