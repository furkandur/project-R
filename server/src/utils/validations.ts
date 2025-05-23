import { GraphQLError } from "graphql";
import { Days } from "../graphql/Location/model";

export const validatePassword = (password: string): boolean => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isValidLength = password.length >= minLength;

  const options = {
    extensions: {
      code: "BAD_USER_INPUT",
      field: "password",
    },
  };

  if (!isValidLength) {
    throw new GraphQLError(
      `Password must be at least ${minLength} characters long`,
      options
    );
  }

  if (!hasUpperCase) {
    throw new GraphQLError(
      "Password must contain at least one uppercase letter",
      options
    );
  }
  if (!hasLowerCase) {
    throw new GraphQLError(
      "Password must contain at least one lowercase letter",
      options
    );
  }
  if (!hasNumbers) {
    throw new GraphQLError(
      "Password must contain at least one number",
      options
    );
  }
  if (!hasSpecialChars) {
    throw new GraphQLError(
      "Password must contain at least one special character",
      options
    );
  }
  return true;
};

export const isValidDay = (day: string): boolean => {
  return Object.values(Days).includes(day as Days);
};
