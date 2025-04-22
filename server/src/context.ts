import { UserService } from "./services/UserService";

export type Context = {
  services: {
    users: UserService;
  };
};
