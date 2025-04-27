import { MongoDataSource } from "apollo-datasource-mongodb";
import User, { IUser, UserDocument } from "../models/User";
import { handleError } from "../utils/handleError";

export class UserDatasource extends MongoDataSource<UserDocument> {
  async getAll() {
    try {
      return await User.find();
    } catch (error) {
      handleError(error);
    }
  }

  async findOne(searchObj: object) {
    try {
      return await User.findOne(searchObj);
    } catch (error) {
      handleError(error);
    }
  }

  async create(newUser: IUser) {
    try {
      return await User.create(newUser);
    } catch (error) {
      handleError(error);
    }
  }
}
