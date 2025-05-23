import { UserDatasource } from "../User/data";
import { LocationDatasource } from "../Location/data";
import { IUser } from "../User/model";
import { JWTPayload } from ".";

export type Context = {
  me: JWTPayload | null;
  dataSources: {
    users: UserDatasource;
    locations: LocationDatasource;
  };
};
