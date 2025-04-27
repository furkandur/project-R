import { UserDatasource } from "../User/data";
import { IUser } from "../User/model";

export type Context = {
  me: IUser | null;
  dataSources: {
    users: UserDatasource;
  };
};
