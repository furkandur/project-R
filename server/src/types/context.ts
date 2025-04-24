import { UserDatasource } from "../datasources/UserDatasource";

export type Context = {
  dataSources: {
    users: UserDatasource;
  };
};
