import { UserDatasource } from "../datasources/UserDatasource";
import { IUser } from "../models/User";

export type Context = {
  me: IUser | null;
  dataSources: {
    users: UserDatasource;
  };
};
